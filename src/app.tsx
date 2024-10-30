import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/home';
import Edit from './components/edit/edit';
import Header from './components/header/header';

function Pourqoi(): React.JSX.Element {
  return (
    <div className="c-pourqoi">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default Pourqoi;
