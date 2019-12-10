import React from "react";
//import logo from "./logo.svg";
import "antd/dist/antd.css";
import "./App.css";
import RBRS from "./RoundByRoundScoreboard/index.js";
import DiceRoller from "./DiceRoller/index.js";

function App() {
  return (
    <div>
      <DiceRoller></DiceRoller>
    </div>
  );
}

export default App;
