import React, { useState } from 'react';
import './TextBox.css';
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000'

function TextCommentBox({username, post}){
    // State pour gérer les champs de formulaire
    const [text, setText] = useState('');
    const token = localStorage.getItem("token");

    // Gestion de la soumission
    const handleSubmit = async (e) => {
        e.preventDefault(); // pour empecher le reload
        console.log(text);
        console.log(username);
    
        try {
            // On prend d'abord l'ID de l'utilisateur 
            const response = await axios.get(`/users/${username}`, {
                params: { username: username }, // Inclure les paramètres pour passer le nom d'utilisateur
                headers: { Authorization: `Bearer ${token}`}
            });
            const id = response.data._id;
            console.log(id)
    
            // On utilise l'id de l'utilisateur pour créer un nouveau message
            const newMessage = { 
                "author": id,
                "message": text,
                "privacy": false
            };
            console.log(newMessage);
    
            // Envoi du nouveau message
            const postResponse = await axios.post('/posts/comment', newMessage, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
            })
            .then(response => {

                // Récupérer les réponses actuelles du post
                const currentAnswers = post.answers;

                // Ajouter le nouveau commentaire à la liste des réponses
                const updatedAnswers = [...currentAnswers, response.data];

                // Mettre à jour le post avec la nouvelle liste de réponses
                axios.patch(`/posts/${post._id}`, { answers: updatedAnswers }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log("Le commentaire a bien été ajouté");
                setText("");
            })
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

export default TextCommentBox;