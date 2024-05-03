require('dotenv').config() // pour récupérer les données de .env
const express = require('express')
const session = require('express-session')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cors = require('cors');
const User = require('../models/users')
const { authenticateJWT, encryptMDP } = require('../middlewares/authentication');

// cors
router.use(cors());

// signup
router.post('/signup', async (req, res) => {
  const { surname, name, username, email, password } = req.body;

  // On vérifie d'abord si l'utilisateur existe déjà (et on ne crée rien dans ce cas)
  const existingUser = await User.findOne({ username });
  if (existingUser) res.status(409).json({ message: "Ce nom d'utilisateur est déjà utilisé." })

  // On regarde si tous les champs sont complets
  if (!surname || !name || !username || !email || !password) {
    return res.status(400).json({ message: "Tous les champs doivent être remplis." });
  }

  // On encrypte le mot de passe tapé par l'utilisateur et on crée un nouvel User avec les données à sauvegarder
  const hashedMDP = await encryptMDP(10, password);
  const newUser = new User({ surname, name, username, email, hashedMDP });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
})

// login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // On récupère d'abord l'utilisateur dans la base de donnée (renvoie 401 s'il n'existe pas)
    const user = await User.findOne({ username });
    if (user == null) res.status(401).json({ message: "Utilisateur non existant" });

    // On compare la valeur hachée du password donné à la valeur hachée stockée dans la bse
    const passwordMatch = await bcrypt.compare(password, user.hashedMDP);
    if (!passwordMatch) return res.status(401).json({ message: 'Mot de passe erroné' });

    // On crée un token d'accès si tout s'est bien passé, on le stocke et on le renvoie
    const token = jwt.sign(req.body, process.env.ACCESS_TOKEN_KEY, { expiresIn: '1h' });
    req.session.token = token;
    res.status(200).json({ message: "Connexion réussie", token: token });
  
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erreur dans le serveur " })
  }
})

// obtenir user en fonction d'un token
router.get('/user', authenticateJWT, async (req, res) => {
  try {
    const username = req.user.username; // L'utilisateur est stocké dans req.user par le middleware authenticateJWT
    const user = await User.findOne({ username }); // Recherche de l'utilisateur dans la base de données en utilisant le username extrait du token
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json(user); // renvoi de l'utilisateur s'il est trouvé

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});
module.exports = router;