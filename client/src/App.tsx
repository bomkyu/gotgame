import { Routes, Route, useLocation  } from 'react-router-dom'
import './style/App.css';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Modal from './components/layout/Modal';
import Write from './pages/Write';
import View from './pages/View'
const App = () => {
  return (
    <>
      <Header/>
      <div className='content-wrap'>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/write' element={<Write/>} />
          <Route path='/modify/:num' element={<Write/>} />
          <Route path='/view/:num' element={<View/>} />
          <Route path='/*' element={<NotFound/>} />
        </Routes>
      </div>
      <Modal/>
      <Footer/>
    </>
  );
}

export default App;
