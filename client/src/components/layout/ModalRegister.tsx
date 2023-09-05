import React,{useState} from 'react'
import Input from '../ui/Input';
import { ModalRegisterProps } from '../../interface';
const ModalRegister = ({ onChange, registerOnClick, inputValue} : ModalRegisterProps) => {

    return(
      <>
        <h2>사용하실 닉네임을 지정해주세요!</h2>
        {<Input name="nickName" title="닉네임" value={inputValue} onChange={onChange}/>}
        <button onClick={registerOnClick}>등록이요~</button>
      </>
    )
}

export default ModalRegister
