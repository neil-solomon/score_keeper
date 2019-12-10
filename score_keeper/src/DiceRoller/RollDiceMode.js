import React from "react";
import "./DiceRollerStyles.css";
import { Button, Icon } from "antd";

class RollDiceMode extends React.Component {
  state = {
    numDice: 0,
    diceRolls: [],
    diceImageToggle: true // to make sure the key of the dice image changes
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
              src={this.props.diceImages[roll]}
              className={diceClass}
              alt="diceImage"
            ></img>
          ))}
        </div>
      </div>
    );
  }
}

export default RollDiceMode;
