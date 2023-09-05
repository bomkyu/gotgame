import React, { useRef, useState } from 'react'
import { Horizontal_2 } from '../components/layout/Horizontal'
import Input from '../components/ui/Input'
import { Title } from '../components/ui/Title';
import axios from 'axios';

const Write = () => {
  const initialInputs = {
    title: '',
    genre: '',
    gameName: '',
    url: '',
    text:'',
    personnel : '1',
    date : '2023-09-05',
    detailGenre : ''
  };
  
  const [information, setInformation] = useState(initialInputs)
    
    const onChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      
      setInformation({
        ...information,
        [name] : value
      })
    }

    const onClickHandler = () => {
      console.log(information);
      axios.post(`${process.env.REACT_APP_SERVER_URL}/write`,information)
    } 

  return (
    <div className='inner'>
      <section>
        <Title title="모집정보 및 디스코드 URL을 입력해 주세요."/>
        <Horizontal_2>
          <li><Input name="genre" title="장르" value={information.genre} onChange={onChange}/></li>
          <li><Input name="detailGenre" title="세부장르" value="" onChange={onChange}/></li>
          <li><Input name="gameName" title="게임이름" value={information.gameName} onChange={onChange}/></li>
          <li><Input name="url" title="디스코드 URL" value={information.url} onChange={onChange}/></li>
          <li><Input name="personnel" title="인원" value={information.personnel} onChange={onChange}/></li>
          <li><Input name="date" title="날짜" value={information.date} onChange={onChange}/></li>
        </Horizontal_2>
      </section>
      <section>
        <Title title="간략한 정보를 설명해 주세요."/>
        <Input name="title" title="제목" value={information.title} onChange={onChange}/>
        <textarea className='text-area' name='text' onChange={onChange} value={information.text}/>
        <button onClick={()=>onClickHandler()}>등록</button>
      </section>
    </div>
  )
}

export default Write