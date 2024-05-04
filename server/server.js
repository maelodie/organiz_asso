require('dotenv').config(); // pour récupérer les données de .env
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');

const PORT = 4000;
const app = express();
app.use(express.json()); // cette ligne permet de parser le corps des requêtes sous format json à chaque fois 

app.use(cors()); 

app.use(session({
  secret: 'de5c379228aa9ea793eaf2a77e5abea4ce40dbb4fc999cc6177b6bdc61654acdedafbb59cc6f2b6ff9f27a49b7a79d1d92d6421823435f94982ee2d312a4d425',
  resave: false,
  saveUninitialized: true
}))

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true}) // connexion à la base de données (url dans .env)
const db = mongoose.connection // connecter la bdd 

// redirection de toutes les requêtes comportant '/users' vers 'routes/users'
const usersRouter = require('./routes/users') 
app.use('/users', usersRouter) 

// redirection de toutes les requêtes comportant '/posts' vers 'routes/posts'
const postRouter = require('./routes/posts')
app.use('/posts', postRouter)

const authRouter = require('./routes/auth')
app.use('/auth', authRouter)

app.get('/test-session', (req, res) => {
  if (req.session.accessToken) {
      res.json({ accessToken: req.session.accessToken });
  } else {
      res.json({ message: 'Session non initialisée ou accessToken manquant' });
  }
});


// démarrage du serveur
app.listen(PORT, () => console.log('Le serveur est en marche'))