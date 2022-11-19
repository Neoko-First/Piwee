import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../actions/comment.actions";
import { updatePost } from "../../actions/post.actions";
import { dateParser, sanitizor } from "../Utils";
import CardComments from "./CardComments";
import DeletePost from "./DeletePost";
import LikeButton from "./LikeButton";

const Card = ({ post }) => {
  // État du chargement des posts
  const [isLoading, setIsLoading] = useState(true);
  // faire apparaitre le champs de modification d'un post
  const [isUpdated, setIsUpdated] = useState(false);
  // affichage des commentaires
  const [showComments, setShowComments] = useState(false);
  // modification d'un post
  const [titleUpdate, setTitleUpdate] = useState(null);
  const [textUpdate, setTextUpdate] = useState(null);
  // récupération de tout les données de l'utilisateur courant
  const userData = useSelector((state) => state.userReducer);
  // récupération de tout les données de chaque utilisateur
  const usersData = useSelector((state) => state.usersReducer);
  // contient l'auteur du post
  const [author, setAuthor] = useState({});
  // État de la déscription du post (développée ou non)
  const [textIsOpen, setTextIsOpen] = useState(false);
  // déclencher les actions
  const dispatch = useDispatch();

  // appel de la modification d'un commentaire
  const updateItem = () => {
    // si le texte a bien été changé :
    if (titleUpdate || textUpdate) {
      // verrifie l'absence d'injection
      if (sanitizor(titleUpdate) && sanitizor(textUpdate)) {
        // Si un des éléments n'a pas été modifié, alors on transmet celui d'origine (aucun changement)
        if (titleUpdate == null) setTitleUpdate(post.title);
        if (textUpdate == null) setTextUpdate(post.description);
        dispatch(updatePost(post.id, titleUpdate, textUpdate));
        setIsUpdated(false);
      } else {
        alert("Nous n'acceptons pas ce genre de message...");
        setIsUpdated(false);
      }
    }
  };


  // lorsque les posts sont chargés, on stop le chargement pour éviter une boucle
  useEffect(() => {
    dispatch(getComments(post.id));
    // permet de connaître l'auteur du post
    if (usersData[0] != null) {
      // parcours la liste de tous les users et compare leurs id avec l'id du user qui a posté
      usersData
        .map((user) => {
          if (user.id == post.posterId) {
            // une fois la correspondance trouvée, le state author est set avec les caractéristiques de l'auteur
            setAuthor(user);
          }
        })
        .join("");
      setIsLoading(false);
    }
  }, [author, dispatch, post.id, post.posterId, usersData]);

  // génération d'une "carte" de post
  return (
    <>
      {/* ajout d'une clé primaire (id du post) */}
      <li className="post-card" key={post.id}>
        {/* affichage d'un loading spinner si les posts n'ont pas fini de charger */}
        {isLoading ? (
          <i className="fas fa-spinner fa-spin"></i>
        ) : (
          <>
            <section className="post-info-user">
              {/* image de profil */}
              <img
                src={require("../../assets/profil/" + author.picture)}
                alt="Profil"
              />
              <div className="name-and-date">
                <p>{author.first_name + " " + author.last_name}</p>
                <p className="date-post">{dateParser(post.createdDate)}</p>
              </div>
              {/* Si il s'agit de l'auteur du post */}
              {userData.id == post.posterId && userData.super != 1 && (
                <div className="action-on-post">
                  <i
                    onClick={function () {
                      document
                        .getElementById(post.id)
                        .classList.toggle("show-post-modal-more");
                    }}
                    className="fas fa-ellipsis-h"
                  ></i>
                </div>
              )}
              {/* Si il s'agit d'un admin */}
              {userData.super == 1 && userData.id != post.posterId && (
                <div className="action-on-post">
                  <i
                    onClick={function () {
                      document
                        .getElementById(post.id)
                        .classList.toggle("show-post-modal-more");
                    }}
                    className="fas fa-ellipsis-h"
                  ></i>
                </div>
              )}
              {/* si un admin post un commentaire, les deux cas sont valides */}
              {userData.id == post.posterId && userData.super == 1 && (
                <div className="action-on-post">
                  <i
                    onClick={function () {
                      document
                        .getElementById(post.id)
                        .classList.toggle("show-post-modal-more");
                    }}
                    className="fas fa-ellipsis-h"
                  ></i>
                </div>
              )}
            </section>
            {/* titre du post */}
            {!isUpdated ? (
              <h2>{post.title}</h2>
            ) : (
              <div className="update-post">
                <input
                  defaultValue={post.title}
                  onChange={(e) => setTitleUpdate(e.target.value)}
                />
              </div>
            )}
            {/* Contenu texte (description du post).Animation de "développement" du texte au clic */}
            {isUpdated === false && (
              <p
                className={textIsOpen ? "post-text-open" : "post-text"}
                onClick={() => setTextIsOpen(!textIsOpen)}
              >
                {post.description}
              </p>
            )}
            {/* si la modification est demandée */}
            {isUpdated === true && (
              <div className="update-post">
                <textarea
                  defaultValue={post.description}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <button onClick={updateItem}>Modifier</button>
              </div>
            )}
            {/* illustration (optionnelle) du post */}
            {post.picture && (
              <img
                className="post-img"
                src={require("../../assets/posts/" + post.picture)}
                alt={"Post de " + post.first_name}
              />
            )}
            <div className="post-footer">
              <LikeButton post={post} />
              <i
                className="far fa-comment-alt"
                onClick={() => setShowComments(!showComments)}
              ></i>
            </div>
            {showComments && <CardComments post={post} />}
            <div className="post-modal-more" id={post.id}>
              <ul>
                {/* Si il s'agit de l'auteur du post, alors lui seul peut modifier le post*/}
                {userData.id == post.posterId && (
                  <li onClick={() => setIsUpdated(!isUpdated)}>Modifier</li>
                )}
                <DeletePost id={post.id} />
              </ul>
            </div>
          </>
        )}
      </li>
    </>
  );
};

export default Card;
