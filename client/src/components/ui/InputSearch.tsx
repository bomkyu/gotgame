import React, { useEffect } from 'react'
import style from './inputSearch.module.css'
import { InputSearchprops } from '../../interface'

const InputSearch = ({onChange, value} : InputSearchprops) => {

  return (
    <input type="text" id='search' className={`${style.search}`} placeholder='검색어를 입력해 주세요.' onChange={onChange} value={value}/>
  )
}

export default InputSearch