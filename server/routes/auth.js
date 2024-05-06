const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
const { authenticateJWT, encryptMDP } = require('../middlewares/authentication');

// Connexion à la base de données MongoDB
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

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

// signup
router.post('/signup', async (req, res) => {
  const { surname, name, username, email, password } = req.body;

  // On vérifie d'abord si l'utilisateur existe déjà (et on ne crée rien dans ce cas)
  const existingUser = await User.findOne({ username });
  if (existingUser) res.status(409).json({ message: "Ce nom d'utilisateur est déjà utilisé." })

  // On regarde si tous les champs sont complets
  if (!surname || !name || !username || !email || !password) {
    return res.status(400).json({ message: "Tous les champs doivent être remplis." });
  }

  // On encrypte le mot de passe tapé par l'utilisateur et on crée un nouvel User avec les données à sauvegarder
  const hashedMDP = await encryptMDP(10, password);
  const newUser = { surname, name, username, email, hashedMDP };

  try {
    await User.insertOne(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
})

// login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // On récupère d'abord l'utilisateur dans la base de donnée (renvoie 401 s'il n'existe pas)
    const user = await User.findOne({ username });
    if (!user) res.status(401).json({ message: "Utilisateur non existant" });

    // On compare la valeur hachée du password donné à la valeur hachée stockée dans la base
    const passwordMatch = bcrypt.compare(password, user.hashedMDP);
    if (!passwordMatch) return res.status(401).json({ message: 'Mot de passe erroné' });

    // On crée un token d'accès si tout s'est bien passé, on le stocke et on le renvoie
    const token = jwt.sign(req.body, process.env.ACCESS_TOKEN_KEY, { expiresIn: '1h' });
    req.session.token = token;
    res.status(200).json({ message: "Connexion réussie", token: token });
  
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Erreur dans le serveur " })
  }
})

module.exports = router;
