// Importe le fichier de config de la connexion à la bdd
const dbConfig = require("../config/db");
const db = dbConfig.getDB();

// ajout d'un commentaire
exports.createComment = (req, res, next) => {
  // récupération du corps de la requête
  let body = {
    postId: req.body.postId,
    commenterId: req.body.commenterId,
    content: req.body.content,
    createdDate: new Date(),
  };
  // ajout de l'objet commentaire en BDD
  const reqCreateComment = "INSERT INTO comments SET ?";
  db.query(reqCreateComment, body, (err, result) => {
    if (!result) {
      res.status(404).json({ err });
      throw err;
    } else {
      res.status(201).json(result);
    }
  });
};

// récupération des commentaires
exports.getAllComments = (req, res, next) => {
  const reqGetAllComments = "SELECT * FROM comments";
  db.query(reqGetAllComments, (err, result) => {
    if (!result || result.length === 0) {
      res.status(404).json({ err });
      throw err;
    } else {
      res.status(201).json(result);
    }
  });
};

// récupération des commentaires associés à un post
exports.getPostComments = (req, res, next) => {
  const reqGetAllComments = "SELECT * FROM comments WHERE postId = ? ORDER BY createdDate DESC";
  db.query(reqGetAllComments, [req.params.postId], (err, result) => {
    if (!result || result.length === 0) {
      res.status(201).json(result);
    } else {
      res.status(201).json(result);
    }
  });
};

// modification d'un commentaire
exports.updatePostComment = (req, res, next) => {
  console.log(req.body.content);
  console.log(req.params.id);
  const reqUpdateCommentSql = `UPDATE comments SET content = "${req.body.content}" WHERE id = ${req.params.id}`;
  db.query(reqUpdateCommentSql, (err, result) => {
    if (!result) {
      res.status(400).json({ err });
    } else {
      res.status(201).json(result);
    }
  });
};

// suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
  const reqDeleteCommentSql = `DELETE FROM comments WHERE id = ${req.params.id}`;
  db.query(reqDeleteCommentSql, (err, result) => {
    if (!result) {
      res.status(200).json({ err });
    } else {
      res.status(201).json(result);
    }
  });
};

// suppression d'un commentaire
exports.deleteCommentOfPost = (req, res, next) => {
  const reqDeleteCommentOfPostSql = `DELETE FROM comments WHERE postId = ${req.params.postId}`;
  db.query(reqDeleteCommentOfPostSql, (err, result) => {
    if (!result) {
      res.status(200).json({ err });
    } else {
      res.status(201).json(result);
    }
  });
};
