import React, { useState } from 'react';
import NavbarCustom from './Components/NavbarCustom/NavbarCustom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Places from './Components/Places/Places';
import PlaceDetail from './Components/PlaceDetail/PlaceDetail';
import Login from './Components/Login/Login';
import Founds from './Components/Founds/Founds';
import Usuario from './Components/Usuario/Usuario';
import FoundsDetail from './Components/FoundsDetail/FoundsDetail';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const estaLogueado = sessionStorage.getItem('id');

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  return (
    <>
    {!estaLogueado ? <Login /> : 
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavbarCustom onSearch={handleSearch} />}>
        <Route path="/objetos" element={<Founds searchTerm={searchTerm} />} />
        <Route path="/lugares" element={<Places searchTerm={searchTerm} />} />
        <Route path="/lugares/:placeId" element={<PlaceDetail />} />
        <Route path="/objetos/:foundId" element={<FoundsDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usuario/:userId" element={<Usuario />} />
        <Route path="*" element={<div>Pagina no encontrada</div>} />
        </Route>
      </Routes>
      </BrowserRouter>}
    </>
  );
}

export default App;
