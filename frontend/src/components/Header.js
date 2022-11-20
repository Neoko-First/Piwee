// importe le style
import "../styles/Header.scss";
// importe le logo
import logo from "../assets/logo.png"; 

import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <section className="logo">
        <NavLink exact="true" to="/">
          <img src={logo} alt="Groupomania" />
        </NavLink>
      </section>
      <section className="utils">
        <nav>
          <NavLink to="/" exact="true">
            <i className="fas fa-home"></i>
          </NavLink>
          <NavLink to="/publier" exact="true">
            <i className="fas fa-plus-square"></i>
          </NavLink>
          <NavLink to="/profil" exact="true">
            <i className="fas fa-user-circle"></i>
          </NavLink>
        </nav>
      </section>
    </header>
  );
}

export default Header;
