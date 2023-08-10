import React, { createContext, useContext, useState, ReactNode } from 'react';
import {ModalContextType} from '../interface'
const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children } : { children : ReactNode}) => {
  const [modalStatus, setModalStatus] = useState(false);

  const openModal = () => {
    setModalStatus(true);
  };

  const closeModal = () => {
    setModalStatus(false);
  };

  return (
    <ModalContext.Provider value={{ modalStatus, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

// useModal 훅을 위한 함수 컴포넌트 정의
export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('에러에용');
  }
  return context;
};