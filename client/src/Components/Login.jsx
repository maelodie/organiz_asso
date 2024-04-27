import React, { useState } from 'react';
import Home from './Home'

function Login() {

    const [currentPage, setCurrentPage] = React.useState(null);

    // State pour gérer les champs de formulaire
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Fonction pour soumettre le formulaire
    const handleSubmit = (event) => {
        event.preventDefault();
        //Comportement à coder
        console.log('Username:', username);
        console.log('Password:', password);
        //Conditions & Verification BDD puis ->
        setCurrentPage('Home');
    };

    return (
        <div>
            {currentPage === 'Home' ? <Home /> : (
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
    