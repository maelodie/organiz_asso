const express = require('express')
const router = express.Router()
const User = require('../models/users') 

router.post('/', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    // Recherche de l'utilisateur dans la base de données
    const user = await User.findOne({ username: username, password: password });

    if(user) {
      res.status(200).json({ message : "Connexion réussie"});
    } else {
        // L'utilisateur n'existe pas ou les informations d'identification sont incorrectes
        res.status(401).json({ message: 'Informations d\'identification incorrectes' });
      }
    } catch(err) {
      // Erreur lors de la recherche de l'utilisateur dans la base de données
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
  
  module.exports = router;