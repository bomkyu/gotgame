import React from 'react'
import style from './card.module.css'
import { CardProps } from '../../interface'

const Card : React.FC<CardProps> = ({onClick, data}) => {
  return (
    <li className={`${style.card}`} onClick={onClick}>
      <div className={`${style['card-header']}`}>        
        <p>{data.writer}</p>
        <p>{data.genre} | <span className={`${style.color1}`}>모집중</span></p>
      </div>
      <div className={`${style['card-content']}`}>
        <p>{data.title}</p> 
        
        <ul className={`tag-wrap ${style['tag-st']}`}>
          {data.detailGenre.split(',').map((params)=>(
            <li>{params}</li>
          ))}
        </ul>
      </div>

      <div className={`${style['card-footer']}`}>
        <p className=''>{data.deadLine}</p>
        <p className=''>{data.personnel}명</p>
      </div>
    </li>
  )
}

export default Card