import React from "react";
import "./DiceRoller.css";
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
    diceImagesAll: [Dice0, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6],
    diceImages: [],
    numDice: 1,
    numSides: 6,
    diceRolls: [0],
    diceImageToggle: true // to make sure the key of the dice image changes
  };

  iconStyle = {
    fontSize: "20px",
    margin: "3px",
    color: "rgb(0,150,255,.75)"
  };

  buttonStyle = {
    fontSize: "20px",
    height: "32px"
  };

  componentDidMount() {
    this.makeDiceImages(6);
  }

  makeDiceImages = newNumSides => {
    this.setState({
      diceImages: this.state.diceImagesAll.splice(this.state.newNumSides)
    });
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

  changeNumDice = change => {
    if (this.state.numDice + change < 1 || this.state.numDice + change > 100) {
      return;
    }
    var numDice = this.state.numDice;
    numDice += change;
    var diceRolls = [];
    for (let i = 0; i < numDice; ++i) {
      diceRolls.push(0);
    }
    this.setState({ numDice });
    this.setState({ diceRolls });
  };

  changeNumSides = change => {
    return;
    if (this.state.numSides + change < 2 || this.state.numSides + change > 20) {
      return;
    }
    var numSides = this.state.numSides;
    numSides += change;
    var diceRolls = [];
    for (let i = 0; i < this.state.numDice; ++i) {
      diceRolls.push(0);
    }
    this.setState({ numSides });
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
        diceClass = "DiceRoller_diceNumImage";
      } else {
        diceClass = "DiceRoller_diceZeroImage";
      }
    }

    var numDiceString = this.state.numDice.toString();
    var numSidesString = this.state.numSides.toString();
    if (numDiceString.length < 2) {
      numDiceString = "0" + numDiceString;
    }
    if (numSidesString.length < 2) {
      numSidesString = "0" + numSidesString;
    }

    return (
      <div className="mainContainer">
        <h1 className="pageHeader">Dice Roller</h1>
        <div className="DiceRoller_menuButtons">
          <div className="DiceRoller_menuItem">
            <Button
              type="primary"
              className="menuButton"
              onClick={this.rollDice}
            >
              Roll Dice
            </Button>
          </div>
          <div className="DiceRoller_menuItem">
            Number of Dice: {numDiceString}
            <Icon
              type="minus-circle"
              style={this.iconStyle}
              onClick={() => this.changeNumDice(-1)}
            ></Icon>
            <Icon
              type="plus-circle"
              style={this.iconStyle}
              onClick={() => this.changeNumDice(1)}
            ></Icon>
          </div>
          <div className="DiceRoller_menuItem">
            Number of Sides: {numSidesString}
            <Icon
              type="minus-circle"
              style={this.iconStyle}
              onClick={() => this.changeNumSides(-1)}
            ></Icon>
            <Icon
              type="plus-circle"
              style={this.iconStyle}
              onClick={() => this.changeNumSides(1)}
            ></Icon>
          </div>
        </div>
        <div className="DiceRoller_diceRolls">
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
