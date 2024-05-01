const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({ 
  surname: {
    type: String,
    required: true
  }, 
  name: {
    type: String,
    required: true
  }, 
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  subscriptionDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  cover: {
    type: Buffer,
    default: ''
  },
  photo: {
    type: Buffer,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  valid: {
    type: String,
    required: true,
    default: false
  },
  admin: {
    type: String,
    required: true,
    default: false
  } 
})

module.exports = mongoose.model('User', usersSchema) // pour intéragir avec le schema dans d'autres bases de données 