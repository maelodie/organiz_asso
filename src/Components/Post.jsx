import React, { useState } from 'react';
import './Post.css';

function Post({photo, username, date, text, like}) {
    return(
        <div className="post">
            <div id="upper">
                <img id="pfp" src={photo} alt="pfp"></img>
                <p>{username}</p>
                <p>{date}</p>
            </div>
            <div id="text">
                <p>{text}</p>
            </div>
            <div>
                <p> {like} likes ❤️</p>
            </div>
        </div>
    )
}

export default Post;