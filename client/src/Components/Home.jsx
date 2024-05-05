import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import SearchBar from './SearchBar';
import TextBox from './TextBox';
import PostList from './PostList';
axios.defaults.baseURL = 'http://localhost:4000'

function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState()
    const location = useLocation();
    const username = location.state.username // fetch username depuis la page de login
    
    // Données sur l'utilisateur:
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`/users/${username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des informations utilisateur', error);
            }
        };
        fetchUserData();
    }, []);

    // Fonction pour naviguer vers la page Profil
    const goToProfil = () => {
        navigate(`/profile/${username}`, { state : { username : username} });
    };

    return (

        <div className="container">
            <div className="Panel">
            <div className="userBox">
                    <div className="picture">
                        {user && user.photo && <img src={user.photo} alt="photo de profil"></img>}
                    </div>
                    <div className='userInfo'>
                        {user && <p className='nameInfo'>{user.surname} {user.name}</p>}
                        {user && <p>@{user.username}</p>}
                    </div>
                </div>
                <button id="button" onClick={goToProfil}>Profil</button>
            </div>
            <div id="Feed">
                <TextBox username={username} />
                <PostList username={username} />

            </div>
            <div className="Panel">
                <h2>Explorer</h2>
                <SearchBar />
            </div>
        </div>


    );
}

export default Home;