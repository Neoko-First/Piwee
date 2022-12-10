import React, { useState } from "react";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";

export default function Profile() {
  const [form, toggleForm] = useState(false);
  const [loginShowed, setLoginShowed] = useState(true);
  const [signUpShowed, setSignUpShowed] = useState(false);

  function handleToggle() {
    toggleForm(!form);
    setTimeout(() => {
      setLoginShowed(!loginShowed);
      setSignUpShowed(!signUpShowed);
    }, "1000");
  }

  return (
    <>
      {loginShowed && <Login handleToggle={handleToggle} form={form} />}
      {signUpShowed && <SignUp handleToggle={handleToggle} form={form} />}
    </>
  );
}
