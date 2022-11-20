// importe le style
import "../styles/Posts.scss";
// importe useState
import { useState } from "react";
// importe image
import userIcon from "../assets/random-user.png";

const postList = [
  {
    id: 1,
    userName: "Alexandre Artisien",
    title: "J'ai trouvé un job !",
    description:
      "Grâce à mon diplôme DWJ Openclassrooms, j'ai obtenu un CDI rapidement !",
    imgUrl: "test",
    likes: 5,
    dislikes: 10,
    liked: true,
    disliked: false,
  },
  {
    id: 2,
    userName: "Fabrice Vicon",
    title: "Je me sens bien dans mon bureau",
    description:
      "Le service des resources humaines à mis en place un plan d'amélioration des conditions de travail dans nos bureau.",
    likes: 12,
    dislikes: 2,
    liked: false,
    disliked: true,
  },
  {
    id: 3,
    userName: "Juliette Lemercié",
    title: "Réunion importante !",
    description:
      "Suite aux différents problème engendré par les pannes des machines à café, une réunion de la plus haute importance aura lieu le mercredi 5 avril.",
    likes: 232,
    dislikes: 102,
    liked: true,
    disliked: false,
  },
  {
    id: 4,
    userName: "Alexandre Artisien",
    title: "J'ai trouvé un job !",
    description:
      "Grâce à mon diplôme DWJ Openclassrooms, j'ai obtenu un CDI rapidement !",
    likes: 5,
    dislikes: 10,
    liked: true,
    disliked: false,
  },
  {
    id: 5,
    userName: "Fabrice Vicon",
    title: "Je me sens bien dans mon bureau",
    description:
      "Le service des resources humaines à mis en place un plan d'amélioration des conditions de travail dans nos bureau.",
    likes: 12,
    dislikes: 2,
    liked: false,
    disliked: true,
  },
  {
    id: 6,
    userName: "Juliette Lemercié",
    title: "Réunion importante !",
    description:
      "Suite aux différents problème engendré par les pannes des machines à café, une réunion de la plus haute importance aura lieu le mercredi 5 avril.",
    likes: 232,
    dislikes: 102,
    liked: true,
    disliked: false,
  },
];

function Posts() {
  const [isOpen, setIsOpen] = useState(false);

  return postList.map((post) => (
    <div className="post-card" key={`${post.id}`}>
      <section className="post-info-user">
        <img src={userIcon} alt={"Photo de profil de " + post.userName} />
        <p>{post.userName}</p>
        <i onClick={() => setIsOpen(!isOpen)} className="fas fa-ellipsis-h"></i>
      </section>
      <section className="post-content">
        <h2>{post.title}</h2>
        <p>{post.description}</p>
        {post.imgUrl && (
          <img
            className="post-img"
            src={userIcon}
            alt={"Post de " + post.userName}
          />
        )}
      </section>
      <section className="post-likes">
        {post.liked ? (
          // <i className="fas fa-thumbs-up" onClick={() => onLike(+1)}></i>
          <i className="fas fa-heart" onClick={() => onLike(+1)}></i>
        ) : (
          <i className="far fa-heart" onClick={() => onLike(+1)}></i>
        )}
        <span> {post.likes}</span>
      </section>
      {isOpen && (
        <div className="post-modal-more">
          <ul>
            <li>Modifier</li>
            <li>Supprimer</li>
            <li>Signaler</li>
          </ul>
        </div>
      )}
    </div>
  ));
}

function onLike(statLike) {
  console.log(statLike);
}

export default Posts;
