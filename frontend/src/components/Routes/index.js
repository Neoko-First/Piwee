import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddPost from "../../pages/AddPost";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";

// navigation : association d'url avec l'affichage front de pages différentes
const index = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/publier" element={<AddPost />} />
        <Route path="/profil" element={<Profil />} />
      </Routes>
    </Router>
  );
};

export default index;
