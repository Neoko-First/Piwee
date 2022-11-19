import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";
import { sanitizor } from "../Utils";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPassword_confirm] = useState("");
  const [validForm, setFormValid] = useState(false);

  // feedBack user lorsque le formulaire est bien remplie
  const verifForm = () => {
    if (
      first_name &&
      last_name &&
      email &&
      password &&
      password_confirm &&
      password == password_confirm &&
      document.getElementById("terms").checked
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  // déclencher à la soumission du formulaire
  const handleSignup = (e) => {
    // annule la redirection naturelle du form
    e.preventDefault();
    // pour par la suite afficher des potentiels messages d'erreurs
    const emailError = document.querySelector(".email-error");
    const passwordError = document.querySelector(".password-error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm-error"
    );
    // input des conditions générales
    const terms = document.getElementById("terms");
    const termsConfirmError = document.querySelector(".terms-confirm-error");

    // verrifie l'absence d'injection
    if (
      sanitizor(first_name) &&
      sanitizor(last_name) &&
      sanitizor(email) &&
      sanitizor(password) &&
      sanitizor(password_confirm)
    ) {
      if (password === password_confirm && terms.checked) {
        passwordConfirmError.innerHTML = "";
        termsConfirmError.innerHTML = "";
        // req vers l'API
        axios({
          method: "post",
          url: `http://localhost:5000/api/auth/signup`,
          withCredentials: true,
          data: {
            first_name,
            last_name,
            email,
            password,
          },
        })
          .then((res) => {
            if (res.data.errors) {
              emailError.innerHTML = res.data.errors.email;
              passwordError.innerHTML = res.data.errors.password;
            } else {
              setFormSubmit(true);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        if (password !== password_confirm) {
          passwordConfirmError.innerHTML =
            "Veuillez confirmer votre mot de passe.";
        }
        if (!terms.checked) {
          termsConfirmError.innerHTML =
            "Veuillez accepter les conditions générales.";
        }
      }
    } else {
      alert("Nous n'acceptons pas ce genre de message...");
    }
  };

  return (
    <>
      {/* afficher le form de connexion si l'inscription est effectuée */}
      {formSubmit ? (
        <>
          <SignInForm />
          <h4 className="success">
            Enregistrement réussi, veuillez vous connecter
          </h4>
        </>
      ) : (
        <form
          action=""
          onChange={verifForm}
          onSubmit={handleSignup}
          id="sign-up-form"
        >
          <label htmlFor="first_name">
            Prénom : <span>*</span>
          </label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            onChange={(e) => setFirst_name(e.target.value)}
            value={first_name}
            required
          />
          <div className="first-name-error"></div>

          <label htmlFor="last_name">
            Nom : <span>*</span>
          </label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            onChange={(e) => setLast_name(e.target.value)}
            value={last_name}
            required
          />
          <div className="last-name-error"></div>

          <label htmlFor="email">
            Email : <span>*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <div className="email-error"></div>

          <label htmlFor="password">
            Mot de passe : <span>*</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <div className="password-error"></div>

          <label htmlFor="password-confirm">
            Confirmer le mot de passe : <span>*</span>
          </label>
          <input
            type="password"
            name="password-confirm"
            id="password-confirm"
            onChange={(e) => setPassword_confirm(e.target.value)}
            value={password_confirm}
            required
          />
          <div className="password-confirm-error"></div>

          <div className="input-cond-gen">
            <input type="checkbox" id="terms" required />
            <span>
              J'accepte les <a href="index.html">conditions générales</a>
            </span>
          </div>
          <div className="terms-confirm-error"></div>

          <input
            type="submit"
            className={validForm ? "submit-on" : "submit-off"}
            value="Inscription"
          />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
