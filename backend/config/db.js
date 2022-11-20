// Appel de .env pour utiliser les variables d'environnement (npm install dotenv --save)
require("dotenv").config({ path: "./config/.env" });

// import de MySQL
const mysql = require("mysql");

// paramètres de connexion à la BDD
const db = mysql.createConnection({  
  host: "localhost",
  user: "root", 
  password: process.env.DB_USER_PATH,
  database: "piwee",
}); 

// export pour utiliser cette connexion 
module.exports.getDB = () => {
  return db;
};
