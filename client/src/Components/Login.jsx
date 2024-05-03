import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';

function Login() {
    const navigate = useNavigate();

    // State pour gérer les champs de formulaire
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Fonction pour soumettre le formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();
        const credentials = {
            "username": username,
            "password": password
        };

        try {
            const response = await axios.post('/auth/login', credentials);
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token) // on store le token localement 
                navigate('/home', { state : { username : username} } ); // Rediriger l'utilisateur vers la page d'accueil
            }
        } catch (error) {
            console.error('Erreur', error);
        }
    };

    return (
        <div className='premier'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-wrapper">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}

export default Login;
