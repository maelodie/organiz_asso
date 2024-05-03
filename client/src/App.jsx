import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Start from './Components/Start'
import Home from './Components/Home'
import Profil from './Components/Profil';
import PrivateForum from './Components/PrivateForum';
import ValidateMember from './Components/ValidateMember';
import WaitingRoom from './Components/WaitingRoom';
import HomeAdmin from './Components/HomeAdmin';
import ValidateAdmin from './Components/ValidateAdmin';
import './App.css'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Start />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Vérifiez si user est défini avant de passer le nom d'utilisateur */}
                <Route path='/home' element={<Home />} />
                <Route path='/homeAdmin' element={<HomeAdmin />} />

                <Route path='/waitingRoom' element={<WaitingRoom />} />
                <Route path='/profile/:username' element={<Profil />} />
                <Route path='/privateForum' element={<PrivateForum />} />
                <Route path='/validateMembers' element={<ValidateMember />} />
                <Route path='/adminStatus' element={<ValidateAdmin />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
