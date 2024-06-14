# Organiz-asso

Organiz-asso est une plateforme en ligne destinée aux membres d'une association pour échanger des messages via des forums. Le site offre des fonctionnalités de discussion publique pour tous les membres ainsi qu'une section réservée aux administrateurs pour les échanges privés.

## Table des Matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies Utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Démarrage](#démarrage)
- [Utilisation](#utilisation)

## Fonctionnalités
### Utilisateurs

- **Inscription** : Les utilisateurs peuvent créer un compte.
- **Validation** : Un administrateur doit valider l'inscription pour donner le statut de membre.
- **Connexion** : Les membres peuvent se connecter pour accéder aux fonctionnalités du site.
- **Création de messages** : Les membres peuvent créer des messages, soit en réponse à des discussions existantes, soit en démarrant une nouvelle discussion.
- **Recherche** : Les membres peuvent rechercher des messages par mots-clés, date de publication, ou auteur.
- **Gestion des profils** : Les membres peuvent voir leur propre profil ainsi que ceux des autres utilisateurs.
- **Déconnexion** : Possibilité de se déconnecter du site.

### Administrateurs

- **Accès au forum fermé** : Réservé aux membres du conseil d'administration.
- **Gestion des utilisateurs** : Les administrateurs peuvent attribuer ou retirer le statut d'administrateur et valider les nouvelles inscriptions.

## Technologies Utilisées

- **Front-end** : HTML, CSS, JavaScript, React
- **Back-end** : Node.js, Express
- **Base de données** : MongoDB
- **Authentification** : JSON Web Tokens (JWT), bcrypt

## Prérequis

- **Node.js** (version 14 ou supérieure)
- **MongoDB** (version 4.4 ou supérieure)

## Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/organiz-asso.git
2. Accédez au répertoire du projet :
   ```bash
   cd organiz-asso
3. Installez les dépendances (côté client et côté serveur):
   ```bash
   npm install
4. Configurez les variables d'environnement. Créez un fichier .env à la racine du projet et ajoutez les configurations suivantes :
   ```bash
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   
## Démarrage:
- Démarrage du serveur:
```bash
npm start
```

- Démarrage du client:
```bash
npm run dev
```

- Ouvrez votre navigateur et allez à http://localhost:3000.

## Utilisation
**Inscription** : Créez un compte via la page d'inscription.
**Validation** : Attendez que votre compte soit validé par un administrateur.
**Connexion** : Connectez-vous avec vos identifiants pour accéder au forum.
**Participation** : Postez des messages, répondez aux discussions, et explorez les forums.
