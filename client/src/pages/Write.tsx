import React, { useState } from 'react'
import { Horizontal_2 } from '../components/layout/Horizontal'
import { Title } from '../components/ui/Title';
import Input from '../components/ui/Input'
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Write = () => {
  const initialInputs = {
    title: '',
    genre: '',
    gameName: '',
    url: '',
    text:'',
    personnel : '1',
    deadLine : '2023-09-05',
    detailGenre : '',
    nickName : ''
  };
  
  const [information, setInformation] = useState(initialInputs)
  const [detailGenreArr, setdetailGenreArr] = useState<string[]>([]) //콤마로 구분된 세부장르 저장하는 State
  const {title, genre, gameName, url, text, personnel, deadLine, detailGenre} = information;
  const {state : {nickName}} = useLocation();

  const onChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      
      setInformation({
        ...information,
        [name] : value
      })

      if(name === 'detailGenre'){
        const arr = value.split(",");
        setdetailGenreArr(arr)
      }
    }

    const onClickHandler = () => {
      console.log(information);
      axios.post(`${process.env.REACT_APP_SERVER_URL}/write`,{...information, nickName : nickName})


    } 

  return (
    <div className='inner'>
      <section>
        <Title title="모집정보 및 디스코드 URL을 입력해 주세요."/>
        <Horizontal_2>
          <li><Input name="genre" title="장르" value={genre} onChange={onChange}/></li>
          <li>
            <Input name="detailGenre" title="세부장르" value={detailGenre} onChange={onChange}/>
            {
              detailGenreArr &&
              detailGenreArr.length !== 3 ? 'asdasd' : '3개 이상은 안됩니다.' 
            }
          </li>
          <li><Input name="gameName" title="게임이름" value={gameName} onChange={onChange}/></li>
          <li><Input name="url" title="디스코드 URL" value={url} onChange={onChange}/></li>
          <li><Input name="personnel" title="인원" value={personnel} onChange={onChange}/></li>
          <li><Input name="deadLine" title="날짜" value={deadLine} onChange={onChange}/></li>
        </Horizontal_2>
      </section>
      <section>
        <Title title="간략한 정보를 설명해 주세요."/>
        <Input name="title" title="제목" value={title} onChange={onChange}/>
        <textarea className='text-area' name='text' onChange={onChange} value={text}/>
        <button onClick={()=>onClickHandler()}>등록</button>
      </section>
    </div>
  )
}

export default Write