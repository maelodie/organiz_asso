import React, { useState } from 'react';
import './PrivateTextBox.css';
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000'

function PrivateTextBox({username}){
    // State pour gérer les champs de formulaire
    const [text, setText] = useState('');
    const token = localStorage.getItem("token");
    let id;

    // Gestion de la soumission
    const handleSubmit = async (e) => {
        e.preventDefault(); // pour empecher le reload
    
        try {    
            // On utilise l'id de l'utilisateur pour créer un nouveau message
            const newMessage = { 
                "author": username,
                "message": text,
                "privacy": true
            };
    
            // Envoi du nouveau message
            const postResponse = await axios.post('/posts/', newMessage, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            });
            if(postResponse.status === 201) {
                setText("");
            }
        } catch (error) {
            console.error('Erreur', error);
        }
    };
    

    return(
        <form id="input2" onSubmit={handleSubmit}>
            <div>
                <textarea
                placeholder="Exprimez-vous..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                />
            </div>
            <button type="submit">Poster</button>
        </form>

    )
}

export default PrivateTextBox;