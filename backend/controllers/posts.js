// Importe le fichier de config de la connexion à la bdd
const dbConfig = require("../config/db");
// import de la config de la BDD
const db = dbConfig.getDB();

// gestion des fichiers
const fs = require("fs");

// ajout d'un post
exports.createPost = (req, res, next) => {
  // si aucune image n'a été fournie par l'utilisateur, le post ne comporte pas d'image, on ajoute donc un champs null
  let pictureUrl = null;
  // sinon le nom du fichier
  if (req.file != null) {
    pictureUrl = req.file.filename;
  }
  // objet Post
  let body = { ...req.body, picture: pictureUrl, createdDate: new Date() };
  // ajout en BDD
  const reqCreatePostSql = "INSERT INTO posts SET ?";
  db.query(reqCreatePostSql, [body], (err, result) => {
    if (!result) {
      res.status(404).json({ err });
      throw err;
    } else {
      res.status(201).json(result);
    }
  });
};

// lecture de tout les posts (dans l'odre du plus récent au moins récent)
exports.getAllPosts = (req, res, next) => {
  const reqGetAllSql = "SELECT * FROM posts ORDER BY createdDate DESC";
  db.query(reqGetAllSql, (err, result) => {
    if (!result || result.length === 0) {
      res.status(200).json({ err, message: "Aucun post disponible" });
    } else {
      res.status(201).json(result);
    }
  });
};

// lecture d'un post en particulier
exports.getOnePost = (req, res, next) => {
  const reqGetOneSql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  db.query(reqGetOneSql, (err, result) => {
    if (!result || result.length === 0) {
      // transmet des messages d'erreur qui seront récupérés et affichés en front
      res.status(200).json({ err, message: "Post inexistant" });
    } else {
      res.status(201).json(result);
    }
  });
};

// modification d'un post existant
exports.updatePost = (req, res, next) => {
  const reqUpdateSql = `UPDATE posts SET title = "${req.body.title}", description = "${req.body.description}" WHERE id = ${req.params.id}`;
  db.query(reqUpdateSql, (err, result) => {
    if (!result) {
      res.status(200).json({ err });
    } else {
      res.status(201).json(result);
    }
  });
}; 

// suppression d'un post existant
exports.deletePost = (req, res, next) => {
  // récupère les caractéristiques du post
  const reqGetPostSql = `SELECT * FROM posts WHERE id = "${req.params.id}"`;
  db.query(reqGetPostSql, (err, result) => {
    if (!result) {
      res.status(200).json({ err });
    } else {
      // supprime la potentielle image d'illustration des fichiers
      if (result[0].picture != null) {
        fs.unlink(`../frontend/src/assets/posts/${result[0].picture}`, () => {
          if (err) console.log(err);
          // supprime le post de la bdd
          const reqDeletePostSql = `DELETE FROM posts WHERE id = "${req.params.id}"`;
          db.query(reqDeletePostSql, (err, result) => {
            if (!result) {
              res.status(200).json({ err });
            } else {
              // supprime les likes associé au post
              const reqDeleteLikesSql = `DELETE FROM likes WHERE postId = "${req.params.id}"`;
              db.query(reqDeleteLikesSql, (err, result) => {
                if (!result) {
                  res.status(200).json({ err });
                } else {
                  res.status(201).json(result);
                }
              });
            }
          });
        });
      }
    }
  });
};

// récupère le nombre de likes d'un post
exports.getPostLikes = (req, res, next) => {
  // Récupère la liste des likes associé au post en question
  const reqGetLikesSql = `SELECT * FROM likes WHERE postId = ${req.params.postId}`;
  db.query(reqGetLikesSql, (err, result) => {
    if (!result) {
      res.status(200).json({ err });
    } else {
      res.status(200).json(result);
    }
  });
};

// like ou unlike d'un post existant
exports.likeUnlikePost = (req, res, next) => {
  console.log(req.body.likerId);
  // Récupère la liste des likes associé au post en question
  const reqGetLikesSql = `SELECT * FROM likes WHERE postId = ${req.params.postId} AND userId = ${req.body.userId}`;
  db.query(reqGetLikesSql, (err, result) => {
    console.log(result);
    if (result.length != 0) {
      // Dans ce cas, le post a déjà été liké. On va donc entreprendre le unlike
      console.log("le post a déjà été liké");
      const reqUnlikeSql = `DELETE FROM likes WHERE postId = ${req.params.postId} AND userId = ${req.body.userId}`;
      db.query(reqUnlikeSql, (err, result) => {
        if (!result) {
          res.status(200).json({ err });
        } else {
          res.status(200).json(result);
        }
      });
    } else {
      // Dans ce cas, le post n'a pas déjà été liké. On va donc entreprendre le like
      console.log("le post n'a pas déjà été liké");
      const reqLikeSql = `INSERT INTO likes (postId, userId) VALUES (${req.params.postId}, ${req.body.userId})`;
      db.query(reqLikeSql, (err, result) => {
        if (!result) {
          res.status(200).json({ err });
        } else {
          res.status(200).json(result);
        }
      });
    }
  });
};
