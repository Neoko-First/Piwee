// Importe le plugin "password-validator" qui permet d'appliquer plusieurs filtres/règles sur la création de mots de passe (npm install password-validator)
var passwordValidator = require("password-validator");

// Création du schéma de verrification
var schema = new passwordValidator();

// middleware de verrification de la force du mot de passe 
module.exports = (req, res, next) => {
  // création des règles du schéma
  schema
    .is()
    .min(8) // Minimum 8 caractères
    .is()
    .max(100) // Maximum 100 caractères
    .has()
    .uppercase() // Doit contenir des majuscules
    .has()
    .lowercase() // Doit contenir des minuscules
    .has()
    .digits(2) // Doit contenir au moins 2 chiffres
    .has()
    .not()
    .spaces() // Ne doit pas comporter d'espaces
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]); // Blacklist de certains mot de passe 

  // schema.validate(req.body.password) :
  // renvoi TRUE si le mot de passe resepcte toutes les règles 
  // renvoi FALSE sinon

  // Si TRUE
  if (schema.validate(req.body.password)) {
    // permission accordée
    next();
  } else {
    // erreur recup et affichées en front 
    res.status(200).json({
      errors: {
        email: "",
        password: "Mot de passe trop faible. Il doit contenir au minimum 8 caractères, des majuscules et des minuscules, au moins 2 chiffres et aucun espace.",
      },
    });
  } 
};
