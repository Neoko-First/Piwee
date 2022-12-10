// On a besoin d'Express
const express = require("express");

// On crée un router avec la méthode mise à disposition par Express
const router = express.Router();

// importe le middleware password-validator de verrification de force de mdp
const passVal = require("../middleware/password-validator");

// importe le controleur associé
const userCtrl = require("../controllers/user");

// importe le controleur associé
const uploadCtrl = require("../controllers/upload");

// importe multer, pour gérer les fichiers
const upload = require("../middleware/multer-config");

// appel au controller d'inscription
router.post("/signup", passVal, userCtrl.signup);

// appel au controller de connexion
router.post("/login", userCtrl.login);

// appel au controller de déconnexion
router.get("/logout", userCtrl.logout);
 
// appel au controller de recupération de tout les users
router.get("/", userCtrl.getAllUsers);

// appel au controller de recupération d'un user
router.get("/:id", userCtrl.getOneUser);

// appel au controller de modification d'un user
router.put("/:id", userCtrl.updateUser);

// appel au controller de désactivation d'un user
router.put("/disable/:id", userCtrl.disableUser);

// upload
router.post("/upload", upload.single("profil_image"), uploadCtrl.uploadProfil);

module.exports = router;
