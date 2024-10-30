import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import Pourqoi from './app';

const root = ReactDOM.createRoot(document.getElementById('pourqoi') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Pourqoi />
    </BrowserRouter>
  </React.StrictMode>
);
