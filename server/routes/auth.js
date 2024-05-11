const express = require('express');
const router = express.Router();
const { encryptMDP } = require('../middlewares/authentication');
const  { User } = require('../database'); // userschema
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// signup
router.post('/signup', async (req, res) => {
  const { surname, name, username, email, password, confirm} = req.body;

  // On vérifie d'abord si l'utilisateur existe déjà (et on ne crée rien dans ce cas)
  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(409).json({ message: "Ce nom d'utilisateur est déjà utilisé." })

  // On regarde si tous les champs sont complets
  if (!surname || !name || !username || !email || !password) {
    return res.status(400).json({ message: "Tous les champs doivent être remplis." });
  }

  // On encrypte le mot de passe tapé par l'utilisateur et on crée un nouvel User avec les données à sauvegarder
  const hashedMDP = await encryptMDP(10, password);
  // Date d'inscription
  const subscriptionDate = Date.now; 
  // Photo de couverture 
  const cover = "https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png"; // Valeur par défaut
  // Photo de profil
  const photo = "https://as2.ftcdn.net/v2/jpg/03/46/93/61/1000_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"; // Valeur par défaut 
  // Biographie
  const bio = "";
  // Statut admin
  const admin = false;
  // Si l'inscription de l'utilisateur au site a été validée
  const valid = false;
  const newUser = { surname, name, username, email, hashedMDP, subscriptionDate, cover, photo, bio, admin, valid};
  
  try {
    await User.insertOne(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
})

// login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // On récupère d'abord l'utilisateur dans la base de donnée (renvoie 401 s'il n'existe pas)
    const user = await User.findOne({ username : username });
    if (!user) return res.status(401).json({ message: "Utilisateur non existant" });
    if (!user.hashedMDP) return res.status(401).json({ message: "Erreur d'authentification" });

    // On compare la valeur hachée du password donné à la valeur hachée stockée dans la base
    const passwordMatch = bcrypt.compare(password, user.hashedMDP);
    if (!passwordMatch) res.status(401).json({ message: 'Mot de passe erroné' });

    // On crée un token d'accès si tout s'est bien passé, on le stocke et on le renvoie
    const token = jwt.sign(req.body, process.env.ACCESS_TOKEN_KEY, { expiresIn: '1h' });
    res.status(200).json({ message: "Connexion réussie", token: token });
  
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erreur dans le serveur " })
  }
})

module.exports = router;
