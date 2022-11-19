// Importe le fichier de config de la connexion à la bdd
const dbConfig = require("../config/db");
const db = dbConfig.getDB();

// controller permettant de modifier la photo de profil d'un user en BDD
module.exports.uploadProfil = (req, res) => {
  let pictureUrl = req.file.filename;

  const reqUpdateProfilPictureSql = `UPDATE user SET picture = "${pictureUrl}" WHERE id = ${req.body.userId}`;
  db.query(reqUpdateProfilPictureSql, (err, result) => {
    if (!result) {
      res.status(404).json({ err });
      throw err;
    } else {
      res.status(201).json(result);
    }
  });
};
