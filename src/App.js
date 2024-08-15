import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import DecimalesAFRacciones from './components/DecimalesAFRacciones';
import RelacionOrdenFracciones from './components/RelacionOrdenFracciones';
import TiposDeFracciones from './components/TiposDeFracciones';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/decimales-a-fracciones" element={<DecimalesAFRacciones />} />
        <Route path="/relacion-orden-fracciones" element={<RelacionOrdenFracciones />} />
        <Route path="/tipos-de-fracciones" element={<TiposDeFracciones />} />
      </Routes>
    </Router>
  );
}

export default App;
