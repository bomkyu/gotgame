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
    data : listData;
    key : number
}

export interface InputProps {
    name : string
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

export interface SelectBoxProps {
    title : string,
    options : Array<string>,
    value : string,
    onSelectOption : (option : string) => void
}

export interface listData {
    num : number,
    writer : string,
    title : string,
    content : string,
    gameName : string,
    genre : string,
    detailGenre : string,
    url : string,
    personnel : string,
    deadLine : string,
    date : string 
    
}

export interface dropDown {
    children : React.ReactNode
    options : Array<string>
    onSelectOption : (option : string) => void
}

export interface ButtonSt1Props {
    txt : string,
    onClick : () => void
}

export interface Tabs {
    selected : string,
    onClick : (option : string) => void
}

export interface InputSearchprops {
    onChange : (e : React.ChangeEvent<HTMLInputElement>) => void
    value : string
}

export interface PagingProps {
    totalPages : number,
    currentPage : number, 
    goToPreviousPage : ()=> void,
    goToNextPage : ()=> void,
    displayedPages : Array<number>;
    setCurrentPage: (pageNumber: number) => void;
}