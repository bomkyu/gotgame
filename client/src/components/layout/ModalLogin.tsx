import React from 'react'
import {googleLoginRequest, kakaoLoginRequest} from '../../api/firebase'
import { ModalLoginProps } from '../../interface'

const ModalLogin = ({loginCallBack} : ModalLoginProps) => {

    const loginHandler = async (type : string) => {
        switch (type) {
            case 'google':
            await googleLoginRequest(loginCallBack);
            break;
            
            case 'kakao':
            await kakaoLoginRequest(loginCallBack);
            break;
            default:
            alert('에러!')
            break;
        }
    }

  return (
    <>
        <p onClick={()=>loginHandler('google')}>구글</p><br/>
        <p onClick={()=>loginHandler('kakao')}>카카오</p>
    </>
  )
}

export default ModalLogin