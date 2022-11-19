import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";

const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    e.preventDefault();
    // ajoute les infos requises pour enregistrer la nouvelle image
    const data = new FormData();
    data.append("name", userData.first_name);
    data.append("userId", userData.id);
    data.append("profil_image", file);

    dispatch(uploadPicture(data, userData.id));
  };

  return (
    <form action="" onSubmit={handlePicture} className="upload-picture">
      <input
        type="file"
        name="profil_image"
        id="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      ></input>
      <input type="submit" value="Modifier l'image de profil" />
    </form>
  );
};

export default UploadImg;
