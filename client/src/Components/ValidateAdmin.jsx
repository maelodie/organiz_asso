import React from 'react';
import PendingMember from './PendingMember';
import PendingMemberList from './PendingMemberList';
import "./ValidateMember.css"
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:4000'
import { useState, useEffect } from 'react';
import IsMemberAdmin from './IsMemberAdmin';

function ValidateAdmin() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`/users/valid/yes`, {
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
    }, []);

    return(
        <div>
            <h1>En attente</h1>
            {users.map(userx => (
                <IsMemberAdmin user={userx} />
            ))}
        </div>
    )
}

export default ValidateAdmin;