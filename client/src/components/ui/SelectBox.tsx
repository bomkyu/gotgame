import React, { useEffect, useState } from 'react'
import style from './selectbox.module.css'
import { SelectBoxProps } from '../../interface';

const SelectBox = ({title, options, onSelectOption} : SelectBoxProps) => {
    const [click, setClick] = useState(false);
    const [selectOption, setSelectOption] = useState(null);

    useEffect(()=>{
      if(selectOption !== null){
        //setClick(true);
        console.log(selectOption);
      }
    },[selectOption])

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