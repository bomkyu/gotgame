import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { ModalProvider } from './contexts/ModalContext';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ModalProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ModalProvider>
);