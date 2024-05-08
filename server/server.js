require('dotenv').config(); // pour récupérer les données de .env
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const PORT = 4000; // port d'écoute pour les requêtes vers le serveur
const app = express(); // routeur
app.use(express.json()); // cette ligne permet de parser le corps des requêtes sous format json à chaque fois 

app.use(cors()); // pour éviter les erreurs lié au cors dans le navigateur

// redirection de toutes les requêtes comportant '/users' vers 'routes/users'
const usersRouter = require('./routes/users') 
app.use('/api/users', usersRouter) 

// redirection de toutes les requêtes comportant '/posts' vers 'routes/posts'
const postRouter = require('./routes/posts')
app.use('/api/posts', postRouter)

const authRouter = require('./routes/auth')
app.use('/api/auth', authRouter)

app.get('/api/test-session', (req, res) => {
  if (req.session.accessToken) {
      res.json({ accessToken: req.session.accessToken });
  } else {
      res.json({ message: 'Session non initialisée ou accessToken manquant' });
  }
});


// démarrage du serveur
app.listen(PORT, () => console.log('Le serveur est en marche'))