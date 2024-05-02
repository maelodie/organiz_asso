import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import SearchBar from './SearchBar';
import Profil from './Profil';
import PrivateForum from './PrivateForum';
import ValidateMember from'./ValidateMember';
import { useState } from 'react';
import TextBox from './TextBox';
import Post from'./Post';
import PostList from './PostList';

axios.defaults.baseURL = 'http://localhost:4000'

function Home({username}) {
    const [currentPage, setCurrentPage] = useState(null);
    const [cover, setCover] = useState('');
    const [photo, setPhoto] = useState('');
    const [user, setUser] = useState('');
    const [bio, setBio] = useState('');
    const [posts, setPosts] = useState([]);

    // Fonction pour naviguer vers la page Connexion
    const goToProfil = () => {

        axios.get(`/users/${username}`, {params: {username: username}})
        .then(response =>{
            setCover(response.data.cover);
            setPhoto(response.data.photo);
            setUser(response.data.username);
            setBio(response.data.bio);
        })
        .catch(error =>{
            console.error('Erreur', error);
        })
        setCurrentPage('Profil');
    };

    const goToPrivateForum = () => {    
        setCurrentPage('PrivateForum');
    };

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
        <div>
            {currentPage === 'Profil' && <Profil cover={cover} photo={photo} username={user} bio={bio} />}
            {currentPage === 'PrivateForum' && <PrivateForum  />}
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