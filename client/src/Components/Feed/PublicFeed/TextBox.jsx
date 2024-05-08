import React, { useState } from 'react';
import './TextBox.css';
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000'

function TextBox({username}){
    // State pour gérer les champs de formulaire
    const [text, setText] = useState('');
    const token = localStorage.getItem("token");

    // Gestion de la soumission
    const handleSubmit = async (e) => {
        e.preventDefault(); // pour empecher le reload
        console.log(text);
    
        try {    
            // On utilise l'id de l'utilisateur pour créer un nouveau message
            const newMessage = { 
                "author": username,
                "message": text,
                "privacy": false
            };
            console.log(newMessage);
    
            // Envoi du nouveau message
            const postResponse = await axios.post('/posts/', newMessage, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            });
            if(postResponse.status === 201) {
                console.log("Le message a bien été créé");
                setText("");
            }
        } catch (error) {
            console.error('Erreur', error);
        }
    };
    

    return(
        <form id="form" onSubmit={handleSubmit}>
            <div>
                <textarea
                id="input"
                placeholder="Partagez vos pensées..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                />
            </div>
            <button type="submit">Poster</button>
        </form>

    )
}

export default TextBox;