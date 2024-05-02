import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profil.css';

axios.defaults.baseURL = 'http://localhost:4000';

function Profil({ username }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // On veut les données sur l'utilisateur
        axios.get(`/users/${username}`, { params: { username: username } })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Erreur', error);
            });
    }, [username]);

    if (!user) {
        return;
    }

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
