import React, { useContext } from "react";
import Header from "../components/Header";
import Log from "../components/log/index";
import { UidContext } from "../components/appContext";

// importe le style
import "../styles/Profil.scss";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
  const uid = useContext(UidContext);

  return (
    <div>
      <Header />
      <div className="profil-page">
        {uid ? (
          <UpdateProfil />
        ) : (
          <div className="log-container">
            <Log signIn={false} signUp={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profil;
