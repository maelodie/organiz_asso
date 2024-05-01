import React, { useEffect, useState } from 'react';
import Post from './Post'
function PostList({list}) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // requête pour chercher tous les posts de la base de donnée
        axios.get(`/posts/`)
        .then(response => {
            setPosts(response.data)
        })
        .catch(error => {
            console.error('Erreur', error);
        })
    })

    return(
        <div>
            {posts.map(post => (
                <Post key={post._id} post={post} />
            ))}
        </div>
    );
}

export default PostList;
