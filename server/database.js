require('dotenv').config(); // pour récupérer les données de .env
const { MongoClient } = require('mongodb');

const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri)
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
}

connectToDatabase();

const db = client.db(); 

const Post = db.collection('posts');
const Answer = db.collection('answers');
const User = db.collection('users');


module.exports = {Post, Answer, User}; // Référence à la base de donnée
