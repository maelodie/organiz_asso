import React from 'react';
import "./PendingMember.css"

function PendingMember({photo, username}) {

    // Fonctions
    const Approve = () => {
        //Code
    };

    const Refuse = () => {
        //Code
    };

    return(
        <div id="validate">
            <img id="pfp" src={photo} alt="logo"></img>
            <p>{username}</p>
            <button onClick={Approve}>ok</button>
            <button onClick={Refuse}>no</button>
        </div>
    )
}

export default PendingMember;