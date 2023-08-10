export interface UserData {
    num : number,
    id : string,
    pw : string,
    phone : string
}

// 모달 컨텍스트 타입 정의
export interface ModalContextType {
    modalStatus: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export interface CardProps {
    onClick: ()=> void;
}