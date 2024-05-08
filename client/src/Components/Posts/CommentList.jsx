import React, { useEffect, useState } from 'react';
import Comment from './Comment'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000/api'

function CommentList({post}) {

    return(
        <div>
            {post.answers.map((answer, index) => (
                <Comment key={index} id={answer.insertedId} del={false} />
            ))}
        </div>
    );
}

export default CommentList;
