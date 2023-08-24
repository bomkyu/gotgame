import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../contexts/ModalContext'
const Header = () => {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const user = sessionStorage.getItem('userInfo');

  const logout = () => {
    sessionStorage.removeItem('userInfo');
    navigate('/');
  }
  return (
    <header>
      <div className='inner'>
          <p className='logo'>GOATGAM</p>
          <div className='header-util'>
              {
              !user ? <p onClick={()=>openModal('login')}>로그인</p>
              :
              <>
              <p onClick={()=>logout()}>로그아웃</p>
              <p>글쓰기</p>
              </>
              }
              
              
          </div>
      </div>
    </header>
  )
}

export default Header