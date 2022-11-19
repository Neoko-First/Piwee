import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const Log = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signUp);
  const [signInModal, setSignInModal] = useState(props.signIn);

  // toggle true/false des 2 modale
  const handleModals = (e) => {
    if (e.target.id === "register") { 
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignInModal(true);
      setSignUpModal(false);
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          {/* Appel au changement du usestate signInMdal et SignupModal (toggle true/false) avec handleModals() */}
          <li
            onClick={handleModals}
            id="register"
            className={signUpModal ? "active-log-btn" : null}
          >
            S'inscrire
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={signInModal ? "active-log-btn" : null}
          >
            Se connecter
          </li>
        </ul>
        {/* Et déclenche les conditions d'affichages */}
        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}
      </div>
    </div>
  );
};

export default Log;
