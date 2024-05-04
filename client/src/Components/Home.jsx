import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import SearchBar from './SearchBar';
import TextBox from './TextBox';
import PostList from './PostList';
axios.defaults.baseURL = 'http://localhost:4000'

function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state.username // fetch username depuis la page de login
    // Fonction pour naviguer vers la page Profil
    const goToProfil = () => {
        navigate(`/profile/${username}`, { state : { username : username} });
    };

    return (

        <div className="container">
            <div className="Panel">
                <h2>Navigation</h2>
                <button onClick={goToProfil}>Profil</button>
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

export default Home;