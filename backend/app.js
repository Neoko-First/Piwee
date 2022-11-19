// importe express
const express = require("express");
// helmet permet de parer un certains nombre de faille telles que les failles XSS
const helmet = require("helmet");
// lecture des corps des requêtes (en JSON)
const bodyParser = require("body-parser");
// décodage des cookies
const cookieParser = require("cookie-parser");

// middleware de verrificaiton des informations utilisateurs
const { checkUser, requireAuth } = require("./middleware/auth.middleware");

// importe les routes
const userRoutes = require("./routes/user");
const postsRoutes = require("./routes/posts");
const commentsRoutes = require("./routes/comments");

// Importe le fichier de config de la connexion à la bdd
const dbConfig = require("./config/db");

// Appel de .env pour utiliser les variables d'environnement (npm install dotenv --save)
require("dotenv").config();

// crée une application express
const app = express();

// utilisation de helmet sur toutes les routes
app.use(helmet());

// Middleware Header pour contourner les erreurs en débloquant certains systèmes de sécurité CORS, afin que tout le monde puisse faire des requetes depuis son navigateur
app.use((req, res, next) => {
  // on indique que les ressources peuvent être partagées depuis n'importe quelle origine
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  // on indique les entêtes qui seront utilisées après la pré-vérification cross-origin afin de donner l'autorisation
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  // on indique les méthodes autorisées pour les requêtes HTTP
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// affiche le corps de la requête
app.use(express.json());

// Prise en charge du JSON.
app.use(bodyParser.json());
// Prise en charge des formulaires HTML.
app.use(bodyParser.urlencoded({ extended: true }));
// lire les cookies
app.use(cookieParser());

// Verrifie si le user est connécté
app.get("*", checkUser); // appelé sur chaque page
app.get("/api/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user[0]);
});

// Utilise les midleware importés depuis notre fichier routes
app.use("/api/auth", userRoutes);
app.use("/api/posts", postsRoutes); 
app.use("/api/comments", commentsRoutes);

// exporte l'app pour l'utiliser/l'appeler dans les autres fichiers par la suite
module.exports = app;
