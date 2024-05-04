import React from 'react';
import PendingMember from './PendingMember';
import PendingMemberList from './PendingMemberList';
import "./ValidateMember.css"
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:4000'
import { useState, useEffect } from 'react';

function ValidateMember() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`/users/isNotValid`, {
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
            <h1>En attente</h1>
            {users.map(userx => (
                <PendingMember user={userx} />
            ))}
        </div>
    )
}

export default ValidateMember;