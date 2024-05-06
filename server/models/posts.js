const { MongoClient, ObjectId } = require('mongodb');

// Connexion à la base de données MongoDB
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Schema de réponse
const answerSchema = {
  author: {
    type: ObjectId, // Utilisation de ObjectId pour les références
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
};

// Schema de post
const postsSchema = {
  author: {
    type: ObjectId, // Utilisation de ObjectId pour les références
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

const Post = client.db().collection('posts');
const Answer = client.db().collection('answers');

module.exports = { Post, Answer };
