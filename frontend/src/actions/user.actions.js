import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_FIRST_NAME = "UPDATE_FIRST_NAME";
export const UPDATE_LAST_NAME = "UPDATE_LAST_NAME";
export const UPDATE_BIO = "UPDATE_BIO";
export const DESAC_USER = "DESAC_USER";

// récupération des infos d'un user
export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:5000/api/auth/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

// actualisation de la bio d'un user
export const updateFirstName = (uid, newFirstName) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `http://localhost:5000/api/auth/${uid}`,
      data: { newFirstName },
    })
      .then((res) => {
        dispatch({ type: UPDATE_FIRST_NAME, payload: newFirstName });
      })
      .catch((err) => console.log(err));
  };
};

// actualisation de la bio d'un user
export const updateLastName = (uid, newLastName) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `http://localhost:5000/api/auth/${uid}`,
      data: { newLastName },
    })
      .then((res) => {
        dispatch({ type: UPDATE_LAST_NAME, payload: newLastName });
      })
      .catch((err) => console.log(err));
  };
};

// actualisation de la bio d'un user
export const updateBio = (uid, newBio) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `http://localhost:5000/api/auth/${uid}`,
      data: { newBio },
    })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: newBio });
      })
      .catch((err) => console.log(err));
  };
};

// ajout d'une photo de profil 
export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`http://localhost:5000/api/auth/upload`, data)
      .then((res) => {
        return axios.get(`http://localhost:5000/api/auth/${id}`).then((res) => {
          dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
        });
      })
      .catch((err) => console.log(err));
  };
};

// desactivation du compte d'un user
export const desacUser = (id) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `http://localhost:5000/api/auth/disable/${id}`,
    });
  };
};
