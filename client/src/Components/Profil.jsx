import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Profil.css';
import Post from './Post'

axios.defaults.baseURL = 'http://localhost:4000';

function Profil() {
    const location = useLocation();
    const username = location.state.username;
    const [user, setUser] = useState('');
    const [posts, setPosts] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // État pour gérer l'édition
    const [cover, setCover] = useState('');
    const [photo, setPhoto] = useState('');
    const [bio, setBio] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`/users/${username}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setUser(response.data);
            setCover(response.data.cover);
            setPhoto(response.data.photo);
            setBio(response.data.bio);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des informations utilisateur', error);
        });
    }, [username]);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get(`/posts/post/${user._id}`, {
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
    }, [user._id, posts]);
    

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const response = await axios.patch(`/users/edit/${user._id}`, {
                cover,
                photo,
                bio
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setIsEditing(false);
            setUser(response.data);
        } catch (error) {
            console.error('Erreur lors de la mise à jour du profil', error);
        }
    };

    return (
        <div>
            <img id="couverture" src={user.cover} alt="couverture"></img>
            <img src={user.photo} alt="photo"></img>
            <p id="user">{username}</p>
            <p>{user.bio}</p>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
                    <input type="text" value={cover} onChange={(e) => setCover(e.target.value)} />
                    <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} />
                    <textarea value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
                    <button type="submit">Enregistrer</button>
                </form>
            ) : (
                <button onClick={handleEdit}>Modifier</button>
            )}
            {posts.map(postx => (
                <Post post={postx} del={true} />
            ))}
        </div>
    );
}

export default Profil;
