import React from "react";
import Header from "../components/Header";
import Thread from "../components/Thread";

// importe le style
import "../styles/Home.scss";

const Home = () => {

  return (
    <div>
      <Header />
      <div className="post-list-container">
        <Thread />
      </div>
    </div>
  );
};

export default Home;
