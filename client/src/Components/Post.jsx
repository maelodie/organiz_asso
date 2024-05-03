import React, { useState, useEffect } from 'react';
import './Post.css';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000'

function Post({ post, del }) {
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

    return (
        <div className="post">
            <div id="upper">
                <img id="pfp" src={user.photo} alt="pfp" />
                <p>{user.username}</p>
                <p>{post.sendingDate}</p>
                {del && <button onClick={Delete}>X</button>}
            </div>
            <div id="text">
                <p>{post.message}</p>
            </div>
            <div>
                <p>{post.likes} likes ❤️</p>
            </div>
        </div>
    );
}

export default Post;
