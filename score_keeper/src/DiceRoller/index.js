import React from "react";
import "./DiceRollerStyles.css";
import Dice0 from "./images/dice0.png";
import Dice1 from "./images/dice1.png";
import Dice2 from "./images/dice2.png";
import Dice3 from "./images/dice3.png";
import Dice4 from "./images/dice4.png";
import Dice5 from "./images/dice5.png";
import Dice6 from "./images/dice6.png";
import RollDiceMode from "./RollDiceMode";
import RiskMode from "./RiskMode";

class DiceRoller extends React.Component {
  state = {
    mode: [false, true], // roll dice, RISK
    diceImages: [Dice0, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6]
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

  changeMode = () => {
    var mode = document.getElementById("modeSelect").value;
    switch (mode) {
      case "Roll Dice":
        this.setState({ mode: [true, false] });
        break;
      case "RISK":
        this.setState({ mode: [false, true] });
        this.setState({ diceRolls: [] });
        break;
      default:
        break;
    }
  };

  render() {
    var modeView;
    if (this.state.mode[0]) {
      modeView = (
        <RollDiceMode diceImages={this.state.diceImages}></RollDiceMode>
      );
    } else if (this.state.mode[1]) {
      modeView = <RiskMode diceImages={this.state.diceImages}></RiskMode>;
    }

    return (
      <div>
        <div className="chooseMode">
          Mode:{" "}
          <select id="modeSelect" onChange={this.changeMode}>
            <option>Roll Dice</option>
            <option>RISK</option>
          </select>
        </div>
        {modeView}
      </div>
    );
  }
}

export default DiceRoller;
