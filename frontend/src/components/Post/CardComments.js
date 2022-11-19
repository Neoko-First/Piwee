import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { dateParser, sanitizor } from "../Utils";
import { addComment } from "../../actions/comment.actions";
// import { getPosts } from "../../actions/post.actions";
// import EditComment from "./EditComment";
import { UidContext } from "../appContext";
import EditComment from "./EditComment";

const CardComments = ({ post }) => {
  const [allComments, setAllComments] = useState([]);
  // stockage du commentaire
  const [text, setText] = useState("");
  // droit du user sur chaque commentaire
  const uid = useContext(UidContext);
  // récupération de tout les données de l'utilisateur courant
  const userData = useSelector((state) => state.userReducer);
  // récupération de tout les données de chaque utilisateur
  const usersData = useSelector((state) => state.usersReducer);
  // déclencher les actions
  const dispatch = useDispatch();
  // État des commentaires du post (développée ou non)
  const [commentIsOpen, setCommentIsOpen] = useState(false);

  useEffect(() => {
    // récupère les commentaires associés au post
    async function fetchData() {
      const response = await axios.get(
        `http://localhost:5000/api/comments/${post.id}`
      );
      const data = response.data;
      // insère les posts dans un state
      if (Array.isArray(data)) {
        setAllComments([...data]);
      } else throw new Error("Oops, didn't get an array.");
    }
    fetchData();
  }, [post.id]);

  // soumission d'un nouveau commentaire
  const handleComment = (e) => {
    // annule le comportement por défaut du formulaire (redirection)
    e.preventDefault();
    // si un nouveau text a été saisie :
    if (text) {
      // verrifie l'absence d'injection
      if (sanitizor(text)) {
        // ajoute un commentaire
        dispatch(addComment(post.id, userData.id, text))
          .then(() =>
            dispatch(async function () {
              const response = await axios.get(
                `http://localhost:5000/api/comments/${post.id}`
              );
              const data = response.data;
              if (Array.isArray(data)) {
                setAllComments([...data]);
              } else throw new Error("Oops, didn't get an array.");
            })
          )
          .then(() => setText(""));
      } else {
        alert("Nous n'acceptons pas ce genre de message...");
        setText("");
      }
    }
  };

  // appel de la suppresion d'un commentaire
  function handleDeleteComment(commentId) {
    // récupère les commentaires du post
    let arrayComments = allComments;
    // parcours les commentaires du post :
    for (let i = 0; i < arrayComments.length; i++) {
      // si le post supprimé correspond au post :
      if (arrayComments[i].id == commentId) {
        // on le surppime du tableau
        delete arrayComments[i];
      }
    }
    // simple fonction pour retirer l'élément "empty" laissé par la fonction delete
    arrayComments = arrayComments.filter(function (val) {
      if (val == "" || val == NaN || val == undefined || val == null) {
        return false;
      }
      return true;
    });
    // set le state des commentaires, ce qui actualise le front
    setAllComments(arrayComments);
    // effectue la requête en back
    axios.delete(`http://localhost:5000/api/comments/${commentId}`);
  }

  return (
    <div className="comments-container">
      {userData.id && (
        <div className="add-comment">
          <img
            src={require("../../assets/profil/" + userData.picture)}
            alt="profil"
          />
          <form action="" onSubmit={handleComment}>
            <textarea
              placeholder="Écrire un commentaire..."
              name="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <input type="submit" value="Publier" />
          </form>
        </div>
      )}
      <ul>
        {allComments[0] != null &&
          allComments[0] != [] &&
          allComments.map((comment) => {
            return (
              <li key={comment.id} className="comment-label">
                <div className="header-comment">
                  <img
                    src={
                      usersData[0] !== null &&
                      usersData
                        .map((user) => {
                          if (user.id == comment.commenterId) {
                            return require("../../assets/profil/" +
                              user.picture);
                          }
                        })
                        .join("")
                    }
                    alt="profil"
                  />
                  <div className="comment-info">
                    <p className="comment-author">
                      {usersData[0] !== null &&
                        usersData
                          .map((user) => {
                            if (user.id == comment.commenterId) {
                              return user.first_name + " " + user.last_name;
                            }
                          })
                          .join("")}{" "}
                    </p>
                    <p className="comment-date">
                      {dateParser(comment.createdDate)}
                    </p>
                  </div>
                </div>
                <div className="comment-content">
                  <p
                    className={commentIsOpen ? "comment-text-open" : ""}
                    onClick={() => setCommentIsOpen(!commentIsOpen)}
                  >
                    {comment.content}
                  </p>
                  {/* Droit de suppression si le user est l'auteur */}
                  <EditComment
                    comment={comment}
                    modifComments={(allComments) => setAllComments(allComments)}
                    allComments={allComments}
                    postId={post.id}
                  />
                  {uid == comment.commenterId && userData.super != 1 && (
                    <span
                      onClick={() => {
                        if (
                          window.confirm(
                            "Voulez-vous supprimer ce commentaire ?"
                          )
                        ) {
                          handleDeleteComment(comment.id);
                        }
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </span>
                  )}
                  {/* Si il s'agit d'un admin */}
                  {uid != comment.commenterId && userData.super == 1 && (
                    <span
                      onClick={() => {
                        if (
                          window.confirm(
                            "Voulez-vous supprimer ce commentaire ?"
                          )
                        ) {
                          handleDeleteComment(comment.id);
                        }
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </span>
                  )}
                  {/* si un admin post un commentaire, les deux cas sont valides */}
                  {uid == comment.commenterId && userData.super == 1 && (
                    <span
                      onClick={() => {
                        if (
                          window.confirm(
                            "Voulez-vous supprimer ce commentaire ?"
                          )
                        ) {
                          handleDeleteComment(comment.id);
                        }
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </span>
                  )}
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default CardComments;
