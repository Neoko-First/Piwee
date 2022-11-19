// On a besoin d'Express
const express = require("express");

// On crée un router avec la méthode mise à disposition par Express
const router = express.Router();

// importe le controleur associé
const commentCtrl = require("../controllers/comments");

// Middleware de création d'un commentaire
router.post("/", commentCtrl.createComment);

// Middleware de récupération des commentaires
router.get("/", commentCtrl.getAllComments);

// Middleware de récupération des commentaires associés à un post
router.get("/:postId", commentCtrl.getPostComments);

// Middleware de modification d'un commentaire
router.put("/:id", commentCtrl.updatePostComment);

// Middleware de suppression d'un commentaire
router.delete("/:id", commentCtrl.deleteComment);

// Middleware de suppression d'un commentaire
router.delete("/byPost/:postId", commentCtrl.deleteCommentOfPost);

module.exports = router;
