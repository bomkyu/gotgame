import React,{useEffect} from 'react'
import {googleTokenRequest, kakaoTokenRequest} from '../../api/oauth'
import { ModalLoginProps } from '../../interface'
import axios from 'axios'

const ModalLogin = () => {

    const loginHandler = async (type : string) => {
        switch (type) {
            case 'google':
            await googleTokenRequest();
            break;
            
            case 'kakao':
            await kakaoTokenRequest();
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