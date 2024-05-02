import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import SearchBar from './SearchBar';
import Profil from './Profil';
import PrivateForum from './PrivateForum';
import ValidateMember from './ValidateMember';
import TextBox from './TextBox';
import PostList from './PostList';

axios.defaults.baseURL = 'http://localhost:4000'

function Home({ username }) {
    const navigate = useNavigate();
    const [user, setUser] = useState('');

    // Fonction pour naviguer vers la page Connexion
    const goToProfil = () => {

        axios.get(`/users/${username}`, { params: { username: username } })
            .then(response => {
                setUser(response.data);
                
            })
            .catch(error => {
                console.error('Erreur', error);
            })
        navigate(`/profile/${username}`);
    };


    // Fonctions pour naviguer vers différentes pages
    const goToValidateMember = () => navigate('/validateMembers');
    const goToPrivateForum = () => navigate('/privateForum');



    // Rendu conditionnel en fonction de la page actuelle
    return (

        <div className="container">
            <div className="Panel">
                <h2>Navigation</h2>
                <button onClick={goToProfil}>Profil</button>
                <button onClick={goToPrivateForum}>Forum Privé</button>
                <button onClick={goToValidateMember}>Validation Membre</button>
            </div>
            <div id="Feed">
                <h1>Feed</h1>
                <TextBox username={username} />
                <PostList />
            </div>
            <div className="Panel">
                <h2>Recherche</h2>
                <SearchBar />
            </div>
        </div>


    );
}

export default Home;