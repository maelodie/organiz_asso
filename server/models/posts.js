const mongoose = require('mongoose')

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
  sendingDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  
})

module.exports = mongoose.model('Post', postsSchema) // pour intéragir avec le schema dans d'autres bases de données 