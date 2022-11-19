import {
  GET_USER,
  UPDATE_FIRST_NAME,
  UPDATE_LAST_NAME,
  UPDATE_BIO,
  UPLOAD_PICTURE,
} from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPLOAD_PICTURE:
      return { ...state, picture: action.payload };
    case UPDATE_FIRST_NAME:
      return {
        ...state,
        first_name: action.payload,
      };
    case UPDATE_LAST_NAME:
      return {
        ...state,
        last_name: action.payload,
      };
    case UPDATE_BIO:
      return {
        ...state,
        bio: action.payload,
      };
    default:
      return state;
  }
}
