import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Routes } from "react-router-dom";
import { AppHeader } from './cmps/app-header';

import { HomePage } from "./cmps/app-home";
import { PagitaApp } from './cmps/app-pagita';
import { Informetion } from './cmps/informetion';
import { Login } from './cmps/login';
import { PagDetails } from './cmps/pag-details';
import { Personal } from './cmps/personal';
import { PersonalDetails } from './cmps/personal-details';

function App() {
  const user = useSelector(state => state.userReducer.user)
  return <div className="App">
    <AppHeader />
    <Routes>
      <Route path='' element={<HomePage />} />
      <Route path='login' element={<Login />} />
      <Route path='information' element={<Informetion />} />
      {user?.isAdmin && <Route path='pagita' element={<PagitaApp />} >
        <Route path=':pagId' element={<PagDetails />} />
      </Route >}
      <Route path='personal' element={<Personal />} />
      <Route path='personal/:babyId' element={<PersonalDetails />} />

    </Routes>


  </div>

}

export default App;
