import React, {useEffect, useState} from 'react'
import Card from '../components/ui/Card'
import Inner from '../components/layout/Inner'
import Tab from '../components/ui/Tab'
import InputSearch from '../components/ui/InputSearch'
import { Horizontal_4 } from '../components/layout/Horizontal'
import { useModal } from '../contexts/ModalContext'
import { LoginInfoRequest } from '../api/oauth'
import { setUserInfo } from '../session'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {listData} from '../interface'

const Main = () => {
  const { openModal, setModalData } = useModal();
  const [getData, setGetData] = useState<listData[]>([]);
  const navigate = useNavigate();

  //url에 토큰정보 있는지 확인
  const tokenRequest = async () => {
    LoginInfoRequest(LoginInfoRequestCallBack);
  }

  //콜백이 되는 함수
  const LoginInfoRequestCallBack = (data : object) => {
    //회원정보 검색
    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/register`,data)
    .then((respone)=>{
      switch (respone.data.status) {
        case 'register':
            openModal('register');
            setModalData(data)
          break;
        case 'login' :
          setUserInfo(respone.data.userInfo);
          navigate('/');
          break;
      
        default:
          break;
      }
    })
  }
  
  useEffect( () => {
    tokenRequest();
    fetchAll();
  }, [])

  const fetchAll = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/main`)
    .then((respones)=>{
      setGetData(respones.data)
    })
  }
  return (
    <>
      <div className='visual-wrap'>
        <div className='inner'>
          <p className='visual-txt'>
            같이 게임할 사람을 찾으신다구요?<br/>그럼 <b>'같겜'</b>과 함께해요!
          </p>
        </div>
      </div>
      <Inner>
        <Tab/>
        <InputSearch/>
        <Horizontal_4>
          {
            getData &&
            getData.map((datas)=>(
              <Card onClick={()=>navigate(`/view/${datas.num}`)} data={datas}/>
            ))
          }
        </Horizontal_4>
      </Inner>
      
    </>
  )
}

export default Main