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
    type: String,
    default: "https://htmlcolorcodes.com/assets/images/colors/gray-color-solid-background-1920x1080.png"

  },
  photo: {
    type: String,
    default: "https://as2.ftcdn.net/v2/jpg/03/46/93/61/1000_F_346936114_RaxE6OQogebgAWTalE1myseY1Hbb5qPM.jpg"
  },
  bio: {
    type: String,
    default: ""
  },
  valid: {
    type: String,
    default: false
  },
  admin: {
    type: String,
    default: false
  }

  
})

module.exports = mongoose.model('User', usersSchema) // pour intéragir avec le schema dans d'autres bases de données 