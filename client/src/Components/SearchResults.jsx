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
      console.log(query)
      try {
        axios.get('/posts/post/search', {
          params: query,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        .then( response => {
          console.log(response.data)
          setPosts(response.data); // Mise à jour de l'état des messages avec les données de la réponse
        })
        .catch(error => {
          console.error('Erreur', error);
        });
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts(); // Appel de la fonction d'asynchrone
  }, [posts]);

  console.log(posts.length)

  return (
    <div>
      {
        posts.slice().reverse().map(postx => (
          <Post key={postx._id} post={postx} />
        ))
      }
    </div>
  )
}
export default SearchResults;