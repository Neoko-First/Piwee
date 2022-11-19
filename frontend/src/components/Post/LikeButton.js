import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../appContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { likeUnLike } from "../../actions/post.actions";
import axios from "axios";

const LikeButton = ({ post }) => {
  // etat du like
  const [liked, setLiked] = useState(false);
  // likes concernant le post
  const [allLikes, setAllLikes] = useState(false);
  // nombre de likes du post
  const [likesCount, setLikesCount] = useState(false);
  // id du user courant
  const uid = useContext(UidContext);
  const dispatch = useDispatch();
  // récupération de tout les données de l'utilisateur courant
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `http://localhost:5000/api/posts/like-post/${post.id}`
      );
      const data = response.data;
      if (Array.isArray(data)) {
        // récupère tout les likes (ça peut servir)
        setAllLikes([...data]);
        // nombre total de likes
        setLikesCount(data.length);
        // verrifie si l'id du user courant est présent dans la liste retournée
        for (const like of data) {
          // console.log(like.userId + " = " + userData.id);
          if (like.userId == userData.id) {
            setLiked(true);
          }
        }
      } else throw new Error("Oops, didn't get an array.");
    }
    fetchData();
  }, [post.id, userData.id]);


  // fonction like/unlike
  const HandleLikeUnLike = () => {
    dispatch(likeUnLike(post.id, userData.id));
    setLiked(!liked);
    if (liked === true) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
  };

  return (
    <section className="post-likes">
      {/* si user non connecté */}
      {uid === null && (
        <Popup
          trigger={<i className="far fa-heart"></i>}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>Connectez-vous pour aimer un post !</div>
        </Popup>
      )}
      {/* si user connecté et a liké */}
      {uid !== null &&
        (liked ? (
          <i className="fas fa-heart" onClick={HandleLikeUnLike}></i>
        ) : (
          <i className="far fa-heart" onClick={HandleLikeUnLike}></i>
        ))}

      <span> {likesCount} </span>
    </section>
  );
};

export default LikeButton;
