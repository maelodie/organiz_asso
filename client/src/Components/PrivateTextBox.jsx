import React, { useState } from 'react';
import './TextBox.css';
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
            // On prend d'abord l'ID de l'utilisateur 
            const response = await axios.get(`/users/${username}`, {
                params: { username: username }, // Inclure les paramètres pour passer le nom d'utilisateur
                headers: { Authorization: `Bearer ${token}`}
            });
            const id = response.data._id;
    
            // On utilise l'id de l'utilisateur pour créer un nouveau message
            const newMessage = { 
                "author": id,
                "message": text,
                "privacy": true
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
        <form id="input" onSubmit={handleSubmit}>
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