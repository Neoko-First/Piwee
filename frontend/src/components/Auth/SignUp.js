import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function SignUp({ handleToggle, form }) {
  return (
    <Box
      component="form"
      className={!form ? "signup formFadeIn" : "signup formFadeOut"}
    >
      <div className="signupContainer">
        <div className="signupField">
          <TextField
            fullWidth
            id="outlined-basic"
            label="Pseudo"
            variant="standard"
            required
            focused
            autoFocus
            color="white"
          />
        </div>
        <div className="signupField">
          <TextField
            fullWidth
            id="outlined-basic"
            label="Email"
            variant="standard"
            required
            type="email"
            focused
            autoFocus
            color="white"
          />
        </div>
        <div className="signupField">
          <TextField
            fullWidth
            focused
            id="outlined-basic"
            label="Mot de passe"
            variant="standard"
            required
            type="password"
            color="white"
          />
        </div>
        <div className="signupField">
          <TextField
            fullWidth
            focused
            id="outlined-basic"
            label="Confirmer mot de passe"
            variant="standard"
            required
            type="password"
            color="white"
          />
        </div>
        <Button variant="contained">Inscription</Button>
        <Typography variant="p" component="p">
          Déjà membre ? <span onClick={handleToggle}>Connectez-vous</span>
        </Typography>
      </div>
    </Box>
  );
}
