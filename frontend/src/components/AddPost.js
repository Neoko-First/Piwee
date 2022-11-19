// importe le style
import "../styles/AddPost.scss";
// importe le logo
import addImg from "../assets/add-img.png";
// importe useState
// import { useState } from "react";

function AddPost() {
  return (
    <div className="form-add-post-container">
      <form className="form-add-post" onSubmit={handleSubmit}>
        <h1>Exprimez-vous !</h1>
        <label htmlFor="title">
          Titre : <span>*</span>
        </label>
        <input type="text" name="title" id="title" />
        <label htmlFor="description">
          Déscription : <span>*</span>
        </label>
        <input type="text" name="description" id="description" />
        <label htmlFor="description">Illustration :</label>
        <section className="add-post-select-img">
          <input type="file" name="imgPost" id="imgPost" />
          <div className="add-post-select-canvas">
            <img src={addImg} alt="" />
          </div>
        </section>
        <button type="submit">Publier</button>
        <p className="add-post-notice">
          <span>* </span>
          <span>: Champs obligatoire</span>
        </p>
      </form>
    </div>
  );
}

function handleSubmit(e) {
  e.preventDefault();
  const newPost = [
    {
      title: e.target["title"].value,
      description: e.target["description"].value,
      imgPost: e.target["imgPost"].value,
    },
  ];
  console.log(newPost);
}

export default AddPost;
