const express = require('express');
const router = express.Router();
const { authenticateJWT, encryptMDP } = require('../middlewares/authentication');
const { User } = require('../database')
const { ObjectID } = require('mongodb')

// createUser: créer un nouvel utilisateur
router.post('/', async (req, res) => {
  const { surname, name, username, email, password, cover, photo, bio, valid, admin } = req.body;

  // On vérifie d'abord si l'utilisateur existe déjà (et on ne crée rien dans ce cas)
  const existingUser = await User.findOne({ username });
  if (existingUser) res.status(409).json({ message: "Ce nom d'utilisateur est déjà utilisé." })

  // On regarde si tous les champs sont complets
  if (!surname || !name || !username || !email || !password) {
    return res.status(400).json({ message: "Remplir les champs obligatoires." });
  }

  // On encrypte le mot de passe tapé par l'utilisateur et on crée un nouvel User avec les données à sauvegarder
  const hashedMDP = await encryptMDP(10, password);
  const newUser = { surname, name, username, email, hashedMDP, cover, photo, bio, valid, admin };

  try {
    const savedUser = await User.insertOne(newUser);
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
})


// deleteUser: permet de supprimer un utilisateur de la base de données users
router.delete('/delete/:identifier', getUser, async (req, res) => {
  try {
    await User.deleteOne(req.userData);
    res.json({ message: 'Utilisateur supprimé' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// getListUsers: permet d'afficher la liste des utilisateurs dans la base
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}).toArray();
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// updateUser: permet de modifier des informations sur un utilisateur
router.patch('/edit/:identifier', getUser, async (req, res) => {
  const { identifier } = req.params;
  const updateFields = {};

  if (req.body.surname != null) {
    updateFields.surname = req.body.surname
  }
  if (req.body.name != null) {
    updateFields.name = req.body.name
  }
  if (req.body.username != null) {
    updateFields.username = req.body.username
  }
  if (req.body.email != null) {
    updateFields.email = req.body.email
  }
  if (req.body.password != null) {
    updateFields.password = req.body.password
  }
  if (req.body.cover != null) {
    updateFields.cover = req.body.cover
  }
  if (req.body.photo != null) {
    updateFields.photo = req.body.photo
  }
  if (req.body.bio != null) {
    updateFields.bio = req.body.bio
  }
  if (req.body.valid != null) {
    updateFields.valid = req.body.valid
  }
  if (req.body.admin != null) {
    updateFields.admin = req.body.admin
  }
  try {
    const updatedUser = await User.updateOne({ username : identifier }, { $set: updateFields });    
    res.json(updatedUser);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
})

// 
router.get('/valid/no', async (req, res) => {
  try {
    const users = await User.find({ valid: false }).toArray();
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/valid/yes', async (req, res) => {
  try {
    const users = await User.find({ valid: true }).toArray();
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// getUser : obtenir les données d'un utilisateur avec son username
router.get('/:identifier', getUser, (req, res) => {
  res.json(req.userData);
});

// fonction pour récupérer les données d'un utilisateur
async function getUser(req, res, next) {
  try {
    const { identifier } = req.params; // Le paramètre d'URL contenant le nom d'utilisateur ou l'ID
    const userData = await getUserData(identifier);

    if (!userData) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    req.userData = userData;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// fonction pour extraire les données d'une personne (que ce soi à partir de son ID ou de son username)
async function getUserData(identifier) {
  try {
    userData = await User.findOne({ username: identifier });
    return userData;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des données de l\'utilisateur : ' + error.message);
  }
}


module.exports = router;