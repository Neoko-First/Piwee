import axios from "axios";

export const GET_USERS = "GET_USERS";

// récupération des infos de tous les users
export const getUsers = () => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:5000/api/auth/`)
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
