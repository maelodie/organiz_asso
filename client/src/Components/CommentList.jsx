import React, { useEffect, useState } from 'react';
import Comment from './Comment'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000'

function CommentList({post}) {
   /* const [posts, setPosts] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get(`/posts/${post._id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setPosts(response.data.answers)
        })
        .catch(error => {
            console.error('Erreur', error);
        })
    }, [posts]);*/

    return(
        <div>
            {post.answers.map((answer, index) => (
                <Comment key={index} post={answer} del={false} />
            ))}
        </div>
    );
}

export default CommentList;
