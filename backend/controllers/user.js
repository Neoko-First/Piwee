const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// bibliothèque permettant ici de valider la strcuture du l'email
const validator = require("validator");

// Importe le fichier de config de la connexion à la bdd
const dbConfig = require("../config/db");
const { RandomColor } = require("../utils/RandomColor");

// Appel de .env pour utiliser les variables d'environnement (npm install dotenv --save)
require("dotenv").config();

// controlleur d'inscription d'un utilisateur
exports.signup = async (req, res, next) => {
  try {
    // verrifie la structure de l'email
    if (validator.isEmail(req.body.email)) {
      // mot de passe en clair
      const { password: password } = req.body;
      // paramètre de salage du mdp
      const salt = await bcrypt.genSalt(10);
      // hashage du mdp
      const encryptedPassword = await bcrypt.hash(password, salt);

      // objet user avec certains paramètre par défaut
      const user = {
        pseudo: req.body.pseudo,
        bio: null,
        email: req.body.email.trim(),
        password: encryptedPassword,
        active: 1,
        picture: null,
        color: RandomColor,
        super: 0,
      };

      // ajout du user en BDD
      const sql = "INSERT INTO user SET ?";
      const db = dbConfig.getDB();
      db.query(sql, [user], (err, result) => {
        console.log(err);
        if (!result) {
          // erreur renvoyées au front (email unique en BDD déjà présente)
          res.status(200).json({
            errors: {
              email: "Email déjà utilisé",
              password: "",
            },
          });
        } else {
          res.status(201).json({ message: "Inscription réussie !" });
        }
      });
    } else {
      // erreur renvoyées au front
      res.status(200).json({
        errors: {
          email: "Veuillez entrer un email valide.",
          password: "",
        },
      });
    }
  } catch (err) {
    res.status(200).json({
      // erreur renvoyées au front
      errors: {
        email: "",
        password: "Echec de l'inscription",
      },
    });
  }
};

// controlleur de connexion d'un utilisateur
exports.login = async (req, res, next) => {
  try {
    if (validator.isEmail(req.body.email)) {
      // récupère les infos envoyées par le back
      const { email, password: clearPassword } = req.body;
      // recherche l'adresse mail dans la BDD
      const reqSql = `SELECT * FROM user WHERE email = ?`;
      const db = dbConfig.getDB();
      db.query(reqSql, [email.trim()], async (err, result) => {
        if (err) {
          res.status(404).json({ err });
        }
        // Si la BDD répond positivement
        if (result[0]) {
          // si le compte est activé
          if (result[0].active == 1) {
            // récupère la réponse de la BDD
            const { id: id, password: hashedPassword } = result[0];

            // compare le mot de passe entré et le mot de passe présent dans la ligne (hashé)
            const match = await bcrypt.compare(clearPassword, hashedPassword);

            if (match) {
              // Age maximum du token/cookie
              const maxAge = 3 * 24 * 60 * 60 * 1000;
              // fonction pour crée un token
              const createToken = (id) => {
                return jwt.sign({ id }, process.env.TOKEN_SECRET, {
                  expiresIn: maxAge,
                });
              };

              // création du token
              const token = createToken(id);

              // mise en place du cookie
              res.cookie("jwt", token, {  
                // sécurité du cookie (consultable uniquement par notre serveur)
                httpOnly: true,
                maxAge: maxAge,
              });
              // renvoi l'id en console (à retirer en prod)
              res.status(200).json({ user: result[0].id });
            }
            // si le compte est désactivé
          } else {
            res.status(200).json({
              errors: {
                email: "Email inconnu",
                password: "", 
              },
            });
          }
          // si la connexion echoue :
        } else if (!result[0]) {
          // on renvoie un statut 200 MAIS contenant un objet error qui permet d'afficher les erreurs dans le front
          res.status(200).json({
            errors: {
              email: "Email inconnu",
              password: "",
            },
          });
        }
      });
    }
  } catch (err) {
    res.status(200).json({
      errors: {
        email: "",
        password: "Echec de la connexion",
      },
    });
  }
};

// controlleur de déconnexion d'un utilisateur
exports.logout = async (req, res, next) => {
  // crée un cookie vide qui se supprime instantanément
  res.cookie("jwt", "", { maxAge: 1 });
  // redirige le user à l'accueil
  res.redirect("/");
};

// controller de récupération de tout les users
exports.getAllUsers = async (req, res, next) => {
  // ne récupère que les infos utile pour le front, pour conserver la sécurité
  const reqGetAllUserSql =
    "SELECT id, first_name, last_name, active, picture, bio, super FROM user";
  const db = dbConfig.getDB();
  db.query(reqGetAllUserSql, async (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(201).json(result);
  });
};

// controller de récupération d'un user
exports.getOneUser = async (req, res, next) => {
  // ne récupère que les infos utile pour le front, pour conserver la sécurité
  const reqSql =
    "SELECT id, first_name, last_name, active, picture, bio, super FROM user WHERE id = ?";
  const db = dbConfig.getDB();
  db.query(reqSql, [req.params.id], async (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    // si aucun user ne correspond à l'id demandé
    if (result.length === 0) {
      res.status(404).json({ err: "Utilisateur inconnu." });
      throw err;
    }
    res.status(201).json(result[0]);
  });
};

// controller de modification d'un user
exports.updateUser = async (req, res, next) => {
  // Verrifie si l'utilisateur demandé existe
  const reqVerrifSql =
    "SELECT id, first_name, last_name, active, picture, bio, super FROM user WHERE id = ?";
  const db = dbConfig.getDB();
  db.query(reqVerrifSql, [req.params.id], async (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    // si aucun user ne correspond à l'id demandé
    if (result.length === 0) {
      res.status(404).json({ err: "Utilisateur inconnu." });
      throw err;
    }
  });

  // Si la modification de la bio est demandée
  if (req.body.newBio) {
    const newBio = req.body.newBio;
    const reqUpdateBioSql = `UPDATE user SET bio = "${newBio}" WHERE id = ${req.params.id};`;
    db.query(reqUpdateBioSql, async (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      if (result) {
        res.status(200).json(result);
      }
    });
  }

  // Si la modification du prenom est demandée
  if (req.body.newFirstName) {
    const { newFirstName } = req.body;
    const reqUpdateFirstNameSql = `UPDATE user SET first_name = "${newFirstName}" WHERE id = ${req.params.id};`;
    db.query(reqUpdateFirstNameSql, async (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      if (result) {
        res.status(200).json(result);
      }
    });
  }

  // Si la modification du nom est demandée
  if (req.body.newLastName) {
    const { newLastName } = req.body;
    const reqUpdateLastNameSql = `UPDATE user SET last_name = "${newLastName}" WHERE id = ${req.params.id};`;
    db.query(reqUpdateLastNameSql, async (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
      if (result) {
        res.status(200).json(result);
      }
    });
  }
};

// controller de désactivation d'un user
exports.disableUser = async (req, res, next) => {
  // on ne supprime pas le user de la BDD à des fins légales. On passe active à 0 ce qui fera qu'il n'apparaitra plus
  const reqDisableUserSql = `UPDATE user SET active = 0 WHERE id = ${req.params.id};`;
  const db = dbConfig.getDB();
  db.query(reqDisableUserSql, async (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    if (result) {
      res.status(200).json(result);
    }
  });
};
