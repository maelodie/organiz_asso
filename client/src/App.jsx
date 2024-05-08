import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Auth/Login';
import SignUp from './Components/Auth/SignUp';
import Start from './Components/Auth/Start'
import Home from './Components/Home'
import Profil from './Components/UserProfile/Profil';
import PrivateForum from './Components/Feed/PrivateFeed/PrivateForum';
import ValidateMember from './Components/Admin/ValidateMember';
import WaitingRoom from './Components/Auth/WaitingRoom';
import HomeAdmin from './Components/Admin/HomeAdmin';
import ValidateAdmin from './Components/Admin/ValidateAdmin';
import ProfilPrivate from './Components/UserProfile/ProfilPrivate';
import SearchResults from './Components/Search/SearchResults'
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
                <Route path='/profilePrivate/:username' element={<ProfilPrivate />} />
                <Route path='/privateForum' element={<PrivateForum />} />
                <Route path='/validateMembers' element={<ValidateMember />} />
                <Route path='/adminStatus' element={<ValidateAdmin />} />
                <Route path='/search' element={<SearchResults />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
