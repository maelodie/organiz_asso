const express = require('express')
const router = express.Router()
const { Post, Answer } = require('../models/posts'); // Importer à la fois Post et Answer depuis le fichier models/posts.js
const User = require('../models/users')
const { authenticateJWT } = require('../middlewares/authentication')

// Recherche avec filtres dynamiques
router.post('/post/search', async (req, res) => {

  const { keyword, author, startDate, endDate } = req.body;
  const filters = {};
  
  if (keyword && keyword!=='') {
    filters.$text = { $search: keyword };
  }
  if (author && author!=='') {
    filters.author = author;
  }

  if (startDate && endDate && startDate!=='' && endDate!=='') {
    filters.sendingDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }
  
  filters.privacy = "false";

  console.log(filters)
  try {
    const posts = await Post.find(filters);
    console.log(posts)
    if (posts.length === 0) {
      return res.status(404).json({ message: "Aucun message trouvé" });
    }
    
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// création d'un nouveau post
router.post('/', async (req, res) => {
  const post = new Post({
    author: req.body.author, // ID de l'utilisateur qui a créé le message
    message: req.body.message,
    privacy: req.body.privacy
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

router.post('/comment', async (req, res) => {
  const comment = new Answer({
    author: req.body.author, // ID de l'utilisateur qui a créé le message
    message: req.body.message,
    privacy: req.body.privacy
  });

  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
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
      message: req.body.message,
      privacy: req.body.privacy
    });

    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// modification d'un post existant
router.patch('/:id', getPost, async (req, res) => {
  if (req.body.author != null) {
    req.post.author = req.body.author
  }
  if (req.body.message != null) {
    req.post.message = req.body.message
  }
  if (req.body.likes != null) {
    req.post.likes = req.body.likes
  }
  if (req.body.sendingDate != null) {
    req.post.sendingDate = req.body.sendingDate
  }
  if (req.body.answers != null) {
    req.post.answers = req.body.answers
  }
  try {
    const updatedPost = await req.post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).send({ message: err.message })
  }
})

// affiche la liste de tous les posts publics 
router.get('/publicPosts', async (req, res) => {
  try {
    const posts = await Post.find({ privacy: false })
    res.json(posts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// affiche la liste de tous les posts privés 
router.get('/privatePosts', async (req, res) => {
  try {
    const posts = await Post.find({ privacy: true })
    res.json(posts)
  } catch (err) {
    res.status(500).json({ message: err.message })
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
    res.status(500).json({ message: err.message })
  }
})

router.delete('/delete/:id', getPost, async (req, res) => {
  try {
    await req.post.deleteOne();
    res.json({ message: 'Post supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// affiche la liste de tous les posts de la base d'un utilisateur
router.get('/post/:authorId', async (req, res) => {
  try {
    const authorId = req.params.authorId;
    const privacy = req.query.privacy === 'true'; // Récupérer le paramètre privacy de la requête et le convertir en boolean

    const posts = await Post.find({ author: authorId, privacy: privacy });
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
    if (!post) return res.status(404).json({ message: 'Message non trouvé' })
  } catch (err) {
    return res.status(500).json({ message: err.message })
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
