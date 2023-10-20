import React, { ReactNode, useState } from 'react'
import style from './dropdown.module.css'
import { dropDown } from '../../interface';
const DropDown = ({children, options, onSelectOption} : dropDown) => {
    
  const [click, setClick] = useState(false);

  return (
    <div className={style['dropdown-contain']}>
        <div onClick={()=>setClick(!click)}>
            {children}
        </div>
        {click &&
        <ul className={style['dropdown-row']}>
            {
              options.map((param)=><li key={param} onClick={()=>onSelectOption(param)}>{param}</li>)
            }
        </ul>
        }
    </div>
  )
} 

export default DropDown