import React, { useEffect, useState } from 'react'
import style from './input.module.css'
import { InputProps } from '../../interface'

const Input = ({title, value, onChange} : InputProps) => {
  
  const [inputFocus,setInputFocus] = useState(false);

  const onBlurHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
    if(!e.target.value || e.target.value === ''){
      setInputFocus(false);
    }
  }

  const onfocusHandler = () => {
    setInputFocus(true)
  }

  useEffect(()=>{
    console.log('asdasdasdasdasdas')
  },[inputFocus])
  
  return (
    <label className={`${style['input-wrap']} ${inputFocus ? 'on' : ''}`}>
        <span>{title}</span>
        <input 
          type='text'
          value={value}
          onChange={onChange}
          onBlur={()=>onBlurHandler}
          onFocus={()=>onfocusHandler}
        />
    </label>
  )
}

export default Input




