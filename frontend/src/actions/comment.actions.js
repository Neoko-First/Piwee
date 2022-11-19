import axios from "axios";

// comments
export const GET_COMMENTS = "GET_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";

// récupération des commentaires associés à un post
export const getComments = (postId) => {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `http://localhost:5000/api/comments/${postId}`,
    })
      .then((res) => {
        // si il n'existe aucun commentaire associé au post, alors on ne retourne rien 
        let comments = null;
        if (res.data != null) {
          comments = res.data;
        } else {
          comments = null;
        }
        dispatch({ type: GET_COMMENTS, payload: { comments } });
      })
      .catch((err) => console.log(err));
  };
};

// ajout d'un commentaire
export const addComment = (postId, commenterId, content) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `http://localhost:5000/api/comments/`,
      data: { postId, commenterId, content },
    })
      .then((res) => {
        dispatch({ type: ADD_COMMENT, payload: {} });
      })
      .catch((err) => console.log(err));
  };
};

// modification d'un commentaire
export const editComment = (commentId, content) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `http://localhost:5000/api/comments/${commentId}`,
      data: { content },
    })
      .then((res) => {
        dispatch({ type: EDIT_COMMENT, payload: {} });
      })
      .catch((err) => console.log(err));
  };
};
