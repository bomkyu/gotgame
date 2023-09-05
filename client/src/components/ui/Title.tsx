import React from 'react'
import style from './title.module.css'
export const Title = ({ title } : {title : string}) => {
  return (
    <h2 className={style.title}>{title}</h2>
  )
}

