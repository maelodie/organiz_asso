import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Start from './Components/Start'
import Home from './Components/Home'
import Profil from './Components/Profil';
import PrivateForum from './Components/PrivateForum';
import ValidateMember from './Components/ValidateMember';
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Start />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                <Route path='/home' element={<Home />} />

                <Route path='/profile/:username' element={<Profil /> }/>
                <Route path='/privateForum' element={<PrivateForum />} />
                <Route path='/validateMembers' element={<ValidateMember />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;