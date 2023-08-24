import React,{ useState, useEffect } from 'react'
import { useModal } from '../../contexts/ModalContext'
import { useNavigate } from 'react-router-dom';
import ModalLogin from './ModalLogin';
import ModalRegister from './ModalRegister';
import axios from 'axios';
import {setUserInfo} from '../../session'
const Modal = () => {
  const { modalStatus, modalType, closeModal, setModalData, modalData } = useModal();
  //const [userInfo, setUserInfo] = useState({});
  const [inputValue , setInputValue] = useState('');

  const navigate = useNavigate();

  //닉네임 Input 함수
  const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }

  //회원가입 화면일때 버튼이 실행되는 함수.
  const registerOnClick=()=>{
    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/register`,{...modalData, nickName : inputValue})
    .then((resopne)=>{
      if(resopne.data.status === 'registerSuccess'){
        setUserInfo({...modalData, nickName : inputValue})
        cleanUp();
        navigate('/')
      }else{
        alert('에러!')
      }
    })
  }
  useEffect(()=> {
    console.log(modalData);
  }, [modalData])

  //사용자가 closeModal 선택 했을 시 State 클리어 함수
  const cleanUp = () => {
    setUserInfo({});
    setInputValue('');
    setModalData({})
    closeModal();
  }


  return (
    <div className={`modal-wrap ${modalStatus ? 'on' : 'off'}`}>
        <div className='modal-inner'>
          <p onClick={cleanUp}>close</p>
          {modalType === 'login' && <ModalLogin/>}
          {modalType === 'register' && <ModalRegister onChange={onChange} registerOnClick={registerOnClick} inputValue={inputValue}/>}
        </div>
    </div>
  )
}

export default Modal