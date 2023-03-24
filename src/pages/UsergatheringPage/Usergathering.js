import {
  UsergatheringWrapper,
  UsergatheringForm,
  InputWrapper,
  ButtonWrapper, 
  UsergatheringItems,
} from "./usergathering-styled";
import React,{ useState, useEffect } from 'react';
import {
  Button,
} from 'react-bootstrap';
import * as API from "../../commons/api";
//import { ROUTE } from "../../routes/route";
import { useGatheringList } from "../../hooks/gathering.hook";
import { useParams } from 'react-router-dom';


const Usergathering = () => {
    const params = useParams()

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [rentalshop, setRentalShop] = useState("");
    const [rentalId, setRentalId] = useState("");
    const [time, setTime] = useState("");
    const [content, setContent] = useState("");
    const [count,setCount ] = useState("");

    
    useEffect(()=> {
      console.log("파람스:", params);
    })
//     duration
// : 
// 20
// gather_desc
// : 
// "fast"
// id
// : 
// 11
// rent_name
// : 
// "신한은행 서교동지점"
// start_time
// : 
// "2023-03-24T15:38:00.000Z"
// title
// : 
// "run"
// total_members
// : 
// 3
    useEffect(()=> {
      params && (async () => {
        try {
          const response = await API.get(`/gathering?type=gather&id=${params.id}`);
          const gathering = response.data.data[0];
          console.log("게더링: ", gathering);
          setTitle(gathering.title);
          setDate(gathering.start_time?.slice(0,16));
          setRentalShop(gathering.rent_name);
          setTime(gathering.duration);
          setContent(gathering.gather_desc);
          setCount(gathering.total_members);
        } catch(err) {
          console.log(err);
        }
      })();
    }, [ params]);

    
    
    const handleModify = async() => {
      try {
        await API.patch(`/gathering/${params.id}`, {
          title,
          start_time: date,
          rent_name: rentalshop,
          duration: time,
          total_members: count,
          gather_desc: content,
        });
        alert("수정되었습니다.");
      } catch (err) {
        console.log("Err", err);
      }
    };

    // 삭제
    const handleDelete = async() => {
      try {
        await API.delete(`/gathering/${params.id}`);
      } catch(err) {
        console.log(err);
      }
    };

  
    return (
      <>
        <UsergatheringWrapper>
          <UsergatheringForm>
            <InputWrapper>
              <label>제목</label>
              <br/>
              <input
                type = "title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder = "제목을 입력하세요" />
            </InputWrapper>
            <InputWrapper>
              <label>날짜</label>
              <br/>
              <input
                type = "datetime-local"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}/>
            </InputWrapper>
            <InputWrapper>
              <label>대여소</label>
              <br/>
              <input
                type = "rentalshop"
                required
                value={rentalshop}
                onChange={(e) => setRentalShop(e.target.value)}
                readOnly/>
            </InputWrapper>
            <InputWrapper>
              <label>소요시간(분)</label>
              <br/>
              <input
                type = "number"
                required
                value={time}
                step="5"
                onChange={(e) => setTime(e.target.value)}
                placeholder="소요시간을 입력하세요" />
            </InputWrapper>
            <InputWrapper>
              <label>인원</label>
              <br/>
              <input
                type = "number"
                required
                value={count}
                onChange={(e) => setCount(e.target.value)}
                placeholder="인원을 입력하세요" />
            </InputWrapper>
            <InputWrapper>
              <label>내용</label>
              <br/>
              <textarea
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 입력하세요"
                style={{ height: '110px'}} />              
            </InputWrapper>
            <br/>
            <ButtonWrapper>
              <Button variant="success" onClick={(e) => {
                e.preventDefault();
                handleModify();
              }}> 
                수정
              </Button>
              <Button variant="success" onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}>
                삭제
              </Button>
            </ButtonWrapper>
          </UsergatheringForm>
        </UsergatheringWrapper>      
      </>
    );
   
};

export default Usergathering;
