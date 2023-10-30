import React from 'react'
import style from './nodata.module.css'
const Nodata = () => {
  return (
    <div className={style['nodata-wrap']}>
        <img src="../images/ic_pageLogo_line_color.png" alt="데이터 없을때 나오는 이미지" />
        <p>
            찾으시는 결과가 없어요! <br/>
            직접 모집하시겠어요?
        </p>
    </div>
  )
}

export default Nodata