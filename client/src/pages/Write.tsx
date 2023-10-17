import React, { useEffect, useState } from 'react'
import { Horizontal_2 } from '../components/layout/Horizontal'
import { Title } from '../components/ui/Title';
import Input from '../components/ui/Input'
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SelectBox from '../components/ui/SelectBox';
import { ButtonSt1 } from '../components/ui/Buttons';

const Write = () => {
  const initialInputs = {
    title: '',
    genre: '',
    gameName: '',
    url: '',
    content:'',
    personnel : '1',
    deadLine : '2023-09-05',
    detailGenre : '',
    nickName : ''
  };
  
  const [information, setInformation] = useState(initialInputs)
  const [detailGenreArr, setdetailGenreArr] = useState<string[]>([]) //콤마로 구분된 세부장르 저장하는 State
  const {title, genre, gameName, url, content, personnel, deadLine, detailGenre} = information;
  const {state : {nickName}} = useLocation();
  const navigate = useNavigate();
  const { num } = useParams();
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

  useEffect(()=>{
    const fetchData = async () => {
      if(num){
        try{
        const respones = await axios.get(`${process.env.REACT_APP_SERVER_URL}/view/${num}`);
        setInformation(respones.data[0])
        }catch(err){
          alert(err);
        }
      }
    }
    fetchData();
  }, [num])

  useEffect(()=> {
    console.log('useEffectWrite',information)
  },[information])

  //selectBoxHandler
  const SelectedHandler = (option : string) => {
    setInformation({...information, genre : option});
  }

  //등록 핸들러
  const onClickHandler = () => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/write`,{...information, nickName : nickName})
      .then((respones)=>{
        navigate('/');
      })
  }

  //수정 핸들러
  const modifyHandler = async () => {
    try {
      // 서버에 수정 요청 보내기
      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/modify/${num}`,information);
      
      // 서버 응답 처리
      if (response.status === 200) {
        navigate('/');

      } else {
        // 수정 실패
        console.error('수정 실패');

      }
    } catch (error) {
      // 오류 처리
      console.error('오류 발생:', error);

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
          <li><Input name="deadLine" title="날짜" value={deadLine} onChange={onChange}/></li>
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