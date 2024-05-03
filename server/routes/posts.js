const express = require('express')
const router = express.Router()
const Post = require('../models/posts')
const User = require('../models/users') 

// création d'un nouveau post
router.post('/', async (req, res) => {
  const post = new Post({
    author: req.body.author, // ID de l'utilisateur qui a créé le message
    message: req.body.message
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch(err) {
    res.status(400).json({ message : err.message });
  }
})

// création d'un nouveau post avec un utilisateur précis
router.post('/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username: username }); // Trouver l'utilisateur par nom d'utilisateur
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Créer un nouveau message avec l'utilisateur trouvé
    const post = new Post({
      author: user._id,
      message: req.body.message
    });

    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch(err) {
    res.status(400).json({ message : err.message });
  }
});

// modification d'un post existant
router.patch('/:id', getPost, async (req, res) => {
  if (req.body.message != null) {
    res.post.message = req.body.message
  }

  if (req.body.author != null) {
    return res.status(400).json({ message: "Changement de l'auteur interdit" });
  }

  try {
    const updatedPost = await res.post.save()
    res.json(updatedPost)
  } catch (err) {
    res.status(400).send( {message : err.message} )
  }
})

// recherche d'un seul post
router.get('/:id', getPost, (req, res) => {
  res.json(res.post)
})

// affiche la liste de tous les posts de la base 
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
    res.json(posts)
  } catch (err) {
    res.status(500).json({ message : err.message})
  }
})

// Suppression d'un post existant
router.delete('/delete/:id', getPost, async (req, res) => {
  try {
    await req.post.deleteOne();
    res.json({ message: 'Post supprimé avec succès' });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/post/:authorId', async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const posts = await getPostsByAuthorId(authorId);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// fonction middleware pour trouver un message précis
async function getPost(req, res, next) {
  let post
  try {
    post = await Post.findById(req.params.id)
    if(!post) return res.status(404).json({ message : 'Message non trouvé'})
  } catch (err) {
  return res.status(500).json({ message: err.message})
  }
  req.post = post
  next()
}

// Fonction pour récupérer la liste des messages postés par un utilisateur avec un ID donné
async function getPostsByAuthorId(authorId) {
  try {
    // Recherche tous les messages qui ont l'auteur avec l'ID donné
    const posts = await Post.find({ author: authorId });
    return posts;
  } catch (error) {
    throw new Error('Erreur lors de la récupération des messages de l\'utilisateur : ' + error.message);
  }
}


module.exports = router // renvoie le routeur à server.js
