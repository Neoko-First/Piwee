// On a besoin d'Express
const express = require("express");

// On crée un router avec la méthode mise à disposition par Express
const router = express.Router();

// importe le controleur associé
const postsCtrl = require("../controllers/posts");

// importe multer, pour gérer les fichiers
const upload = require("../middleware/multer-config");

// Middleware de récupération des posts
router.get("/", postsCtrl.getAllPosts);

// Middleware de récupération d'un post
router.get("/:id", postsCtrl.getOnePost);

// Middleware de création d'un post
router.post("/", upload.single("post_image"), postsCtrl.createPost);

// Middleware de modification d'un post
router.put("/:id", postsCtrl.updatePost);

// Middleware de suppression d'un post
router.delete("/:id", postsCtrl.deletePost);

// Middleware de like d'un post
router.get("/like-post/:postId", postsCtrl.getPostLikes);
router.post("/like-post/:postId", postsCtrl.likeUnlikePost);

module.exports = router;
