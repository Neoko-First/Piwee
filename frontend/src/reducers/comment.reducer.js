import {
  ADD_COMMENT,
  EDIT_COMMENT,
  GET_COMMENTS,
} from "../actions/comment.actions";

const initialState = {
  arrComments: [],
};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        arrComments: [...state.arrComments, action.payload],
      };
    case ADD_COMMENT:
      return action.payload;
    case EDIT_COMMENT:
      return action.payload;
    default:
      return state;
  }
}
