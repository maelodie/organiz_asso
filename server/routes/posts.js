const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middlewares/authentication');
const { Post, Answer, User } = require('../database')
const { ObjectId } = require('mongodb')

// Recherche avec filtres dynamiques
router.post('/post/search', async (req, res) => {
  const { keyword, author, startDate, endDate } = req.body;
  const filters = {};

  if (keyword && keyword !== '') {
    filters.message = { $regex: keyword, $options: 'i' }; // Utiliser l'option 'i' pour insensible à la casse
  }
  if (author && author !== '') {
    filters.author = author;
  }

  if (startDate && endDate && startDate !== '' && endDate !== '') {
    filters.sendingDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  filters.privacy = false; // Assurez-vous que c'est un booléen et non une chaîne

  try {
    const posts = await Post.find(filters).toArray(); // Supprimer $and, car MongoDB interprétera cela comme une liste de conditions AND par défaut
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
  const post = {
    author: req.body.author, // username de l'utilisateur qui a créé le message
    message: req.body.message,
    privacy: req.body.privacy,
    answers: []
  };

  try {
    const newPost = await Post.insertOne(post);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

router.post('/comment', async (req, res) => {
  const comment = {
    author: req.body.author, // username de l'utilisateur qui a créé le message
    message: req.body.message,
    privacy: req.body.privacy
  };

  try {
    const newComment = await Answer.insertOne(comment);
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})



// création d'un nouveau post avec un utilisateur précis
router.post('/:username', async (req, res) => {
  try {
    const username = req.params.username;

    // Créer un nouveau message avec l'utilisateur trouvé
    const post = {
      author: username,
      message: req.body.message,
      privacy: req.body.privacy
    };

    const newPost = await Post.insertOne(post);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// modification d'un post existant
router.patch('/:id', getPost, async (req, res) => {
  const { id } = req.post._id;
  const updateFields = {}
  if (req.body.author != null) {
    updateFields.author = req.body.author
  }
  if (req.body.message != null) {
    updateFields.message = req.body.message
  }
  if (req.body.likes != null) {
    updateFields.likes = req.body.likes
  }
  if (req.body.sendingDate != null) {
    updateFields.sendingDate = req.body.sendingDate
  }
  if (req.body.answers != null) {
    updateFields.answers = req.body.answers
  }
  try {
    const updatedPost = await Post.updateOne({ _id: new ObjectId(id) }, { $set: updateFields });
    res.json(updatedPost);
  } catch (err) {
    res.status(400).send({ message: err.message })
  }
})

// affiche la liste de tous les posts publics 
router.get('/publicPosts', async (req, res) => {
  try {
    const posts = await Post.find({ privacy: false }).toArray();
    res.json(posts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// affiche la liste de tous les posts privés 
router.get('/privatePosts', async (req, res) => {
  try {
    const posts = await Post.find({ privacy: true }).toArray();
    res.json(posts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// recherche d'un seul post
router.get('/:id', getPost, (req, res) => {
  res.json(req.post)
})

// recherche d'un seul post
router.get('/comment/:id', getComment, (req, res) => {
  res.json(req.comment)
})

// affiche la liste de tous les posts de la base 
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({}).toArray();
    res.json(posts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.delete('/delete/:id', getPost, async (req, res) => {
  try {
    await Post.deleteOne(req.post);
    res.json({ message: 'Post supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// affiche la liste de tous les posts de la base d'un utilisateur
router.get('/post/:author', async (req, res) => {
  try {
    const author = req.params.author;
    
    const posts = await Post.find({ author: author, privacy: false }).toArray();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// fonction middleware pour trouver un message précis
async function getPost(req, res, next) {
  let post
  try {
    post = await Post.findOne({ _id: new ObjectId(req.params.id) });
    if (!post) return res.status(404).json({ message: 'Message non trouvé' })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  req.post = post
  next()
}

// fonction middleware pour trouver un commentaire précis
async function getComment(req, res, next) {
  let comment
  try {
    comment = await Answer.findOne({ _id: new ObjectId(req.params.id) });
    if (!comment) return res.status(404).json({ message: 'Commentaire non trouvé' })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  req.comment = comment
  next()
}


module.exports = router;
