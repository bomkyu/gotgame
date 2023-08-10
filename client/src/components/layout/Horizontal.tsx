import React, { ReactNode } from 'react'
import style from './horizontal.module.css'
export const Horizontal_4 = ({children} : {children : ReactNode}) => {
    return(
        <ul className={`${style.horizontal_4}`}>
            {children}
        </ul>
    )
}