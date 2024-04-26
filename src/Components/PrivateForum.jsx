import React from 'react';
import Post from './Post';
import PostList from './PostList';
import './PrivateForum.css'

function PrivateForum({list}) {
    return(
        <div className="PF">
            <div>
                <h1 id="title">Forum Privé</h1>
            </div>
            <div>
                <Post photo="https://apicms.thestar.com.my/uploads/images/2022/10/27/thumbs/large/1793279.jpeg" username="tayrianastan13" date="19-04-2024" text="eternal sunshine and TTPD area EATING" like="1989"/>
                <Post/>
                <PostList list={list}/>
            </div>
        </div>
    )
}

export default PrivateForum;