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
      <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/LEGO_logo.svg" alt="logo"></img>
      <button onClick={goToLogin}>Login</button>
      <button onClick={goToSignUp}>SignUp</button>
    </div>
  );
}

export default Start;
