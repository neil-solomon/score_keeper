import React from "react";
import "./HomeStyles.css";

class Home extends React.Component {
  render() {
    return (
      <div className="mainMenu">
        <h1>GAME NIGHT!!!</h1>
        <a href="./#/Scoreboard">
          <h2>Scoreboard</h2>
        </a>
        <a href="./#/DiceRoller">
          <h2>Dice Roller</h2>
        </a>
        <a href="./#/RiskDiceRoller">
          <h2>Risk Dice Roller</h2>
        </a>
      </div>
    );
  }
}

export default Home;
