import React from "react";
import axios from "axios";
import cookie from "js-cookie";

const Logout = () => {
  const removeCookie = (key) => {
    if (window !== "undifined") {
      // supprime le cookie dans le front
      cookie.remove(key, { expires: 1 });
    }
  };

  const logout = async () => {
    // supprime sur le serveur le cookie
    await axios({
      method: "get",
      url: `http://localhost:5000/api/auth/logout`,
      withCredentials: true,
    })
      .then(() => removeCookie("jwt"))
      .catch((err) => console.log(err));

    window.location = "/";
  };

  return <button onClick={logout}>Déconnexion</button>;
};

export default Logout;
