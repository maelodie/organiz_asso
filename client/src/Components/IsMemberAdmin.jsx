import React from 'react';
import "./PendingMember.css"
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:4000'


function isMemberAdmin({user}) {

    const token = localStorage.getItem("token");

    // Function to toggle admin status
    const toggleAdminStatus = () => {
        // Determine the new admin status
        const newAdminStatus = !user.admin;

        // Data to be sent in the request
        const credentials = {
            "admin": newAdminStatus,
        };

        // Send PATCH request to update user's admin status
        axios.patch(`/users/edit/${user.username}`, credentials, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };


    return(
        <div id="validate">
            <img id="pfp" src={user.photo} alt="logo"></img>
            <p>{user.username}</p>
            <button onClick={toggleAdminStatus}> {user.admin ? "Enlever le statut admin" : "Changer en admin"} </button>
        </div>
    )
}

export default isMemberAdmin;