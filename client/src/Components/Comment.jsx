import React, { useState, useEffect } from 'react';
import './Post.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextCommentBox from './TextCommentBox';
import CommentList from './CommentList';

axios.defaults.baseURL = 'http://localhost:4000'

function Comment({ post, del }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (post.author) {
            axios.get(`users/${post.author}`, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Erreur', error);
            });
        }
    }, [post.author]);

    if (!user) {
        return;
    }

    const Delete = () => {
        axios.delete(`/posts/delete/${post._id}`, { headers: { Authorization: `Bearer ${token}` }})
        .catch(error => {
            console.error('Erreur', error);
        })
    };

    const GoToProfil = () => {
        navigate(`/profilePrivate/${user.username}`, { state : { username : user.username} });
    };

    const Like = () => {
        // Obtention de la valeur actuelle des likes
        const currentLikes = post.likes;

        // Mise à jour locale de la valeur des likes (incrémentation)
        const updatedLikes = currentLikes + 1;

        // Préparation des données à envoyer dans la requête PATCH
        const credentials = {
            likes: updatedLikes
        };
        
        axios.patch(`/posts/${post._id}`, credentials, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        })
        .catch(error => {
            console.error('Erreur', error);
        })
    };

    return (
        <div className="post">
            <div id="upper">
                <img id="pfp" src={user.photo} alt="pfp" />
                {user.admin ? <a href="" onClick={GoToProfil}><p>{user.username} ⭐</p></a> : <a href="" onClick={GoToProfil}><p>{user.username}</p></a>}
                <p>{post.sendingDate}</p>
                {del && <button onClick={Delete}>X</button>}
            </div>
            <div id="text">
                <p>{post.message}</p>
            </div>
            <div>
                <p>{post.likes} likes <button onClick={Like}>❤️</button></p>
            </div>
        </div>
    );
}

export default Comment;
