import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import SearchBar from './SearchBar';
import TextBox from './TextBox';
import PostList from './PostList';

axios.defaults.baseURL = 'http://localhost:4000'

function HomeAdmin() {
    const navigate = useNavigate();
    const location = useLocation();
    // fetch username depuis la page de login
    const username = location.state.username
    // Fonction pour naviguer vers la page Profil
    const goToProfil = () => {
        navigate(`/profile/${username}`, { state : { username : username} });
    };

    // Fonctions pour naviguer vers différentes pages
    const goToValidateMember = () => {
        navigate('/validateMembers');
    }
    
    const goToPrivateForum = () => navigate('/privateForum');
    const goToAdminStatus = () => navigate('/adminStatus');

    return (

        <div className="container">
            <div className="Panel">
                <h2>Navigation</h2>
                <button onClick={goToProfil}>Profil</button>
                <button onClick={goToPrivateForum}>Forum Privé</button>
                <button onClick={goToValidateMember}>Validation Membre</button>
                <button onClick={goToAdminStatus}>Changement admin</button>
            </div>
            <div id="Feed">
                <h1>Feed</h1>
                <TextBox username={username } />
                <PostList />
            </div>
            <div className="Panel">
                <h2>Recherche</h2>
                <SearchBar />
            </div>
        </div>


    );
}

export default HomeAdmin;