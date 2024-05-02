import React from 'react';
import PendingMember from './PendingMember';
import PendingMemberList from './PendingMemberList';
import "./ValidateMember.css"

function ValidateMember() {
    return(
        <div>
            <h1>En attente</h1>
            <PendingMember />
        </div>
    )
}

export default ValidateMember;