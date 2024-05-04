import React, { useEffect, useState } from 'react';
import Post from './Post'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000'

function PrivatePostList() {
    const [posts, setPosts] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get(`/posts/privatePosts`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setPosts(response.data)
        })
        .catch(error => {
            console.error('Erreur', error);
        })
    }, [posts]);

    return(
        <div>
            {posts.slice().reverse().map(post => (
                <Post post={post} />
        ))}
        </div>
    );
}

export default PrivatePostList;
