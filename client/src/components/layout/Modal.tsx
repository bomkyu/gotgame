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
  const registerOnClick = async ()=>{
    try {
      //닉네임이 중복인지 아닌지 판단하기 위해 DB에 저장된 닉네임을 불러오는 요청 
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/register`, {
        params : {nickName : inputValue},
      });
      const overlapData = response.data.length;
      if(overlapData === 1) {
        alert('중복!');
        return;
      }else{
        //중복이 아니면 server단에 회원가입 요청
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/register`, { ...modalData, nickName: inputValue });
        if (response.data.status === 'registerSuccess') {
          setUserInfo({ ...modalData, nickName: inputValue });
          cleanUp();
          navigate('/');
        } else {
          alert('에러!');
        }
      }
    } catch (error) {
      
    }
  }

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
          <div className='modal-header flx jsc'>
            <img src='../images/ic_close.png' onClick={cleanUp} alt='모달창 닫는 아이콘'/>
          </div>
          <div className='modal-content'>
          {modalType === 'login' && <ModalLogin/>}
          {modalType === 'register' && <ModalRegister onChange={onChange} registerOnClick={registerOnClick} inputValue={inputValue}/>}
          </div>
        </div>
    </div>
  )
}

export default Modal