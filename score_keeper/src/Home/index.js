import React from "react";
import "./Home.css";

class Home extends React.Component {
  render() {
    return (
      <div className="mainContainer">
        <div>
          <a href="./#/Scoreboard">
            <h2>Scoreboard</h2>
          </a>
          <a href="./#/DiceRoller">
            <h2>Dice Roller</h2>
          </a>
          <a href="./#/RiskDiceRoller">
            <h2>Risk Dice Roller</h2>
          </a>
          <a href="./#/TicTacGrow">
            <h2>Tic-Tac-Grow</h2>
          </a>
        </div>
      </div>
    );
  }
}

export default Home;
