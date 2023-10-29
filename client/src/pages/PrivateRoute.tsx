import React, {ReactNode} from 'react'
import {Outlet, Navigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/rootReducer';


  
// 접근 제어 함수
const PrivateRoute = () => {
    const isAuth = useSelector((state : RootState) => state.user.isLoggedIn); //로그인 상태
    if (!isAuth) {
        alert('로그인 후 이용해주세요.')
        return <Navigate to="/" />;
    }

    return <Outlet/>;
};
export default PrivateRoute