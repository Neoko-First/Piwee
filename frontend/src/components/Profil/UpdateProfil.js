import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateBio,
  updateFirstName,
  updateLastName,
} from "../../actions/user.actions";

import Logout from "../log/Logout";
import DesacUser from "../log/DesacUser";
import UploadImg from "./UploadImg";

const UpdateProfil = () => {
  // État du chargement de la photo de profil
  const [isLoading, setIsLoading] = useState(true);
  const [inputSubmit, ShowInputSubmit] = useState(false);
  // contenu du prénom potentiellement modifié
  const [firstName, setFirstName] = useState("");
  // contenu deu nom potentiellement modifié
  const [lastName, setLastName] = useState("");
  // contenu de la bio potentiellement modifiée
  const [bio, setBio] = useState("");
  // affichage des champs input de modificaiton
  const [updateFirstNameForm, setupdateFirstNameForm] = useState(false);
  const [updateLastNameForm, setLastNameForm] = useState(false);
  const [updateForm, setUpdateForm] = useState(false);
  // information concernant le user courant
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  // modification du prénom du user
  const handleUpdateFirstName = () => {
    dispatch(updateFirstName(userData.id, firstName));
    setupdateFirstNameForm(false);
  };

  // modification du nom du user
  const handleUpdateLastName = () => {
    dispatch(updateLastName(userData.id, lastName));
    setLastNameForm(false);
  };

  // modification de la bio du user
  const handleUpdateBio = () => {
    dispatch(updateBio(userData.id, bio));
    setUpdateForm(false);
  };

  // lorsque les posts sont chargés, on stop le chargement pour éviter une boucle
  useEffect(() => {
    userData.picture != null && setIsLoading(false);
  }, [userData]);

  return (
    <div className="primary-data-container">
      <h1>Votre profil :</h1>
      <div className="primary-data">
        <div className="left-part-profil">
          <div className="pic-update-box">
            {isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <img
                src={require("../../assets/profil/" + userData.picture)}
                alt={userData.picture}
                onClick={() => ShowInputSubmit(!inputSubmit)}
              />
            )}
            <div className="icon-update-img">
              <i className="fas fa-pen"></i>
            </div>
            {inputSubmit && <UploadImg />}
          </div>
        </div>

        <div className="right-part-profil">
          <>
            {!updateFirstNameForm ? (
              <div className="data-raw">
                <p>{userData.first_name}</p>
                <button onClick={() => setupdateFirstNameForm(true)}>
                  <i className="fas fa-pen"></i>
                </button>
              </div>
            ) : (
              <div className="data-update">
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  defaultValue={userData.first_name}
                />
                <button title="Valider" onClick={handleUpdateFirstName}>
                  <i className="fas fa-check-circle"></i>
                </button>
                <button
                  title="Annuler"
                  onClick={() => setupdateFirstNameForm(false)}
                >
                  <i className="fas fa-times-circle"></i>
                </button>
              </div>
            )}
          </>
          <>
            {!updateLastNameForm ? (
              <div className="data-raw">
                <p>{userData.last_name}</p>
                <button onClick={() => setLastNameForm(!updateLastNameForm)}>
                  <i className="fas fa-pen"></i>
                </button>
              </div>
            ) : (
              <div className="data-update">
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  defaultValue={userData.last_name}
                />
                <button title="Valider" onClick={handleUpdateLastName}>
                  <i className="fas fa-check-circle"></i>
                </button>
                <button title="Annuler" onClick={() => setLastNameForm(false)}>
                  <i className="fas fa-times-circle"></i>
                </button>
              </div>
            )}
          </>
          <>
            {!updateForm ? (
              <div className="data-raw">
                <p>{userData.bio}</p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  <i className="fas fa-pen"></i>
                </button>
              </div>
            ) : (
              <div className="data-update">
                <textarea
                  type="text"
                  defaultValue={userData.bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
                <button title="Valider" onClick={handleUpdateBio}>
                  <i className="fas fa-check-circle"></i>
                </button>
                <button title="Annuler" onClick={() => setUpdateForm(false)}>
                  <i className="fas fa-times-circle"></i>
                </button>
              </div>
            )}
          </>
          <div className="crtic-action">
            <Logout />
            <DesacUser userData={userData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
