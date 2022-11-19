// importe le module multer une fois installé (npm install --save multer)
const multer = require("multer");

// dictionnaire de type MIME
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// configuration, qui contient la logique nécessaire pour indiquer à multer où enregistrer les fichiers entrants
const storage = multer.diskStorage({
  // indique à multer d'enregistrer les fichiers dans le dossier images
  destination: (req, file, callback) => {
    if (file.fieldname === "post_image") { 
      callback(null, "../frontend/src/assets/posts");
    } else if (file.fieldname === "profil_image") {
      callback(null, "../frontend/src/assets/profil");
    }
  },
  // indique à multer d'utiliser le nom d'origine, de remplacer les espaces par des underscores et d'ajouter un timestamp Date.now() comme nom de fichier
  filename: (req, file, callback) => {
    // nom du fichier en remplaçant les potentiels espaces par des "_"
    const name = file.originalname.split(' ').join('_');
    // renseigne l'extension (mime type) du fichier 
    const extension = MIME_TYPES[file.mimetype];
    // définit le nom de fichier 
    callback(null, Date.now() + '.' + extension);
  },
});

const upload = multer({ storage: storage });

// exporte multer une fois configuré. Lui indique que nous génerons uniquement les téléchargements de fichiers image
module.exports = upload;
