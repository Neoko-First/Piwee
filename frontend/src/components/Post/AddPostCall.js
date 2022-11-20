import React from 'react'
import { NavLink } from "react-router-dom";

export default function AddPostCall() {
  return (
    <div className="addPostBtn" title="publier">
      <NavLink exact="true" to="/publier">
        <p>+</p>
      </NavLink>
    </div>
  );
}
