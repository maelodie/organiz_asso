import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Profil.css';
import Post from './Post'

axios.defaults.baseURL = 'http://localhost:4000';

function ProfilPrivate() {
    const location = useLocation();
    const username = location.state.username;
    const [user, setUser] = useState('');
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`/users/${username}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setUser(response.data);
            axios.get(`/posts/post/${response.data._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des posts', error);
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des informations utilisateur', error);
        });
    }, [username, posts]);


    return (
        <div>
            <img id="couverture" src={user.cover} alt="couverture"></img>
            <img src={user.photo} alt="photo"></img>
            {user.admin ? <p id="user">{username} ⭐</p> : <p id="user">{username}</p>}
            <p>{user.bio}</p>
            {posts.slice().reverse().map(postx => (
                <Post post={postx} del={false} />
            ))}
        </div>
    );
}

export default ProfilPrivate;
