import React, { useState } from 'react';
import Home from './Home'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000'

function Login() {

    const [currentPage, setCurrentPage] = React.useState(null);

    // State pour gérer les champs de formulaire
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Fonction pour soumettre le formulaire
    const handleSubmit = (event) => {
        event.preventDefault();
        const credentials = {
            "username": username,
            "password": password
        };
        
        axios.post('/login', credentials) 
        .then(response => {
            console.log("Successful login");
            if(response.status == 200) {
                setCurrentPage('Home');
            }
        })
        .catch(error => {
            console.error('Erreur', error);
        });        
    };

    return (
        <div>

            {currentPage === 'Home' ? <Home username={username} /> : (
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
            )}
        </div>
    );
}

export default Login;
    