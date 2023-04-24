import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';
import './index.css';

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <BrowserRouter>
    <Router />
  </BrowserRouter>
);
