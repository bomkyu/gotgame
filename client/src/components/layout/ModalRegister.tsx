import React from 'react'
import Input from '../ui/Input';
import style from './modalRegoster.module.css'
import { ModalRegisterProps } from '../../interface';
import { ButtonSt1 } from '../ui/Buttons';
const ModalRegister = ({ onChange, registerOnClick, inputValue} : ModalRegisterProps) => {

    return(
      <>
        <h2 className={style.title}>사용하실 닉네임을 지정해주세요!</h2>
        <div className={style['register-wrap']}>
        {
          <Input name="nickName" title="닉네임" value={inputValue} onChange={onChange}/>
        }
        </div>
        <ButtonSt1 txt='회원가입' onClick={registerOnClick} />
      </>
    )
}

export default ModalRegister
