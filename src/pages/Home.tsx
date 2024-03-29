import React from "react";
import { RouteComponentProps } from "react-router";
import "../Style.css";

interface Props extends RouteComponentProps {}

const Home: React.FC<Props> = ({ history }) => {
  const clickHandler = () => {
    history.push("/user");
  };

  return (
    <div className="container home__container">
      <div className="Logo home__logo">
        <h1>Alko-</h1>
        <h1>Kalko</h1>
      </div>
      <h2>Selgita välja oma vere alkoholisisaldus</h2>
      <button onClick={clickHandler} className="home__button">
        Alusta
      </button>
    </div>
  );
};

export default Home;
