import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

export default function Login({ handleToggle, form }) {
  return (
    <Box
      component="form"
      className={form ? "login formFadeIn" : "login formFadeOut"}
    >
      <div className="loginContainer">
        <div className="loginField">
          <TextField
            fullWidth
            id="outlined-basic"
            label="Email"
            variant="standard"
            type="email"
            required
            focused
            autoFocus
            color="white"
          />
        </div>
        <div className="loginField">
          <TextField
            fullWidth
            focused
            id="outlined-basic"
            type="password"
            label="Mot de passe"
            variant="standard"
            required
            color="white"
          />
        </div>
        <Button variant="contained">Connexion</Button>
        <Typography variant="p" component="p">
          Nouveau ici ? <span onClick={handleToggle}>Inscrivez-vous</span>
        </Typography>
      </div>
    </Box>
  );
}
