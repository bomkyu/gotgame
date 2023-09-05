import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../contexts/ModalContext'
import {logOut} from '../../session'
const Header = () => {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const user = sessionStorage.getItem('userInfo');
  return (
    <header>
      <div className='inner'>
          <p className='logo'>GOATGAM</p>
          <div className='header-util'>
              {
              !user ? <p onClick={()=>openModal('login')}>로그인</p>
              :
              <>
              <p onClick={()=>{
                logOut();
                navigate('/');
                }
                }>로그아웃</p>
              <p onClick={()=>navigate('/write')}>글쓰기</p>
              </>
              }
              
              
          </div>
      </div>
    </header>
  )
}

export default Header