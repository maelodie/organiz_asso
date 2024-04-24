import React from 'react';
import Connexion from "./Connexion";
import Inscription from "./Inscription";

function App() {
  const [currentPage, setCurrentPage] = React.useState(null);

  // Fonction pour naviguer vers la page Connexion
  const goToConnexionPage = () => {
    setCurrentPage('connexion');
  };

  // Fonction pour naviguer vers la page Inscription
  const goToInscriptionPage = () => {
    setCurrentPage('inscription');
  };

  // Rendu conditionnel en fonction de la page actuelle
  return (
    <div>
      {currentPage === 'connexion' && <Connexion />}
      {currentPage === 'inscription' && <Inscription />}
      {currentPage === null && (
        <div>
          <button onClick={goToConnexionPage}>Page de Connexion</button>
          <button onClick={goToInscriptionPage}>Page d'Inscription</button>
        </div>
      )}
    </div>
  );
}

export default App;
