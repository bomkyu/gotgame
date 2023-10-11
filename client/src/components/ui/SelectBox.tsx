import React, { useEffect, useState } from 'react'
import style from './selectbox.module.css'
import { SelectBoxProps } from '../../interface';

const SelectBox = ({title, options, onSelectOption, value} : SelectBoxProps) => {
    const [click, setClick] = useState(false);
    const [selectOption, setSelectOption] = useState(null);

    //수정 페이지에서 value값이 있을때
    useEffect(()=>{
      if(value){
        handleOptionClick(value)
      }
    },[value])

    //option들을 클릭했을때
    const handleOptionClick = (option : any) => {
      setSelectOption(option);
      onSelectOption(option)
      setClick(false);
    };

  return (
    <div className={`${style.selectWrap}`}>
        <div className={`${style.selectContain} ${selectOption && style['on']}`} onClick={()=>setClick(!click)}>
          <p className={style.title}>{title}</p>
          <b>{selectOption}</b>
        </div>
        {click &&
        <ul>
            {options.map((option) => (
            <li key={option} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
        }
    </div>
    
  )
}

export default SelectBox