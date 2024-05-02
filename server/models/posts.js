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
  likes: {
    type: Number,
    default: 0
  },
  sendingDate: {
    type: Date,
    required: true,
    default: Date.now
  }, 
  aswers: {
    type: [answerSchema],
    default: []
  }
})

module.exports = mongoose.model('Post', postsSchema) // pour intéragir avec le schema dans d'autres bases de données 