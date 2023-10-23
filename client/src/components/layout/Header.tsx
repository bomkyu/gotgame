import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../contexts/ModalContext'

//상태 관리 및 세션
import {sessionlogOut} from '../../session'
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/rootReducer';
import { logout } from '../../redux/store/userSlice'; // import 로그아웃 액션

const Header = () => {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state: RootState) => state.user.userInfo); // 로그인 정보
  const isLoggedIn = useSelector((state : RootState) => state.user.isLoggedIn); //로그인 상태

  return (
    <header>
      <div className='inner'>
          <p className='logo'>GOATGAM</p>
          <div className='header-util'>
              {
              !isLoggedIn ? <p onClick={()=>openModal('login')}>로그인</p>
              :
              <>
              <p onClick={()=>{
                dispatch(logout());
                sessionlogOut();
                navigate('/');
                }
                }>로그아웃</p>
              <p onClick={()=>navigate('/write', {state : { nickName : userInfo.nickName}})}>글쓰기</p>
              </>
              }
              
              
              
          </div>
      </div>
    </header>
  )
}

export default Header