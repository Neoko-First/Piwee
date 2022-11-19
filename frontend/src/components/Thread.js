import React, { useEffect, useState } from "react";
import { getPosts } from "../actions/post.actions";
// import { getComments } from "../actions/comment.actions";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Post/Card";

// importe le style
import "../styles/Thread.scss";
import AddPost from "./Post/AddPost";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  // compteur infinite scroll
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);
  // récupération de tout les commentaires
  // const comments = useSelector((state) => state.commentReducer);

  const loadMore = () => {
    // si la position du scroll courant est sup à la taille du contenu total :
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      // on recharge des post supplémentaires
      setLoadPost(true);
    }
  };

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts(count));
      setLoadPost(false);
      // incrémente le nombre de post supplémentaire à charger au prochain scroll
      setCount(count + 5);
    }
    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, dispatch, count]);

  return (
    <div className="thread-container">
      <ul>
        {posts[0] != null &&
          posts.map((post) => {
            return <Card post={post} key={post.id} />;
          })}
      </ul>
      <AddPost />
    </div>
  );
};

export default Thread;
