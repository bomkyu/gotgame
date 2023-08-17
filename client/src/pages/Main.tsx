import React from 'react'
import Card from '../components/ui/Card'
import Inner from '../components/layout/Inner'
import Tab from '../components/ui/Tab'
import InputSearch from '../components/ui/InputSearch'
import { Horizontal_4 } from '../components/layout/Horizontal'
import { useModal } from '../contexts/ModalContext'
const Main = () => {
  const { modalStatus, openModal, closeModal } = useModal();
  return (
    <>
      <div className='visual-wrap'>
        <div className='inner'>
          <p className='visual-txt'>
            같이 게임할 사람을 찾으신다구요?<br/>그럼 <b>'같겜'</b>과 함께해요!
          </p>
        </div>
      </div>
      <Inner>
        <Tab/>
        <InputSearch/>
        <Horizontal_4>
          <Card onClick={()=>openModal('list')}/>
        </Horizontal_4>
      </Inner>
      
    </>
  )
}

export default Main