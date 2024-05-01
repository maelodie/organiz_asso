import React, { useState } from 'react';
import './Post.css';

function Post({key, post}) {

    return(
        <div className="post">
            <div id="upper">
                <img id="pfp" src={post.author} alt="pfp"></img>
                <p>{post.author}</p>
                <p>{post.date}</p>
            </div>
            <div id="text">
                <p>{post.message}</p>
            </div>
            <div>
                <p> {post.likes} likes ❤️</p>
            </div>
        </div>
    )
}

export default Post;