import React from "react";
import "./DiceRollerStyles.css";
import { Icon, Button } from "antd";
import Dice0 from "./images/dice0.png";
import Dice1 from "./images/dice1.png";
import Dice2 from "./images/dice2.png";
import Dice3 from "./images/dice3.png";
import Dice4 from "./images/dice4.png";
import Dice5 from "./images/dice5.png";
import Dice6 from "./images/dice6.png";

class DiceRoller extends React.Component {
  state = {
    mode: [false, true], // roll dice, RISK
    diceImages: [Dice0, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6],
    numDice: 0,
    diceRolls: [],
    diceImageToggle: true // to make sure the key of the dice image changes
  };

  testRandomness = () => {
    var rollCount = [0, 0, 0, 0, 0, 0, 0];
    var randMult = 1000000; // uniformity of distribution is proportional to size of randMult
    var setSize = 1000000;
    for (let i = 0; i < setSize; ++i) {
      rollCount[(Math.round(Math.random() * randMult) % 6) + 1] += 1;
    }
    for (let i = 0; i < rollCount.length; ++i) {
      rollCount[i] = rollCount[i] / setSize;
    }
    console.log(rollCount);
  };

  changeDice = change => {
    var numDice = this.state.numDice;
    numDice += change;
    if (numDice < 0) {
      numDice = 0;
    }
    var diceRolls = [];
    for (let i = 0; i < numDice; ++i) {
      diceRolls.push(0);
    }
    this.setState({ numDice });
    this.setState({ diceRolls });
  };

  rollDice = () => {
    var diceRolls = [];
    for (let i = 0; i < this.state.numDice; ++i) {
      diceRolls.push((Math.round(Math.random() * 1000000) % 6) + 1);
    }
    this.setState({ diceRolls });
    this.setState({ diceImageToggle: !this.state.diceImageToggle });
  };

  render() {
    var diceClass;
    if (this.state.diceRolls.length !== 0) {
      if (this.state.diceRolls[0] !== 0) {
        diceClass = "diceNumImage";
      } else {
        diceClass = "diceZeroImage";
      }
    }
    return (
      <div>
        <div className="chooseDice">
          Number of Dice: {this.state.numDice}{" "}
          <Icon type="plus-circle" onClick={() => this.changeDice(1)}></Icon>
          <Icon
            type="minus-circle"
            onClick={() => this.changeDice(-1)}
          ></Icon>{" "}
          <Button type="primary" onClick={this.rollDice}>
            Roll Dice
          </Button>
        </div>
        <div className="diceRolls">
          {this.state.diceRolls.map((roll, index) => (
            <img
              key={"diceRoll" + index + this.state.diceImageToggle}
              src={this.state.diceImages[roll]}
              className={diceClass}
              alt="diceImage"
            ></img>
          ))}
        </div>
      </div>
    );
  }
}

export default DiceRoller;
