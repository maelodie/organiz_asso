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

// getUserbyUsername : obtenir l'ID d'un utilisateur avec son username
router.get('/:username', getUser, async (req, res) => {
  res.json(res.user)
}) 

// fonction pour obtenir l'ID d'un utilisateur en fonction de son username
async function getUser(req, res, next) {
  let user
  console.log(req.params.username)
  try {
    const userDatabase = await User.findOne({ username: req.params.username });

    if (!userDatabase) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    } else {
      user = userDatabase;
      res.user = userDatabase;
      next(); 
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
} 


module.exports = router // renvoie le routeur à server.js