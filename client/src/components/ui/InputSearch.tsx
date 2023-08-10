import React from 'react'
import style from './inputSearch.module.css'
const InputSearch = () => {
  return (
    <input type="text" id='search' className={`${style.search}`} placeholder='검색어를 입력해 주세요.'/>
  )
}

export default InputSearch