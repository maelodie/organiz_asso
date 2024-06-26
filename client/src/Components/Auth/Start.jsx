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
      <img src="https://png.pngtree.com/png-clipart/20230325/original/pngtree-aesthetic-lavender-png-image_9003211.png" alt="logo"></img>
      <button onClick={goToLogin}>Connexion</button>
      <button onClick={goToSignUp}>Inscription</button>
    </div>
  );
}

export default Start;
