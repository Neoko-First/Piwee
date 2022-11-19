import { DELETE_POST, GET_POSTS, UPDATE_POST } from "../actions/post.actions";

// etat par défaut
const initialState = {};

export default function postReducer(state = initialState, action) {
  // si l'action a comme type :
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case UPDATE_POST:
      return state.map((post) => {
        if (post.id === action.payload.postId) {
          return {
            ...post,
            title: action.payload.title,
            description: action.payload.description,
          };
        } else {
          return post;
        }
      });
    case DELETE_POST:
      // renvoie tout les posts sauf celui supprimé
      return state.filter((post) => post.id !== action.payload.postId);
    // si aucune action, on renvoit simplement le state
    default:
      return state;
  }
}
