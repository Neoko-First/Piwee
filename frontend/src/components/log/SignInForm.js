import React, { useState } from "react";
import axios from "axios";
import { sanitizor } from "../Utils";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validForm, setFormValid] = useState(false);

  // feedBack user lorsque le formulaire est bien remplie
  const verifForm = () => {
    if (email && password) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email-error");
    const passwordError = document.querySelector(".password-error");

    // verrifie l'absence d'injection
    if (sanitizor(email) && sanitizor(password)) {
      axios({
        method: "post",
        url: `http://localhost:5000/api/auth/login`,
        withCredentials: true,
        data: {
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            window.location = "/";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Nous n'acceptons pas ce genre de message...");
    }
  };

  return (
    <form
      action=""
      onChange={verifForm}
      onSubmit={handleLogin}
      id="sign-in-form"
    >
      <label htmlFor="email">
        Email : <span>*</span>
      </label>
      <input
        type="email"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
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
      />
      <div className="password-error"></div>
      <input
        type="submit"
        className={validForm ? "submit-on" : "submit-off"}
        value="connexion"
      />
    </form>
  );
};

export default SignInForm;
