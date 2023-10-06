import React from 'react'
import style from './buttons.module.css'
import { ButtonSt1Props } from '../../interface'

export const ButtonSt1 = ({ txt ,onClick} : ButtonSt1Props) => {
    return (
        <div className={`${style.btn} ${style.btnSt3}`} onClick={onClick}>{txt}</div>
    )
}
