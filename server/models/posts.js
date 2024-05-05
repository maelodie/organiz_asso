const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  privacy: {
    type: Boolean,
    required: true,
    default: false
  },
  likes: {
    type: Number,
    default: 0
  },
  sendingDate: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const postsSchema = new mongoose.Schema({ 
  author: {
    type: mongoose.Schema.Types.ObjectId, // Référence à l'ID de l'utilisateur
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  privacy: {
    type: Boolean,
    required: true,
    default: false
  },
  likes: {
    type: Number,
    default: 0
  },
  sendingDate: {
    type: Date,
    required: true,
    default: Date.now
  }, 
  answers: {
    type: [answerSchema],
    default: []
  }
})

postsSchema.index({ message: 'text' });
const Post = mongoose.model('Post', postsSchema); // Exportation du modèle de post
const Answer = mongoose.model('Answer', answerSchema); // Exportation du modèle de réponse

module.exports = { Post, Answer }; // Exportation des deux modèles