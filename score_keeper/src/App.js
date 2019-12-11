import React from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "antd/dist/antd.css";
import "./App.css";
import Scoreboard from "./Scoreboard/index.js";
import Home from "./Home/index.js";
import DiceRoller from "./DiceRoller/index.js";
import RiskDiceRoller from "./RiskDiceRoller/index.js";

function App() {
  return (
    <HashRouter basename="/">
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/Home" component={Home} />
        <Route exact path="/DiceRoller" component={DiceRoller} />
        <Route exact path="/Scoreboard" component={Scoreboard} />
        <Route exact path="/RiskDiceRoller" component={RiskDiceRoller} />
      </div>
    </HashRouter>
  );
}

export default App;
