// Import de la bibliotheque Express
const express = require('express');

// Création d'une instance d'Express
const app = express();

// Import des routes de l'application
const mongoConcertRoutes = require('./routes/mongo-concert-routes');

// Import de body-parser
const bodyParser = require('body-parser');

// Import d'express-flash-messages
const flash = require('express-flash-messages');

// Import d'express-session
const session = require('express-session');

// Middleware pour la gestion des sessions
app.use(session({
    secret: 'message secret'
}));

// Middleware pour qu'express utilise les messages flash
app.use(flash());

// Configuration de l'application 
app.set('views', './templates');
app.set('view engine', 'pug');

// Mise à disposition des ressources publiques
app.use(express.static('./public'));

// Récupération des données postées
app.use(bodyParser.urlencoded({ extended: false }));

// Référencement des routes importées
app.use('/concert', mongoConcertRoutes);

// Lancement du serveur
app.listen(3000, () => {
    console.log('server started');
});




