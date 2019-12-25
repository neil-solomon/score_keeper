import React from "react";
import "./Home.css";
import Article from "./Article.js";
import scoreboard from "./images/scoreboard.jpg";
import dice from "./images/dice.jpg";
import risk from "./images/risk.jpg";
import tictactoe from "./images/tictactoe_blue.png";
import money from "./images/money.jpg";

class Home extends React.Component {
  render() {
    return (
      <div className="mainContainer">
        <Article
          title="Scoreboard"
          link="./#/Scoreboard"
          image={scoreboard}
          imageAdjust="-40vw"
          description="An interactive scoreboard for 
          keeping score during your favorite games.
          Featuring colorful icons for each player,
          a live chart of scoring progression, and 
          notifications for who's winning and losing,
          the Game Night! Scoreboard turns score-keeping 
          from a tedious chore to a fun and exciting part of game night!"
        ></Article>
        <Article
          title="Dice Roller"
          link="./#/DiceRoller"
          image={dice}
          imageAdjust="-20vw"
          description="Cant find your dice for game night? Don't worry,
          the Game Night! Dice Roller has you covered with a uniform
          distribution of dice roll probabilities. Roll as many dice
          as you want as much as you want!"
        ></Article>
        <Article
          title="Risk Dice Roller"
          link="./#/RiskDiceRoller"
          image={risk}
          imageAdjust="-20vw"
          description="Are you four hours into your game of Risk but have
          spent two hours rolling dice? Save yourself from carpal tunnel
          and use the Game Night! Risk Dice Roller. Featuring win
          probabilites calculated by running 1,000's of simulations,
          a live chart of the state of the armies as the battle
          progresses, and a uniform distribution of dice roll probabilities."
        ></Article>
        <Article
          title="Tic-Tac-Grow"
          link="./#/TicTacGrow"
          image={tictactoe}
          imageAdjust="-20vw"
          description="Tired of boring, predictable, tic-tac-toe? Try out
          the Game Night! original game Tic-Tac-Grow which adds an exciting
          twist to the classic game by randomly adding a new cell
          to the tic-tac-toe board after a player makes a move. Choose
          how many X's or O's in a row it takes to win and how big you
          want the board to grow. The possibilities are nearly endless
          and the results are entirely unpredictable!"
        ></Article>
        <Article
          title="Virtual Bank"
          link="./#/VirtualBank"
          image={money}
          imageAdjust="-30vw"
          description="Did you spill beer all over your Monopoly money AGAIN?! Use
          the Game Night! Virtual Bank to keep track of all of your players money
          and never have to make change or do math again!"
        ></Article>
      </div>
    );
  }
}

export default Home;
