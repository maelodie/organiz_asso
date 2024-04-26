import React, { useState } from 'react';
import Home from './Home'

function SignUp() {

    const [currentPage, setCurrentPage] = React.useState(null);

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
            // Comportement à coder
            console.log('First Name:', firstName);
            console.log('Last Name:', lastName);
            console.log('Username:', username);
            console.log('Email:', email);
            console.log('Password:', password);
            console.log('Confirm Password:', confirmPassword);

            //Condition & MAJ BDD ->
            setCurrentPage('Home');
    };
    
    return (
        <div>
            {currentPage === 'Home' ? <Home /> : (
                <div className="premier">
                    <h1>SignUp</h1>
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
            )}
        </div>
    );
}
    
export default SignUp;
    