import React, { useEffect, useState } from 'react';
import Post from './Post'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000'

function PostList({list}) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`/posts/`)
        .then(response => {
            setPosts(response.data)
        })
        .catch(error => {
            console.error('Erreur', error);
        })
    }, []);

    return(
        <div>
            {posts.map(post => (
                <Post key={post._id} post={post} />
            ))}
        </div>
    );
}

export default PostList;
