import React, { useState, useEffect } from 'react';
import "./ValidateMember.css"
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:4000/api'
import IsMemberAdmin from './IsMemberAdmin';
import { useLocation } from 'react-router-dom';

function ValidateAdmin() {
    const [users, setUsers] = useState([]);
    const location = useLocation();
    const username = location.state.username;

    useEffect(() => {
        // Fetch user information
        axios.get(`/users/${username}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des informations utilisateur', error);
        });

        // Fetch valid users
        axios.get(`/users/valid/yes`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            // Excluding thisUser from the list of users
            const filteredUsers = response.data.filter(user => user.username !== username);
            setUsers(filteredUsers);
        })
        .catch(error => {
            console.error('Erreur', error);
        });
    }, [username, users]); // Include username as a dependency if it can change

    return(
        <div>
            <h1>Gestion des Statuts Administrateurs des Utilisateurs</h1>
            {users.map(userx => (
                <IsMemberAdmin key={userx.username} user={userx} />
            ))}
        </div>
    )
}

export default ValidateAdmin;