import React from 'react';

import { useLocation } from 'react-router-dom';
import Post from '../../Posts/Post';
import PrivatePostLists from './PrivatePostList';
import PrivateTextBox from './PrivateTextBox';
import './PrivateForum.css'


function PrivateForum({list}) {
    // fetch le nom de l'utilisateur
    const location = useLocation()
    const username = location.state.username

    return(
        <div className="PF">
            <div>
                <h1 id="title">Forum Privé</h1>
            </div>
            <div>
                <h1>Communication Restreinte</h1>
                <PrivateTextBox username={ username }/>
                <PrivatePostLists username={ username }/>
            </div>
        </div>
    )
}

export default PrivateForum;