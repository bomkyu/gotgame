import React,{useState, useEffect} from 'react'
import { useModal } from '../../contexts/ModalContext'

import ModalLogin from './ModalLogin';
import ModalRegister from './ModalRegister';

import axios from 'axios';

const Modal = () => {
  const { modalStatus, modalType, openModal, closeModal } = useModal();
  const [userInfo, setUserInfo] = useState({});
  const [inputValue , setInputValue] = useState('');

  //로그인 정보가 callback되는 함수
  const loginCallBack = ( obj : object ) => {
    setUserInfo(obj)
    data(obj);
  }
  
  //닉네임 Input 함수
  const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  //회원가입 화면일때 실행되는 함수.
  const registerOnClick=()=>{
    data({...userInfo, nickName : inputValue});
  }

  //사용자가 closeModal 선택 했을 시 State 클리어 함수
  const cleanUp = () => {
    setUserInfo({});
    setInputValue('');
    closeModal();
  }

  const data = (obj : object) =>{
    //return
    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/register`,{...obj, nickName : inputValue})
    .then(response => {
      const {status} = response.data
      console.log(status);
      if( status === 'register'){
        openModal('register')
      }else if (status === 'registerSuccess' || status === 'login'){
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
        cleanUp()
      }
    })
  }

  return (
    <div className={`modal-wrap ${modalStatus ? 'on' : 'off'}`}>
        <div className='modal-inner'>
          <p onClick={cleanUp}>close</p>
          {modalType === 'login' && <ModalLogin loginCallBack={loginCallBack}/>}
          {modalType === 'register' && <ModalRegister onChange={onChange} registerOnClick={registerOnClick} inputValue={inputValue}/>}
        </div>
    </div>
  )
}

export default Modal