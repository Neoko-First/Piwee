Pour lancer le frontend du projet : 
- cd /frontend
- npm start 

Pour lancer le backend du projet :
- cd /backend
- nodemon start 

Mot de passe suggérer pour créer un compte (la force du mot de passe étant assez stricte) :
Op3nC1assr00m

Structure de la BDD : 
CREATE TABLE posts(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    posterId VARCHAR(200),
    title VARCHAR(200), 
    description VARCHAR(500), 
    picture VARCHAR(200),  
    createdDate DATE 
); 

 CREATE TABLE comments(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    postId VARCHAR(200),
    commenterId VARCHAR(200), 
    content VARCHAR(500), 
    createdDate DATE
); 

CREATE TABLE likes(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    postId VARCHAR(200),
    userId VARCHAR(200)
); 

CREATE TABLE user(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(200),
    active BOOLEAN,
    picture VARCHAR(200),
    bio VARCHAR(500)
); 


