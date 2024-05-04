import React from 'react';
import PostList from './PostList';
import './PrivateForum.css'

function PrivateForum({list}) {
    return(
        <div className="PF">
            <div>
                <h1 id="title">Forum Privé</h1>
            </div>
            <div>
                <PostList list={list}/>
            </div>
        </div>
    )
}

export default PrivateForum;