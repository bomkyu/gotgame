import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from './contexts/ModalContext';
import { Provider } from 'react-redux';
import store from './redux/rootReducer';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <ModalProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ModalProvider>
  </Provider>
);