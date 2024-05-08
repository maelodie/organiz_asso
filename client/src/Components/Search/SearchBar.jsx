import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa'; // Importer l'icône de loupe
import './SearchBar.css'; // Style CSS pour la barre de recherche
axios.defaults.baseURL = 'http://localhost:4000/api';

function SearchBar() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [username, setAuthor] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const token = localStorage.getItem('token');

    const handleSearch = async () => {
        if (!username && !keyword && !startDate && !endDate) {
            return;
        }
        try {

            const query = JSON.stringify({
                keyword: keyword,
                author: username,
                startDate: startDate,
                endDate: endDate
            });
            navigate('/search', { state: { query: query } });
        } catch (error) {
            console.error('Erreur lors de la recherche de messages', error);
        }
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Rechercher par mot-clé"
                className="search-input"
            />
            <input
                type="text"
                value={username}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Nom d'utilisateur"
                className="search-input"
            />
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Date de début"
                className="search-input"
            />
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="Date de fin"
                className="search-input"
            />
            <button onClick={handleSearch} className="search-button">
                <FaSearch className="search-icon" />
                Rechercher
            </button>
        </div>
    );
}

export default SearchBar;
