import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions";

// suppression d'un post 
const DeletePost = (props) => {
  const dispatch = useDispatch();

  const deleteQuote = () => {
    dispatch(deletePost(props.id));
  };

  return (
    <li
      onClick={() => {
        if (window.confirm("Voulez-vous vraiment supprimer cet article ?")) {
          deleteQuote();
        }
      }}
    >
      Supprimer
    </li>
  );
};

export default DeletePost;
