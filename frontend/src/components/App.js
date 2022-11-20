import { useEffect, useState } from "react";
import { UidContext } from "./appContext";
import Routes from "./Routes";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "../actions/user.actions";

function App() {
  // de base l'id du user est null, jusqu'à la connexion
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  // contrôle l'id du user à chaque chargement du projet
  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `http://localhost:5000/api/jwtid`,
        withCredentials: true,
      })
        .then((res) => setUid(res.data.id))
        .catch((err) => console.log(err));
    };
    fetchToken();

    if (uid) {
      dispatch(getUser(uid));
    }
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
}

export default App;
