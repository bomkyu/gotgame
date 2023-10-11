import React from 'react'
import style from './tab.module.css'
import { Tabs } from '../../interface'

const Tab = ({onClick, selected} : Tabs) => {
  const tabArr = ['ALL', 'RPG', 'FPS', 'TPS', 'MOBILE'];
  return (
    <ul className={`${style['tab-list']}`}>
      {
        tabArr.map((param)=>(
          <li key={param} onClick={()=>onClick(`${param}`)} className={selected === param ? style['active'] : ''}><b>{param}</b></li>
        ))
      }
    </ul>
  )
}

export default Tab