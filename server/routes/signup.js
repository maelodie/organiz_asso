const express = require('express')
const router = express.Router()
const User = require('../models/users') 

// Serveur (Node.js)

router.post('/', async (req, res) => {
    const { surname, name, username, email, password } = req.body;

    // Vérification si l'utilisateur existe déjà
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(409).json({ message: "Ce nom d'utilisateur existe déjà." });
    }

    // Validation supplémentaire des données du formulaire (vous pouvez ajouter plus de vérifications si nécessaire)
    if (!surname || !name || !username || !email || !password) {
        return res.status(400).json({ message: "Tous les champs doivent être remplis." });
    }

    // Création d'un nouvel utilisateur
    const newUser = new User({ surname, name, username, email, password });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ message: "Une erreur s'est produite lors de l'enregistrement de l'utilisateur." });
    }
});

  
module.exports = router;