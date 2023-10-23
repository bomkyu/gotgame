import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Horizontal_2 } from '../components/layout/Horizontal';
import { Title } from '../components/ui/Title';
import Input from '../components/ui/Input';
import SelectBox from '../components/ui/SelectBox';
import { ButtonSt1 } from '../components/ui/Buttons';
import { isValidInput, isValidDiscordURL, formatDateToYYYYMMDD } from '../utils';
import CalendarCustom from '../components/ui/CalendarCustom';

const Write = () => {

  const today = new Date(); 
  const formattedDate = today.toLocaleDateString();

  const initialInputs = {
    title: '',
    genre: '',
    gameName: '',
    url: '',
    content:'',
    personnel : '1',
    deadLine : formatDateToYYYYMMDD(formattedDate),
    detailGenre : '',
    nickName : ''
  };
  
  const [information, setInformation] = useState(initialInputs)
  const [detailGenreArr, setdetailGenreArr] = useState<string[]>([]) //콤마로 구분된 세부장르 저장하는 State
  const {title, genre, gameName, url, content, personnel, deadLine, detailGenre} = information;
  const {state : {nickName}} = useLocation();
  const navigate = useNavigate();
  const { num } = useParams();

  // 캘린더 변경 핸들러
  const CalendarChange = (value: any, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setInformation({
      ...information,
      deadLine : formatDateToYYYYMMDD(value)
    })
  };

  //input onChange 부분
  const onChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if(name === 'detailGenre'){
      const arr = value.split(",");

      if(arr.length !== 4) {
        setdetailGenreArr(arr)
      }else{
        alert('태그는 최대 3개까지 가능합니다.');
      }
    }

    setInformation({
      ...information,
      [name] : value
    })
  }

  //수정 상태로 들어왔을때 값들을 받아와서 information state에 집어넣음.
  useEffect(()=>{
    const fetchData = async () => {
      if(num){
        try{
          const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/view/${num}`);
          if (response.data && response.data.length > 0) {
            setInformation(response.data[0]);
            const detail = response.data[0].detailGenre;
            const detail_arr = detail.split(",");
            
            setdetailGenreArr(detail_arr);
          } else {
            alert('게시물을 찾을 수 없습니다.');
          }
        } catch (error) {
          alert('데이터 검색 중 오류가 발생했습니다.');
        }
      }
    }
    fetchData();
  }, [num])

  //selectBoxHandler
  const SelectedHandler = (option : string) => {
    setInformation({...information, genre : option});
  }

  const exceptionHandler = () => {
    if (!isValidInput(genre)) {
      throw new Error('장르를 선택해 주세요.');
    }
  
    if (detailGenreArr.length === 0) {
      throw new Error('세부장르는 최소 하나 입력하셔야 합니다.');
    }

    if (!isValidInput(gameName)) {
      throw new Error('게임 이름은 3글자 이상이어야 합니다.');
    }

    if (!isValidDiscordURL(url)) {
      throw new Error('유효한 URL을 입력해주세요.');
    }

    if (!isValidInput(title)) {
      throw new Error('제목은 3글자 이상이어야 합니다.');
    }
    
    if(!isValidInput(content)) {
      throw new Error('정보를 3글자 이상 입력해 주세요.');
    }
    
  }

  //등록 핸들러
  const onClickHandler = async () => {
    try {
      exceptionHandler();

      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/write`,{...information, nickName : nickName});
      if (response.status === 200) {
        navigate('/');
      } else {
        alert('등록에 실패했습니다.');
      }
    } catch (error) {
      alert(error);
    }
  }

  //수정 핸들러
  const modifyHandler = async () => {
    try {
      exceptionHandler();

      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/modify/${num}`,information);
      if (response.status === 200) {
        navigate(`/view/${num}`);

      } else {
        alert('수정에 실패했습니다.');

      }
    } catch (error) {
      // 오류 처리
      alert(error);
      //console.error(error)
    }
  }

  return (
    <div className='inner'>
      <section>
        <Title title="1. 모집정보 및 디스코드 URL을 입력해 주세요."/>
        <Horizontal_2>
          <li><SelectBox title='장르' options={['FPS', 'TPS', 'AOS', 'RPG', 'MOBILE']} onSelectOption={SelectedHandler} value={genre}/></li>
          <li>
            <Input name="detailGenre" title="세부장르" value={detailGenre} onChange={onChange}/>
            {
              detailGenreArr.length !== 0 &&
              <ul className='tag-wrap'>
                {detailGenreArr.map((param)=>{
                  return(
                    <li>{param}</li>
                  );
                })
              }
              </ul>
              
            }
          </li>
          <li><Input name="gameName" title="게임이름" value={gameName} onChange={onChange}/></li>
          <li><Input name="url" title="디스코드 URL" value={url} onChange={onChange}/></li>
          <li><Input name="personnel" title="인원" value={personnel} onChange={onChange}/></li>
          <li>
            <CalendarCustom title="마감 날짜" onchange={CalendarChange} value={deadLine}/>
          </li>
        </Horizontal_2>
      </section>
      <section>
        <Title title="2. 간략한 정보를 설명해 주세요."/>
        <Input name="title" title="제목" value={title} onChange={onChange}/>
        <textarea className='text-area mg-t20' name='content' onChange={onChange} value={content}/>

        <div className='flx jsc'>
          {
            num ? <ButtonSt1 txt='수정' onClick={modifyHandler}/>
            :
            <ButtonSt1 txt='등록' onClick={onClickHandler}/>
          }
            
          </div>
      </section>
    </div>
  )
}

export default Write