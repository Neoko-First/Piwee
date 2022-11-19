import React from "react";
import { useDispatch } from "react-redux";
import cookie from "js-cookie";
import { desacUser } from "../../actions/user.actions";
import { UidContext } from "../appContext";
import axios from "axios";

const DesacUser = (props) => {
  const dispatch = useDispatch();

  const removeCookie = (key) => {
    if (window !== "undifined") {
      // supprime le cookie dans le front
      cookie.remove(key, { expires: 1 });
    }
  };

  const handleDesac = () => {
    // supprime sur le serveur le cookie
    axios({
      method: "get",
      url: `http://localhost:5000/api/auth/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));

    window.location = "/";

    dispatch(desacUser(props.userData.id));
    removeCookie("jwt");
    window.location = "/";
  };

  return (
    <button
      onClick={() => {
        if (
          window.confirm(
            "Voulez-vous vraiment supprimer votre compte ? Il ne sera plus consultable et vos posts et commentaires seront également supprimés"
          )
        ) {
          handleDesac();
        }
      }}
    >
      Supprimer mon compte
    </button>
  );
};

export default DesacUser;
