import React from 'react';
import { useNavigate } from 'react-router-dom';

function Start() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  const goToSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="premier">
      <img src="https://png.pngtree.com/png-clipart/20211009/original/pngtree-aesthetic-pink-flower-logo-with-outline-png-image_6846146.png" alt="logo"></img>
      <button onClick={goToLogin}>Connexion</button>
      <button onClick={goToSignUp}>Inscription</button>
    </div>
  );
}

export default Start;
