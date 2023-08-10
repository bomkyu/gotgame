import React from 'react'
import style from './card.module.css'
import { CardProps } from '../../interface'

const Card : React.FC<CardProps> = ({onClick}) => {
  return (
    <li className={`${style.card}`} onClick={onClick}>
      <div className={`${style['card-header']}`}>        
        <p>쭈꾸미</p>
        <p>FPS | <span className={`${style.color1}`}>모집중</span></p>
      </div>
      <div className={`${style['card-content']}`}>
        <p>League of legend</p>
        <ul className={`${style['game-value']}`}>
          <li>대규모멀티</li>
          <li>하드코어</li>
        </ul>
      </div>

      <div className={`${style['card-footer']}`}>
        <p className=''>2023-08-09</p>
        <p className=''>인원 4 / 1</p>
      </div>
    </li>
  )
}

export default Card