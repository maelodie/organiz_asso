const express = require('express')
const router = express.Router()
const User = require('../models/users') // pour reprendre le schema

// createUser: créer un nouvel utilisateur
router.post('/', async (req, res) => {
  const user = new User({
    surname: req.body.surname,
    name: req.body.name,
    username: req.body.username, 
    email: req.body.email,
    password: req.body.password,
    cover: req.body.cover,
    photo: req.body.photo,
    bio: req.body.bio,
    valid: req.body.valid,
    admin: req.body.admin
  })

  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch(err) {
    res.status(400).json({ message : err.message })
  }
})


// deleteUser: permet de supprimer un utilisateur de la base de données users
router.delete('delete/:username', getUser, async (req, res) => {
  try {
    await res.user.deleteOne()
    res.json( { message: 'Utilisateur supprimé'})
  } catch(err) {
    res.status(500).json( { message: err.message })
  }
})

// getListUsers: permet d'afficher la liste des utilisateurs dans la base
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({ message : err.message})
  }
})

// updateUser: permet de modifier des informations sur un utilisateur
router.patch('/edit/:username', getUser, async (req, res) => {
  if (req.body.surname != null) {
    res.user.surname = req.body.surname
  }
  if (req.body.name != null) {
    res.user.name = req.body.name
  }
  if (req.body.username != null) {
    res.user.username = req.body.username
  }
  if (req.body.email != null) {
    res.user.email = req.body.email
  }
  if (req.body.password != null) {
    res.user.password = req.body.password
  }
  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch (err) {
    res.status(400).send( { message: err.message })
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
    // Vérifie si l'identifiant est un ObjectId valide (ID de MongoDB)
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);
    let userData;

    if (isObjectId) {
      userData = await User.findById(identifier); // on recherche par id si c'est un id et par username sinon
    } else { 
      userData = await User.findOne({ username: identifier });
    }

    return userData;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des données de l\'utilisateur : ' + error.message);
  }
}

module.exports = router // renvoie le routeur à server.js
