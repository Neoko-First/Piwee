const jwt = require("jsonwebtoken");

// tester si le user est connecté à chaque page du site
module.exports.checkUser = (req, res, next) => {
  // récupère le cookie
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      // si le décodage produit une erreur :
      if (err) {
        res.locals.user = null;
        // supprime le token
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        // Importe le fichier de config de la connexion à la bdd
        const dbConfig = require("../config/db");
        const db = dbConfig.getDB();
        const reqSql = `SELECT * FROM user WHERE id = ?`;
        db.query(reqSql, [decodedToken.id], (err, result) => {
          if (result) {
            let user = result;
            // passe les infos de l'utilisateur en transit
            res.locals.user = user;
            next();
          }
        });
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

// tester si le user est connecté à chaque page du site
module.exports.requireAuth = (req, res, next) => {
  // récupère le token stocker en cookie
  const token = req.cookies.jwt;
  // si le token est trouvé :
  if (token) {
    // verrifie la cohérence du token
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.send(200).json("no token");
      } else {
        console.log("id via token : " + decodedToken.id);
        next();
      }
    });
  } else {
    console.log("Aucun token existant");
  }
};
