import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import SearchBar from './SearchBar';
import Profil from './Profil';
import PrivateForum from './PrivateForum';
import ValidateMember from'./ValidateMember';
import TextBox from './TextBox';
import Post from'./Post';
import PostList from './PostList';


axios.defaults.baseURL = 'http://localhost:4000';

function Home({ username }) {
    
    const [currentPage, setCurrentPage] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Erreur lors du chargement des publications :', error);
            });
    }, []);

    // Fonctions pour naviguer vers différentes pages
    const goToProfil = () => setCurrentPage('Profil');
    const goToPrivateForum = () => setCurrentPage('PrivateForum');
    const goToValidateMember = () => setCurrentPage('ValidateMember');

    // Rendu conditionnel en fonction de la page actuelle
    return (
        <div className="container">
            {currentPage === 'Profil' && <Profil couverture="https://pbs.twimg.com/profile_banners/1292851218159525889/1603637145/1500x500" photo="https://apicms.thestar.com.my/uploads/images/2022/10/27/thumbs/large/1793279.jpeg" username="tayrianastan13" bio="the stars, they aligned" />}
            {currentPage === 'PrivateForum' && <PrivateForum />}
            {currentPage === 'ValidateMember' && <ValidateMember />}
            {currentPage === null && (
                <>
                    <div className="Panel">
                        <h2>Navigation</h2>
                        <button onClick={goToProfil}>Profil</button>
                        <button onClick={goToPrivateForum}>Forum Privé</button>
                        <button onClick={goToValidateMember}>Validation Membre</button>
                    </div>
                    <div id="Feed">
                        <h1>Feed</h1>
                        <TextBox username={username}/>
                        <PostList list={posts} />
                    </div>
                    <div className="Panel">
                        <h2>Recherche</h2>
                        <SearchBar />
                    </div>
                </>
            )}
        </div>
    );
}

export default Home;