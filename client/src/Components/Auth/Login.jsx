import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:4000/api';

function Login() {
    const navigate = useNavigate();

    // State pour gérer les champs de formulaire
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false)
    const [textError, setTextError] = useState('')

    // Fonction pour soumettre le formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(false);
        
        const credentials = {
            "username": username,
            "password": password
        };

        try {

            const response = await axios.post('/auth/login', credentials);
            
            if (response.status === 200) {
                localStorage.setItem("token", response.data.token); // on store le token localement 

                const token = localStorage.getItem("token");
                axios.get(`/users/${username}`, { headers: { Authorization: `Bearer ${token}` }})
                .then(response => {
                    if(response.data.valid == false){
                        navigate('/waitingRoom');       //Utilisateur non validé, donc vers la salle d'attente
                    }
                    else{
                        if(response.data.admin == false){
                            navigate('/home', { state : { username : username} } ); // Rediriger l'utilisateur vers la page d'accueil normal
                        }
                        else{
                            navigate('/homeAdmin', { state : { username : username} } ); // Rediriger l'utilisateur vers la page d'accueil admin
                        }
                    }
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des informations utilisateur', error);
                });


            }

        } catch (error) {
            setError(true);
            setTextError("Cet utilisateur n'existe pas ou le mot de passe est erroné.");
        }
    };

    return (
        <div className='premier'>
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        placeholder="Nom d'utilisateur"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-wrapper">
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p>{textError} </p>}
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}

export default Login;
