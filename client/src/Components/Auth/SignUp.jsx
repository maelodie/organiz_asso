import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:4000'

function SignUp() {

    const navigate = useNavigate()

    // State pour gérer les champs de formulaire
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUSerName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Fonction pour soumettre le formulaire
    const handleSubmit = (event) => {
        event.preventDefault();

        if (password != confirmPassword) {
            alert("Les mot des passe ne sont pas identiques");

        } else {

            const credentials = {
                "surname": firstName,
                "name": lastName,
                "username": username,
                "email": email,
                "password": password
            };

            axios.post('auth/signup', credentials)
                .then(response => {
                    const status = response.status;
                    if (status === 201) {
                        navigate('/waitingRoom');
                    }
                })
                .catch(error => {
                    if (error.response && error.response.status === 409) {
                        // Erreur 409 spécifique
                        alert("Ce nom d'utilisateur existe déjà.");
                    } else {
                        // Autres erreurs
                        console.error('Erreur', error);
                        alert("Une erreur s'est produite lors de la communication avec le serveur.");
                    }
                });


        }
    };

    return (
        <div className="premier">
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Prénom"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Nom"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Nom d'utilisateur"
                        value={username}
                        onChange={(e) => setUSerName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="email"
                        placeholder="Adresse e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Confirmer le mot de passe"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
}

export default SignUp;
