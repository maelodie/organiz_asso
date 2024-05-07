import React, { useState, useEffect } from 'react';

import Post from './Post'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:4000'

function SearchResults() {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const query = location.state.query
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.post('/posts/post/search', query, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setPosts(response.data); // Mise à jour de l'état des messages avec les données de la réponse
      } catch (error) {
        console.error('Erreur', error);
      }
    };
    fetchPosts(); // Appel de la fonction d'asynchrone
  }, [query, token]); // Effectue l'appel seulement si query ou token change

  console.log(posts.length)
  console.log(posts);

  return (
    <div>
      <h1>Résultats </h1>
      {
        posts.slice().reverse().map(postx => (
          <Post key={postx._id} post={postx} del={false} />
        ))
      }
    </div>
  )
}
export default SearchResults;