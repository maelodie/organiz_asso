import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Home.css';
import axios from 'axios';
import SearchBar from '../Search/SearchBar';
import TextBox from '../Feed/PublicFeed/TextBox';
import PostList from '../Feed/PublicFeed/PostList';

axios.defaults.baseURL = 'http://localhost:4000'

function HomeAdmin() {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState()
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
        navigate(`/profile/${username}`, { state: { username: username } });
    };

    // Fonctions pour naviguer vers différentes pages
    const goToValidateMember = () => {
        navigate('/validateMembers');
    }

    const goToPrivateForum = () => navigate('/privateForum', { state: { username: username } });
    const goToAdminStatus = () => navigate('/adminStatus', { state: { username: username } });


    // Fonction pour récupérer la liste des posts publics 
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
                <button className="button" onClick={goToProfil}>Profil</button>
                <button className="button" onClick={goToPrivateForum}>Forum Privé</button>
                <button className="button" onClick={goToValidateMember}>Validation Utilisateurs</button>
                <button className="button" onClick={goToAdminStatus}>Gestion des Administrateurs</button>
            </div>
            <div id="Feed">
                <h1>Bienvenue, {user && user.surname}! </h1>
                <TextBox username={username} />
                <PostList username={username} />
            </div>
            <div className="Recherche">
                <h2> Explorer </h2>
                <SearchBar />
            </div>
        </div>


    );
}

export default HomeAdmin;