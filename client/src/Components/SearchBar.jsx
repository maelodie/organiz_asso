import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:4000'

function SearchBar() {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState('');
    const [username, setAuthor] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const token = localStorage.getItem('token');
    let author;

    const handleSearch = async () => {
        try {
            if (username) {
                axios.get(`/users/${username}`, { headers: { Authorization: `Bearer ${token}` } })
                    .then(res => {
                        if (res.data) {
                            author = res.data._id
                        }
                    })
                    .catch(err => {
                        console.error("erreur lors de la recherche de l'ID de l'utilisateur", err);
                    });
            }

            const query = JSON.stringify({
                keyword: keyword,
                author: author,
                startDate : startDate,
                endDate: endDate

            })
            console.log(query)
            navigate('/search', { state: { query: query } })

        } catch (error) {
            console.error('Erreur lors de la recherche de messages', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Rechercher par mot-clé"
            />
            <input
                type="text"
                value={username}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="ID de l'auteur"
            />
            <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Date de début"
            />
            <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="Date de fin"
            />
            <button onClick={handleSearch}>Rechercher</button>
        </div>
    );
}

export default SearchBar;
