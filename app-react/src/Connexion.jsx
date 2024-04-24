import React, { useState } from 'react';
import './Connexion.css'; // Importez le fichier CSS

function Connexion() {
  // State pour gérer les champs de formulaire
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Fonction pour soumettre le formulaire
  const handleSubmit = (event) => {
    event.preventDefault();
    // Ici, vous pouvez ajouter la logique pour traiter les données du formulaire, par exemple, envoyer une requête HTTP à un serveur
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div className="login-container"> {/* Utilisez la classe CSS login-container */}
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
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
        </div>
        <button type="submit">Se connecter</button>
        </form>
    </div>
    );
}

export default Connexion;
