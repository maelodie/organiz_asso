import React from 'react';
import PendingMember from './PendingMember';
import PendingMemberList from './PendingMemberList';
import "./ValidateMember.css"

function ValidateMember() {
    return(
        <div>
            <h1>En attente</h1>
            <PendingMember photo="https://upload.wikimedia.org/wikipedia/commons/2/24/LEGO_logo.svg" username="tayloerswift13"/>
            <PendingMember photo="https://64.media.tumblr.com/35bd2a1f5c1a0d07355704e492877890/a0a23ebb7a732154-df/s1280x1920/f39572d4ddbd4a71c6deeb444922beb2ac77cc68.jpg" username="ariolatanked"/>
            <PendingMemberList/>
        </div>
    )
}

export default ValidateMember;