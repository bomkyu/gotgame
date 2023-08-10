import React from 'react'
import { useModal } from '../../contexts/ModalContext'
const Modal = () => {
    const { modalStatus, closeModal } = useModal();
  return (
    <div className={`modal-wrap ${modalStatus ? 'on' : 'off'}`}>
        <div className='modal-inner'>
          <p onClick={closeModal}>close</p>
        </div>
    </div>
  )
}

export default Modal