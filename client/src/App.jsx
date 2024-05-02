import React, { useEffect , useState} from 'react';
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import axios from 'axios'
import './App.css'

// port du server 
axios.defaults.baseURL = 'http://localhost:4000'
function App() {
    const [currentPage, setCurrentPage] = React.useState(null);

    // Fonction pour naviguer vers la page Login
    const goToLogin = () => {
        setCurrentPage('Login');
    };

    // Fonction pour naviguer vers la page SignUp
    const goToSignUp = () => {
        setCurrentPage('SignUp');
    };

     
    
    // Rendu conditionnel en fonction de la page actuelle
    return (
        <div>
            {currentPage === 'Login' && <Login />}
            {currentPage === 'SignUp' && <SignUp />}
            {currentPage === null && (
                <div className="premier" >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/LEGO_logo.svg" alt="logo"></img>
                    <button onClick={goToLogin}>Login</button>
                    <button onClick={goToSignUp}>SignUp</button>
                </div>
            )}
        </div>
    );
}

export default App;
