import React, { useState } from 'react';
import './TextBox.css';
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000'

function TextBox({username}){
    // State pour gérer les champs de formulaire
    const [text, setText] = useState('');
    let id;

    // Gestion de la soumission
    const handleSubmit = async (e) => {
        e.preventDefault(); // pour empecher le reload
        console.log(text);
    
        try {
            // On prend d'abord l'ID de l'utilisateur 
            const response = await axios.get(`/users/${username}`, { params: { username: username } });
            const id = response.data._id;
    
            // On utilise l'id de l'utilisateur pour créer un nouveau message
            const newMessage = { 
                "author": id,
                "message": text
            };
            console.log(newMessage);
    
            // Envoi du nouveau message
            const postResponse = await axios.post('/posts/', newMessage);
            if(postResponse.status === 201) {
                console.log("Le message a bien été créé");
            }
        } catch (error) {
            console.error('Erreur', error);
        }
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