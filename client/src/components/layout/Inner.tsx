import React, { ReactNode } from 'react'

const Inner = ({children} : { children : ReactNode}) => {
  return (
    <div className='inner'>
        {children}
    </div>
  )
}

export default Inner