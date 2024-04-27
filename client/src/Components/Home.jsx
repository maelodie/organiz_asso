import React from 'react';
import SearchBar from './SearchBar';
import Profil from './Profil';
import PrivateForum from './PrivateForum';
import ValidateMember from'./ValidateMember';
import TextBox from './TextBox';
import Post from'./Post';
import PostList from './PostList';
import './Home.css';

function Home() {
    const [currentPage, setCurrentPage] = React.useState(null);

    // Fonction pour naviguer vers la page Connexion
    const goToProfil = () => {
        setCurrentPage('Profil');
    };

    const goToPrivateForum = () => {
        setCurrentPage('PrivateForum');
    };

    const goToValidateMember = () => {
        setCurrentPage('ValidateMember');
    };

    // Rendu conditionnel en fonction de la page actuelle
    return (
        <div>
            {currentPage === 'Profil' && <Profil couverture="https://pbs.twimg.com/profile_banners/1292851218159525889/1603637145/1500x500" photo="https://apicms.thestar.com.my/uploads/images/2022/10/27/thumbs/large/1793279.jpeg" username="tayrianastan13" bio="the stars, they aligned" />}
            {currentPage === 'PrivateForum' && <PrivateForum />}
            {currentPage === 'ValidateMember' && <ValidateMember />}
            {currentPage === null && (
                <div className="container">
                    <div className="Panel">
                        <h2>Navigation</h2>
                        <button onClick={goToProfil}>Profil</button>
                        <button onClick={goToPrivateForum}>Forum Privé</button>
                        <button onClick={goToValidateMember}>Validation Membre</button>
                    </div>
                    <div id="Feed">
                        <h1>Feed</h1>
                        <TextBox/>
                        <Post photo="https://apicms.thestar.com.my/uploads/images/2022/10/27/thumbs/large/1793279.jpeg" username="tayrianastan13" date="19-04-2024" text="eternal sunshine and TTPD area EATING" like="1989"/>
                        <Post/>
                        <PostList/>
                    </div>
                    <div className="Panel">
                        <h2>Recherche</h2>
                        <SearchBar/>
                    </div>
                </div>
            )}
        </div>
    );

}

export default Home;