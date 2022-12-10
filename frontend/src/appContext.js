// le use context permet de stocker des informations primaires en haut de notre app
// ici, on stocke l'id du user pour lez traiter partout dans l'app
import { createContext } from "react";

export const UidContext = createContext();
