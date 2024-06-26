import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Comment.css'
import Heart from 'react-heart'
import moment from 'moment';
axios.defaults.baseURL = 'http://localhost:4000/api'

function Comment({ id, del }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");
    const [active, setActive] = useState(false); //pour le coeur
    const [post, setPost] = useState(""); //pour le coeur

    useEffect(() => {
        axios.get(`posts/comment/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
            setPost(response.data);
        })
        .catch(error => {
            console.error('Erreur', error);
        });

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
        setActive(!active)
    };
    
    // temps écoulé depuis la date de publication
    const formatElapsedTime = (publishDate) => {
        return moment(publishDate).fromNow(); // Utilisez moment pour obtenir le temps écoulé
    };

    return (
        <div className="comment">
            <div id="commentupper">
                <img id="pfp" src={user.photo} alt="pfp" />
                <div id="info">
                    <p id="prenom"> {user.surname} </p>
                    {user.admin ? <a href="" onClick={GoToProfil}><p>{user.username} ⭐</p></a> : <a href="" onClick={GoToProfil}><p>{user.username}</p></a>}
                </div>
                <p id="commentdate">{formatElapsedTime(post.sendingDate)}</p>
                {del && <button onClick={Delete}>X</button>}
            </div>
            <div className="commenttextmessage">
                <p>{post.message}</p>
            </div>
            <div id="likes">
                <div style={{ width: "1.7rem" }}>
                    <Heart id="heart" isActive={active} onClick={Like} />
                    <p>{post.likes}</p>
                </div>
            </div>
        </div>
    );
}

export default Comment;
