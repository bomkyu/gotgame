import React from 'react'
import { useModal } from '../../contexts/ModalContext'
const Header = () => {
  const { modalStatus, openModal, closeModal } = useModal();
  return (
    <header>
      <div className='inner'>
          <p className='logo'>GOATGAM</p>
          <div className='header-util'>
            <p onClick={()=>openModal('login')}>로그인</p>
            <p>글쓰기</p>
          </div>
      </div>
    </header>
  )
}

export default Header