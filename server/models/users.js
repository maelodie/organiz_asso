const { MongoClient, ObjectId } = require('mongodb');

// Connexion à la base de données MongoDB
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Schema de l'utilisateur
const usersSchema = {
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
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  hashedMDP: {
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
    type: Boolean,
    default: false
  },
  admin: {
    type: Boolean,
    default: false
  } 
};

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
}

connectToDatabase();

const User = client.db().collection('users');

module.exports = User;
