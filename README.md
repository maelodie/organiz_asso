# Organiz-asso

Organiz-asso est une plateforme en ligne destinée aux membres d'une association pour échanger des messages via des forums. Le site offre des fonctionnalités de discussion publique pour tous les membres ainsi qu'une section réservée aux administrateurs pour les échanges privés.

## Table des Matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies Utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Architecture du Système](#architecture-du-système)
- [Contribuer](#contribuer)
- [Licences](#licences)
- [Contact](#contact)

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
3. Installez less dépendances :
   ```bash
   npm install
