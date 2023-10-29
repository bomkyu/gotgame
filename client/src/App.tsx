import { Routes, Route, useLocation  } from 'react-router-dom'
import './style/App.css';

//컴포넌트들
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Modal from './components/layout/Modal';
import Write from './pages/Write';
import View from './pages/View'

//redux 및 세션
import { getUserInfo } from './session'
import { useDispatch } from 'react-redux';
import { setUserInfo } from './redux/store/userSlice';
import { useEffect } from 'react';
import PrivateRoute from './pages/PrivateRoute';
const App = () => {
  let location = useLocation();
  const dispatch = useDispatch();
  //redux store에 저장된 userInfo가 새로고침했을때 지워졌을경우 다시 dispatch함
  useEffect(()=>{
    if(getUserInfo() !== null) {
      const {isLoggedIn, userInfo} = getUserInfo();
      if(isLoggedIn && userInfo){
        dispatch(setUserInfo(userInfo));
      }
    }
  },[dispatch])
  return (
    <>
      <Header/>
      <div className='content-wrap'>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/view/:num' element={<View/>} />
          <Route element={<PrivateRoute/>}>
            <Route path='/write' element={<Write/>} />
            <Route path='/modify/:num' element={<Write/>} />
          </Route>
          <Route path='/*' element={<NotFound/>} />
        </Routes>
      </div>
      <Modal/>
      {location.pathname == '/' && <Footer/>}
      
    </>
  );
}

export default App;
