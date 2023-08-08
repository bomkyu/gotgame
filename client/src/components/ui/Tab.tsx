import React from 'react'
import style from './tab.module.css'
const Tab = () => {
  return (
    <ul className={`${style['tab-list']}`}>
      <li><b>RPG</b></li>
      <li><b>FPS</b></li>
      <li><b>TPS</b></li>
      <li><b>MOBILE</b></li>
    </ul>
  )
}

export default Tab