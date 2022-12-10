import { ThemeProvider } from "@mui/material";
import AppLayout from "./layouts/AppLayout";
import theme from "./theme";
import "./styles/index.scss";
import { useEffect, useState } from "react";
import { UidContext } from "./appContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";
import api_url from "./Api";

function App() {
  // de base l'id du user est null, jusqu'à la connexion
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  // contrôle l'id du user à chaque chargement du projet
  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${api_url}/api/jwtid`,
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
    <ThemeProvider theme={theme}>
      <UidContext.Provider value={uid}>
        <AppLayout />
      </UidContext.Provider>
    </ThemeProvider>
  );
}

export default App;
