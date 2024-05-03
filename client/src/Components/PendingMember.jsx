import React from 'react';
import "./PendingMember.css"
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:4000'


function PendingMember({user}) {

    const token = localStorage.getItem("token");

    // Fonctions
    const Approve = () => {
        const credentials = {
            "valid": true,
        };

        axios.patch(`/users/edit/${user.username}`, credentials, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        })
        .catch(error => {
            console.error('Erreur', error);
        })
    };

    const Refuse = () => {
        axios.delete(`/users/delete/${user.username}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        })
        .catch(error => {
            console.error('Erreur', error);
        })
    };

    return(
        <div id="validate">
            <img id="pfp" src={user.photo} alt="logo"></img>
            <p>{user.username}</p>
            <button onClick={Approve}>ok</button>
            <button onClick={Refuse}>no</button>
        </div>
    )
}

export default PendingMember;