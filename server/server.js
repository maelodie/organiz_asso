require('dotenv').config() // pour récupérer les données de .env
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express() 
const PORT = 4000

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true}) // connexion à la base de données (url dans .env)
const db = mongoose.connection // connecter la bdd 
app.use(express.json()); // cette ligne permet de parser le corps des requêtes sous format json à chaque fois (Middleware)

app.use(cors());

// redirection de toutes les requêtes comportant '/users' vers 'routes/users'
const usersRouter = require('./routes/users') 
app.use('/users', usersRouter) 

// redirection de toutes les requêtes comportant '/posts' vers 'routes/posts'
const postRouter = require('./routes/posts')
app.use('/posts', postRouter)

// redirection de toutes les requêtes comportant '/login' vers 'routes/login'
const loginRouter = require('./routes/login')
app.use('/login', loginRouter)

// démarrage du serveur
app.listen(PORT, () => console.log('Le serveur est en marche'))