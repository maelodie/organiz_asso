import React from 'react';
import Posts from './PostList';
import PostList from './PostList';
import Post from './Post';
import './Profil.css'

function Profil({cover, photo, username, bio, list}) {
    return(
        <div>
            <img id="couverture" src={cover} alt="couverture"></img>
            <img src={photo} alt="photo"></img>
            <p id="user">{username}</p>
            <p>{bio}</p>
        </div>
    )
}

export default Profil;