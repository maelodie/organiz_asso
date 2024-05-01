import React, { useState } from 'react';
import './TextBox.css';
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000'

function TextBox({username}){
    // State pour gérer les champs de formulaire
    const [text, setText] = useState('');
    let id;
    //Fonction
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.get('/users/getID/${username}')
        .then(response => {
            id = response.id;
        })
        .catch(error => {
            console.error('Erreur', error);
        });  
    };

    return(
        <form id="input" onSubmit={handleSubmit}>
            <div>
                <textarea
                placeholder="Type here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                />
            </div>
            <button type="submit">Post</button>
        </form>

    )
}

export default TextBox;