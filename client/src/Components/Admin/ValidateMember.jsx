import React from 'react';
import PendingMember from './PendingMember';
import "./ValidateMember.css"
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:4000/api'
import { useState, useEffect } from 'react';

function ValidateMember() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`/users/valid/no`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => {
            setUsers(response.data)
        })
        .catch(error => {
            console.error('Erreur', error);
        })
    }, [users]);

    return(
        <div>
            <h1>Liste des Utilisateurs en Attente de Validation</h1>
            {users.map(userx => (
                <PendingMember user={userx} />
            ))}
        </div>
    )
}

export default ValidateMember;