import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Profil.css';

axios.defaults.baseURL = 'http://localhost:4000';

function Profil() {
    const location = useLocation();
    const username = location.state.username;
    const [user, setUser] = useState('');

    // requête pour obtenir les informations sur une personne
    useEffect(() => {

        const token = localStorage.getItem("token");
        axios.get(`/users/${username}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setUser(response.data)
            })
            .catch(error => {
                console.error('Erreur', error);
            });
    }, []);

    return (
        <div>
            <img id="couverture" src={user.cover} alt="couverture"></img>
            <img src={user.photo} alt="photo"></img>
            <p id="user">{username}</p>
            <p>{user.bio}</p>
        </div>
    );
}

export default Profil;
