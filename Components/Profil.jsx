import React from 'react';
import Posts from './PostList';
import PostList from './PostList';
import Post from './Post';
import './Profil.css'

function Profil({couverture, photo, username, bio, list}) {
    return(
        <div>
            <img id="couverture" src={couverture} alt="couverture"></img>
            <img src={photo} alt="photo"></img>
            <p id="user">{username}</p>
            <p>{bio}</p>
            <Post photo={photo} username={username} date="19-04-2024" text="eternal sunshine and TTPD area EATING" like="1989"/>
            <PostList list={list}/>
        </div>
    )
}

export default Profil;