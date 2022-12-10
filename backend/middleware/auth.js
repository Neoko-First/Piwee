// // Pour verrifier les tokens
// const jwt = require("jsonwebtoken");

// // Appel de .env pour utiliser les variables d'environnement (npm install dotenv --save)
// require("dotenv").config(); 

// // middleware d'authentification :
// module.exports = (req, res, next) => {
//   // récupère le token du user (bearer)
//   const token = req.cookies.jwt;
//   // Si un jeton existe
//   if (token) {
//     // décode ce token à partir de la clé (voir .env)
//     jwt.verify(token, process.env.TOKEN_SECRET),
//       async (err, decodedToken) => {
//         if (err) { 
//           console.log(err);
//           res.send(200).json("Aucun token");
//         } else {
//           // récupère le userId
//           console.log(decodedToken.id);
//           // permission accordée
//           next();
//         }
//       };
//   } else {
//     console.log("Aucun token");
//   }
// };
