import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

// importe le style
import "../../styles/AddPost.scss";
import { ButtonBase } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { UidContext } from "../appContext";
import { sanitizor } from "../Utils";
import { addPost, getPosts } from "../../actions/post.actions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "85%",
  bgcolor: "background.paper",
  outline: "0",
  boxShadow: 24,
  p: 2,
};

export default function AddPost() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);
  const [file, setFile] = useState();
  const [validForm, setFormValid] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  // feedBack user lorsque le formulaire est bien remplie
  const verifForm = () => {
    if (title && description) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const handlePicture = (e) => {
    // affichage front de l'image
    setPicture(URL.createObjectURL(e.target.files[0]));
    // enregistrtement du fichier (pour le back)
    setFile(e.target.files[0]);
  };

  // création de l'objet data
  const handlePost = async () => {
    if ((title && description) || (title && description && picture)) {
      if (sanitizor(title) && sanitizor(description)) {
        const data = new FormData();
        data.append("posterId", userData.id);
        data.append("title", title);
        data.append("description", description);
        if (file) {
          data.append("post_image", file);
        }

        // envoie la data vers la bdd
        await dispatch(addPost(data));
        // redemande une nouvelle version de la bdd
        dispatch(getPosts());

        setTitle("");
        setDescription("");
        setPicture("");
        setFile("");

        window.location = "/";
      } else {
        alert("Nous n'acceptons pas ce genre de message...");
        setTitle("");
        setDescription("");
        setPicture("");
        setFile("");
      }
    } else {
      alert("Veuillez entrer un message");
    }
  };

  return (
    <div>
      <div onClick={handleOpen} className="addPostCall" title="Publier">
        +
      </div>
      <Modal
        className="form-add-post-container"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {uid ? (
            <form className="form-add-post" onChange={verifForm}>
              <h1>Exprimez-vous !</h1>
              <label htmlFor="title">
                Titre : <span>*</span>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="description">
                Déscription : <span>*</span>
              </label>
              <input
                type="text"
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label htmlFor="description">Illustration :</label>
              <section className="add-post-select-img">
                <input
                  type="file"
                  name="post_image"
                  id="imgPost"
                  accept=".jpeg, .jpg, .png"
                  onChange={handlePicture}
                />
                <div className="add-post-select-canvas">
                  <img src={require("../../assets/add-img.png")} alt="ajout" />
                  {picture && <img src={picture} alt="ajout" />}
                </div>
              </section>
              <button
                type="submit"
                className={validForm ? "submit-on" : "submit-off"}
                onClick={handlePost}
              >
                Publier
              </button>
              <p className="add-post-notice">
                <span>* </span>
                <span>: Champs obligatoire</span>
              </p>
            </form>
          ) : (
            <ButtonBase href="/profil" exact="true">
              Se connecter
            </ButtonBase>
          )}
        </Box>
      </Modal>
    </div>
  );
}
