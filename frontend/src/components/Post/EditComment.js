import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editComment } from "../../actions/comment.actions";
import { UidContext } from "../appContext";
import { sanitizor } from "../Utils";

const EditComment = ({ comment, modifComments, allComments, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();
    console.log(allComments);
    if (text) {
      // verrifie l'absence d'injection
      if (sanitizor(text)) {
        // récupère les commentaires du post
        let arrayComments = allComments;
        // parcours les commentaires du post :
        for (let i = 0; i < arrayComments.length; i++) {
          // si le post supprimé correspond au post :
          if (arrayComments[i].id == comment.id) {
            arrayComments[i].content = text;
            modifComments(arrayComments);
            dispatch(editComment(comment.id, text));
          }
        }
        setText("");
        setEdit(false);
        document.location.reload();
      } else {
        alert("Nous n'acceptons pas ce genre de message...");
        setEdit(false);
      }
    }
  };

  useEffect(() => {
    const checkAuthor = () => {
      if (uid == comment.commenterId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.commenterId]);

  return (
    <>
      {isAuthor && !edit && (
        <span onClick={() => setEdit(!edit)}>
          <i className="fas fa-pen"></i>
        </span>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          {/* <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Éditer
          </label> */}
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.content}
          />
          <input type="submit" value="Modifier" />
        </form>
      )}
    </>
  );
};

export default EditComment;
