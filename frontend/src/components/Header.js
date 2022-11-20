// importe le style
import "../styles/index.scss";
// importe le logo
import logo from "../assets/logo.png";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Header() {
  // État du chargement des posts
  const [isLoading, setIsLoading] = useState(true);
  // récupération de tout les données de l'utilisateur courant
  const userData = useSelector((state) => state.userReducer);

  // lorsque les infos sont chargés, on stop le chargement pour éviter une boucle
  useEffect(() => {
    userData.picture != null && setIsLoading(false);
  }, [userData]);

  console.log(userData);

  return (
    <header>
      <section className="logo">
        <NavLink exact="true" to="/">
          {/* <img src={logo} alt="Groupomania" /> */}
          <h3>PIWEE</h3>
        </NavLink>
      </section>
      <section className="utils">
        <nav>
          {/* <NavLink to="/publier" exact="true">
            <i className="fas fa-plus-square"></i>
          </NavLink> */}
          <NavLink
            to="/profil"
            exact="true"
            className={"avatar"}
            title={userData.first_name + " " + userData.last_name}
          >
            {!isLoading ? (
              <img
                src={require(`../assets/profil/${userData.picture}`)}
                alt={userData.first_name}
              />
            ) : (
              <img
                src={require(`../assets/profil/random-user.png`)}
                alt={"test"}
              />
            )}
          </NavLink>
        </nav>
      </section>
    </header>
  );
}

export default Header;
