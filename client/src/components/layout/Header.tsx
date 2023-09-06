import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../contexts/ModalContext'
import {logOut, getUserInfo} from '../../session'
const Header = () => {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const userInfo = getUserInfo();
  return (
    <header>
      <div className='inner'>
          <p className='logo'>GOATGAM</p>
          <div className='header-util'>
              {
              !userInfo ? <p onClick={()=>openModal('login')}>로그인</p>
              :
              <>
              <p onClick={()=>{
                logOut();
                navigate('/');
                }
                }>로그아웃</p>
              <p onClick={()=>navigate('/write', {state : { nickName : userInfo.nickName}})}>글쓰기</p>
              </>
              }
              
              
          </div>
      </div>
    </header>
  )
}

export default Header