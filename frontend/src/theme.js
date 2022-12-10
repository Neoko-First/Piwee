import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#2a0b5b",
      main: "#2a0b5b",
      dark: "#2a0b5b",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    secondary: {
      light: "#1c0443",
      main: "#1c0443",
      dark: "#1c0443",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    tercery: {
      light: "#b5179e",
      main: "#b5179e",
      dark: "#b5179e",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    white: {
      light: "#ffffff",
      main: "#ffffff",
      dark: "#ffffff",
    },
  },
});

export default theme;
