import axios from "axios";

// posts
export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POSTS";
export const LIKE_UNLIKE_POST = "LIKE_UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

// récupération des posts les plus récent (chargés 5 par 5 (numb))
export const getPosts = (numb) => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:5000/api/posts/`)
      .then((res) => {
        // ne remplie le tableau qu'avec le nombre de post souhaité pour le infinite scroll
        const array = res.data.slice(0, numb);
        dispatch({ type: GET_POSTS, payload: array });
      })
      .catch((err) => console.log(err));
  };
};

// ajout d'un post
export const addPost = (data) => {
  return (dispatch) => {
    return axios.post(`http://localhost:5000/api/posts/`, data);
  };
};

// like d'un post
export const likeUnLike = (postId, userId) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `http://localhost:5000/api/posts/like-post/${postId}`,
      data: { userId: userId },
    });
  };
};

export const updatePost = (postId, title, description) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `http://localhost:5000/api/posts/${postId}`,
      data: { title, description },
    })
      .then((res) => {
        dispatch({ type: UPDATE_POST, payload: { title, description, postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    // suppression du post du front
    dispatch({ type: DELETE_POST, payload: { postId } });
    // suppression du post de la bdd
    return axios({
      method: "delete",
      url: `http://localhost:5000/api/posts/${postId}`,
    })
      .then((res) => {
        // suppression des commentaires associés au post
        return axios({
          method: "delete",
          url: `http://localhost:5000/api/comments/byPost/${postId}`,
        });
      })
      .catch((err) => console.log(err));
  };
};
