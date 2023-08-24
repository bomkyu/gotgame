import { StringMappingType } from "typescript";

export interface UserData {
    num : number,
    id : string,
    pw : string,
    phone : string
}

// 모달 컨텍스트 타입 정의
export interface ModalContextType {
    modalStatus: boolean;
    modalType : string;
    modalData : object;

    setModalData : (data : object) => void;
    openModal: (modalType : string) => void;
    closeModal: () => void;
}

//카드 프롭스 Onclick
export interface CardProps {
    onClick: ()=> void;
}

export interface InputProps {
    title : string,
    value : string,
    onChange : (e : React.ChangeEvent<HTMLInputElement>)=> void;
}

export interface ModalLoginProps {
    loginCallBack : (obj : object) => void
    loginCallBackRest : (obj : object) => void
}

export interface ModalRegisterProps {
    onChange : (e : React.ChangeEvent<HTMLInputElement>)=> void;
    registerOnClick : ()=>void;
    inputValue : string
}