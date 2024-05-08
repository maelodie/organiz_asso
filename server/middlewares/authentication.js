const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

// Middleware d'authentification JWT
function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1]; // Format attendu : 'Bearer <token>'

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Token JWT invalide' });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: 'Token JWT manquant' });
  }
}

// fonction d'encryptement du mot de passe avec un sel en argument
async function encryptMDP(saltRounds, mdp) {
  try {
    const salt = await bcrypt.genSalt(saltRounds); // on génère un sel (chaine utilisée pour l'encyptement)
    const hashedMDP = await bcrypt.hash(mdp, salt); // encryptement en question 
    return hashedMDP;
  } catch (error) {
    console.error('Erreur lors de l\'encryptage du mot de passe:', error);
    throw error; // Si une erreur se produit, renvoyer l'erreur à l'appelant
  }
}

module.exports = {authenticateJWT, encryptMDP };
