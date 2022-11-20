import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../appContext";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route } from "react-router-dom";
import "../../styles/index.scss";
import { addPost, getPosts } from "../../actions/post.actions";
import { sanitizor } from "../Utils";

const NewPostForm = () => {
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
    <div className="form-add-post-container">
      {uid && (
        <form className="form-add-post" onChange={verifForm}>
          <label htmlFor="title">
            Titre : <span>*</span>
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="description">
            Description : <span>*</span>
          </label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="postUtils">
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
          </div>
        </form>
      )}
    </div>
  );
};

export default NewPostForm;
