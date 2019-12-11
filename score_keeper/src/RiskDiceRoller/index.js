import React from "react";
import "./RiskDiceRollerStyles.css";
import { Button, notification, Icon } from "antd";
import LineChart from "./LineChart.js";
import Dice0 from "./images/dice0.png";
import Dice1 from "./images/dice1.png";
import Dice2 from "./images/dice2.png";
import Dice3 from "./images/dice3.png";
import Dice4 from "./images/dice4.png";
import Dice5 from "./images/dice5.png";
import Dice6 from "./images/dice6.png";

class RiskDiceRoller extends React.Component {
  state = {
    diceImages: [Dice0, Dice1, Dice2, Dice3, Dice4, Dice5, Dice6],
    rollDiceInterval: "",
    numDiceAttacker: 0,
    numDiceDefender: 0,
    armiesAttacker: 0,
    armiesDefender: 0,
    diceRollsAttacker: [],
    diceRollsDefender: [],
    winProbsAttacker: " ",
    winProbsDefender: " ",
    avgArmiesAttacker: "",
    avgArmiesDefender: "",
    diceImageToggle: true, // to make sure the key of the dice image changes
    chartData: [
      { id: "Attacker", data: [] },
      { id: "Defender", data: [] }
    ],
    keepRollingSpeed: "Medium",
    viewProbabilities: false
  };

  notificationStyle = {
    height: "150px",
    width: "300px",
    backgroundColor: "rgb(255,255,0,.5)"
  };

  componentWillUnmount() {
    clearInterval(this.state.rollDiceInterval);
  }

  changeArmies = () => {
    clearInterval(this.state.rollDiceInterval);
    this.setState({ rollDiceInterval: "" });
    var armiesAttacker = parseInt(
      document.getElementById("startingArmiesAttacker").value
    );
    var armiesDefender = parseInt(
      document.getElementById("startingArmiesDefender").value
    );
    if (isNaN(armiesAttacker)) {
      armiesAttacker = 0;
    }
    if (isNaN(armiesDefender)) {
      armiesDefender = 0;
    }
    this.setState({
      armiesAttacker
    });
    this.setState({
      armiesDefender
    });

    this.updateDice(armiesAttacker, armiesDefender);
    this.updateProbabilities(armiesAttacker, armiesDefender);
    this.setState({
      chartData: [
        {
          id: "Attacker",
          data: [{ x: 0, y: parseInt(armiesAttacker) }]
        },
        {
          id: "Defender",
          data: [{ x: 0, y: parseInt(armiesDefender) }]
        }
      ]
    });
  };

  updateProbabilities = (armiesAttacker, armiesDefender) => {
    if (armiesAttacker === 0) {
      this.setState({ winProbsAttacker: "0.0%" });
      this.setState({ winProbsDefender: "100.0%" });
      this.setState({ avgArmiesAttacker: 0 });
      this.setState({ avgArmiesDefender: this.state.armiesDefender });
      return;
    }
    if (armiesDefender === 0) {
      this.setState({ winProbsAttacker: "100.0%" });
      this.setState({ winProbsDefender: "0.0%" });
      this.setState({ avgArmiesAttacker: this.state.armiesAttacker });
      this.setState({ avgArmiesDefender: 0 });
      return;
    }
    var key = armiesAttacker.toString() + "vs" + armiesDefender.toString();
    var probabilities = [];
    try {
      probabilities = require("./riskProbs/riskProbs_A1-100_D1-100_1000.json")[
        key
      ];
    } catch (error) {
      console.log("updateProbabilities:", error);
    }
    if (typeof probabilities !== "undefined") {
      if (probabilities.length > 0) {
        if (
          typeof probabilities[0] !== "undefined" &&
          typeof probabilities[1] !== "undefined"
        ) {
          this.setState({
            winProbsAttacker:
              (probabilities[0] * 100).toFixed(1).toString() + "%"
          });
          this.setState({
            winProbsDefender:
              (probabilities[1] * 100).toFixed(1).toString() + "%"
          });
        }
        if (
          typeof probabilities[2] !== "undefined" &&
          typeof probabilities[3] !== "undefined"
        ) {
          this.setState({
            avgArmiesAttacker: probabilities[2].toFixed(1).toString()
          });
          this.setState({
            avgArmiesDefender: probabilities[3].toFixed(1).toString()
          });
        }
      }
    }
  };

  updateDice = (armiesAttacker, armiesDefender) => {
    var i = 0;
    var diceRollsAttacker = [],
      diceRollsDefender = [];
    while (i < 3 && i < armiesAttacker) {
      diceRollsAttacker.push(0);
      ++i;
    }
    i = 0;
    while (i < 2 && i < armiesDefender) {
      diceRollsDefender.push(0);
      ++i;
    }
    this.setState({ diceRollsAttacker });
    this.setState({ numDiceAttacker: diceRollsAttacker.length });
    this.setState({ diceRollsDefender });
    this.setState({ numDiceDefender: diceRollsDefender.length });
  };

  rollDiceOnce = () => {
    var diceRollsAttacker = [],
      diceRollsDefender = [];
    if (this.state.numDiceAttacker === 0 || this.state.numDiceDefender === 0) {
      return;
    }
    for (let i = 0; i < this.state.numDiceAttacker; ++i) {
      diceRollsAttacker.push((Math.round(Math.random() * 1000000) % 6) + 1);
    }
    for (let i = 0; i < this.state.numDiceDefender; ++i) {
      diceRollsDefender.push((Math.round(Math.random() * 1000000) % 6) + 1);
    }

    this.setState({ diceRollsAttacker: diceRollsAttacker });
    this.setState({ diceRollsDefender: diceRollsDefender });
    this.setState({ diceImageToggle: !this.state.diceImageToggle });

    var diceRollsAttackerSorted = this.sortNumArrayAsc(diceRollsAttacker),
      diceRollsDefenderSorted = this.sortNumArrayAsc(diceRollsDefender);
    var attackersKilled = 0,
      defendersKilled = 0;
    if (diceRollsAttackerSorted[0] > diceRollsDefenderSorted[0]) {
      ++defendersKilled;
    } else {
      ++attackersKilled;
    }
    if (diceRollsAttackerSorted.length > 1) {
      if (diceRollsAttackerSorted[1] > diceRollsDefenderSorted[1]) {
        ++defendersKilled;
      } else {
        ++attackersKilled;
      }
    }
    var newArmiesAttacker = this.state.armiesAttacker - attackersKilled;
    var newArmiesDefender = this.state.armiesDefender - defendersKilled;
    if (newArmiesAttacker < 0) {
      newArmiesAttacker = 0;
    }
    if (newArmiesDefender < 0) {
      newArmiesDefender = 0;
    }

    this.setState({ armiesAttacker: newArmiesAttacker });
    this.setState({ armiesDefender: newArmiesDefender });
    if (newArmiesAttacker < 3) {
      this.setState({ numDiceAttacker: newArmiesAttacker });
    }
    if (newArmiesDefender < 2) {
      this.setState({ numDiceDefender: newArmiesDefender });
    }

    this.updateProbabilities(newArmiesAttacker, newArmiesDefender);

    if (newArmiesAttacker === 0) {
      notification["success"]({
        message: "Defender wins!",
        description: "",
        placement: "bottomLeft",
        duration: 10,
        icon: <Icon type="alert" style={{ color: "rgb(0,0,255,.75)" }} />,
        style: this.notificationStyle
      });
      clearInterval(this.state.rollDiceInterval);
      this.setState({ rollDiceInterval: "" });
    }
    if (newArmiesDefender === 0) {
      notification["success"]({
        message: "Attacker wins!",
        description: "",
        placement: "bottomLeft",
        duration: 10,
        icon: <Icon type="alert" style={{ color: "rgb(0,0,255,.75)" }} />,
        style: this.notificationStyle
      });
      clearInterval(this.state.rollDiceInterval);
      this.setState({ rollDiceInterval: "" });
    }

    var chartData = [...this.state.chartData];
    chartData[0].data.push({
      x: chartData[0].data.length,
      y: newArmiesAttacker
    });
    chartData[1].data.push({
      x: chartData[1].data.length,
      y: newArmiesDefender
    });
    this.setState({ chartData });
  };

  sortNumArrayAsc = array => {
    // sort ascending
    var sortedArray = [];
    for (let i = 0; i < array.length; ++i) {
      sortedArray.push(array[i]);
    }
    for (let i = 0; i < sortedArray.length; ++i) {
      for (let j = i + 1; j < sortedArray.length; ++j) {
        if (sortedArray[i] < sortedArray[j]) {
          sortedArray[i] = sortedArray[i] ^ sortedArray[j];
          sortedArray[j] = sortedArray[i] ^ sortedArray[j];
          sortedArray[i] = sortedArray[i] ^ sortedArray[j];
        }
      }
    }
    return sortedArray;
  };

  rollDice = () => {
    if (
      this.state.armiesAttacker > 0 &&
      this.state.armiesDefender > 0 &&
      this.state.rollDiceInterval === ""
    ) {
      var intervalTime;
      switch (this.state.keepRollingSpeed) {
        case "Fast":
          intervalTime = 500;
          break;
        case "Medium":
          intervalTime = 1000;
          break;
        case "Slow":
          intervalTime = 2000;
          break;
      }
      console.log("interval!!!");
      var rollDiceInterval = setInterval(
        () => this.rollDiceOnce(),
        intervalTime
      );
      this.setState({ rollDiceInterval });
    }
  };

  clearRollDiceInterval = () => {
    clearInterval(this.state.rollDiceInterval);
    this.setState({ rollDiceInterval: "" });
  };

  changeKeepRollingSpeed = () => {
    this.setState({
      keepRollingSpeed: document.getElementById("keepRollingSpeed").value
    });
  };

  toggleProbabilities = () => {
    this.setState({ viewProbabilities: !this.state.viewProbabilities });
  };

  render() {
    var diceClass;
    if (this.state.diceRollsAttacker.length !== 0) {
      if (this.state.diceRollsAttacker[0] !== 0) {
        diceClass = "diceNumImage";
      } else {
        diceClass = "diceZeroImage";
      }
    }
    if (this.state.diceRollsDefender.length !== 0) {
      if (this.state.diceRollsDefender[0] !== 0) {
        diceClass = "diceNumImage";
      } else {
        diceClass = "diceZeroImage";
      }
    }

    var keepRollingButton;
    if (this.state.rollDiceInterval === "") {
      keepRollingButton = (
        <span className="keepRollingSpeed">
          <Button type="primary" onClick={this.rollDice}>
            Roll Dice Forever
          </Button>{" "}
          <select
            id="keepRollingSpeed"
            value={this.state.keepRollingSpeed}
            onChange={this.changeKeepRollingSpeed}
          >
            <option value="Fast">Fast</option>
            <option value="Medium">Medium</option>
            <option value="Slow">Slow</option>
          </select>
        </span>
      );
    } else {
      keepRollingButton = (
        <span className="keepRollingSpeed">
          <Button type="seconday" onClick={this.clearRollDiceInterval}>
            Roll Dice Stop
          </Button>{" "}
          <select disabled>
            <option>Fast</option>
            <option>Medium</option>
            <option>Slow</option>
          </select>
        </span>
      );
    }

    var vpButtonType, probabilitiesViewA, probabilitiesViewD;
    if (this.state.viewProbabilities) {
      vpButtonType = "primary";
      probabilitiesViewA = (
        <div
          className="probabilities"
          key={"probsA" + this.state.viewProbabilities}
        >
          <span>Win Probability: {this.state.winProbsAttacker}</span>
          <span style={{ marginLeft: "30px" }}>
            Avg Armies Remaining: {this.state.avgArmiesAttacker}
          </span>
        </div>
      );
      probabilitiesViewD = (
        <div
          className="probabilities"
          key={"probsD" + this.state.viewProbabilities}
        >
          <span>Win Probability: {this.state.winProbsDefender}</span>
          <span style={{ marginLeft: "30px" }}>
            Avg Armies Remaining: {this.state.avgArmiesDefender}
          </span>
        </div>
      );
    } else {
      vpButtonType = "secondary";
      probabilitiesViewA = <div className="probabilities"></div>;
      probabilitiesViewD = <div className="probabilities"></div>;
    }

    return (
      <div>
        <div className="chooseDice">
          <Button type={vpButtonType} onClick={this.toggleProbabilities}>
            View Probabilities
          </Button>
          <span className="keepRollingSpeed">
            <Button type="primary" onClick={this.rollDiceOnce}>
              Roll Dice Once
            </Button>{" "}
          </span>
          {keepRollingButton}
        </div>
        <table>
          <thead>
            <tr>
              <th
                className="attackerHeader"
                style={{ background: "rgb(255,0,0,.5)" }}
              >
                Attacker<br></br>
                <span className="startingArmies">
                  Starting Armies:{" "}
                  <input
                    id="startingArmiesAttacker"
                    className="startingArmiesInput"
                    min={0}
                    type="number"
                    onChange={this.changeArmies}
                  ></input>
                </span>
                <br></br>
                <span className="armiesRemaining">
                  Armies Remaining: {this.state.armiesAttacker}
                </span>
                <br></br>
                {probabilitiesViewA}
              </th>
              <th
                className="defenderHeader"
                style={{ background: "rgb(0,0,255,.5)" }}
              >
                Defender<br></br>
                <span className="startingArmies">
                  Starting Armies:{" "}
                  <input
                    id="startingArmiesDefender"
                    className="startingArmiesInput"
                    type="number"
                    onChange={this.changeArmies}
                    min={0}
                  ></input>
                </span>
                <br></br>
                <span className="armiesRemaining">
                  Armies Remaining: {this.state.armiesDefender}
                </span>
                <br></br>
                {probabilitiesViewD}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="diceRow">
                <div className="diceRolls">
                  {this.state.diceRollsAttacker.map((roll, index) => (
                    <img
                      key={"diceRoll" + index + this.state.diceImageToggle}
                      src={this.state.diceImages[roll]}
                      className={diceClass}
                      alt="diceImage"
                    ></img>
                  ))}
                </div>
              </td>
              <td className="diceRow">
                <div className="diceRolls">
                  {this.state.diceRollsDefender.map((roll, index) => (
                    <img
                      key={"diceRoll" + index + this.state.diceImageToggle}
                      src={this.state.diceImages[roll]}
                      className={diceClass}
                      alt="diceImage"
                    ></img>
                  ))}
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <div className="lineChart">
                  <LineChart data={this.state.chartData}></LineChart>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default RiskDiceRoller;
