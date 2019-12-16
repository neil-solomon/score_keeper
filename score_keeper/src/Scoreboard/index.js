import React from "react";
import { Button, Modal, Icon, Popconfirm, Radio, notification } from "antd";
import "./Scoreboard.css";
import LineChart from "./LineChart.js";
import LoadButton from "./LoadButton.js";
import PlayerElement from "./PlayerElement";
import RoundElement from "./RoundElement.js";
import ManageScoreboardButtton from "./ManageScoreboardButtton.js";

class Scoreboard extends React.Component {
  state = {
    players: [],
    playerColors: [
      "hsl(0,100%,75%)",
      "hsl(60,100%,75%)",
      "hsl(120,100%,75%)",
      "hsl(180,100%,75%)",
      "hsl(240,100%,75%)",
      "hsl(300,100%,75%)",
      "hsl(30,100%,75%)",
      "hsl(90,100%,75%)",
      "hsl(150,100%,75%)",
      "hsl(210,100%,75%)",
      "hsl(270,100%,75%)",
      "hsl(330,100%,75%)"
    ],
    points: [],
    totalPoints: [],
    pointsOrRounds: [true, false], // gameLimit is points or rounds rounds
    highScoreWins: true, // if highest score wins at end of game
    gameLimit: 100,
    modalVisible: [false, false, false], // load scoreboard, save scoreboard, add player
    savedScoreboards: {},
    scoreboardsList: [],
    loadButtonSelect: [],
    pointsOrRoundsRadio: 0,
    highScoreWinsRadio: 0,
    deleteUsersActivated: false,
    deleteRoundsActivated: false,
    notificationEnable: true
  };

  buttonStyle = {
    fontSize: "20px",
    height: "40px",
    margin: "5px"
  };

  radioStyle = {
    display: "block",
    height: "18px",
    fontSize: "15px",
    marginLeft: "5px",
    textAlign: "center"
  };

  notificationStyle = {
    height: "100px",
    width: "300px",
    fontSize: "20px",
    backgroundColor: "rgb(255,255,0,.75)"
  };

  componentDidMount() {
    //console.log("CDM", typeof Storage === "undefined");
    var savedScoreboards =
      JSON.parse(localStorage.getItem("savedScoreboards")) || {};
    var scoreboardsList = [];
    for (var scoreboard in savedScoreboards) {
      scoreboardsList.push({
        title: scoreboard,
        dateModified: savedScoreboards[scoreboard].dateModified,
        selected: false
      });
    }
    if (window.innerWidth < window.innerHeight) {
      this.setState({ notificationEnable: false });
    }
    this.setState({ savedScoreboards });
    this.setState({ scoreboardsList });
  }

  updatePoints = (pointsIndex, newPoints) => {
    var points = [...this.state.points];
    console.log(points);
    points[pointsIndex[0]][pointsIndex[1]] = newPoints;
    var totalPoints = [...this.state.totalPoints];
    var oldLeaderboard = this.makeLeaderboard(totalPoints);
    totalPoints[pointsIndex[1]] += newPoints;
    var newLeaderboard = this.makeLeaderboard(totalPoints),
      winner = false;
    if (this.state.pointsOrRounds[0]) {
      // game is to points
      if (this.state.highScoreWins) {
        // high score wins
        if (
          newLeaderboard[2] >= this.state.gameLimit &&
          this.state.notificationEnable
        ) {
          winner = true;
          notification["warning"]({
            message: newLeaderboard[0] + " wins!",
            description: "",
            placement: "bottomRight",
            duration: 10,
            icon: <Icon type="alert" style={{ color: "rgb(0,0,255,.75)" }} />,
            style: this.notificationStyle
          });
        }
      } else {
        // low score wins
        winner = true;
        if (
          newLeaderboard[2] >= this.state.gameLimit &&
          this.state.notificationEnable
        ) {
          winner = true;
          notification["warning"]({
            message: newLeaderboard[1] + " wins!",
            description: "",
            placement: "bottomRight",
            duration: 10,
            icon: <Icon type="alert" style={{ color: "rgb(0,0,255,.75)" }} />,
            style: this.notificationStyle
          });
        }
      }
    } else {
      // game is to rounds
      if (this.state.highScoreWins) {
        // high score wins
        if (
          points.length >= this.state.gameLimit &&
          this.state.notificationEnable
        ) {
          winner = true;
          notification["warning"]({
            message: newLeaderboard[0] + " wins!",
            description: "",
            placement: "bottomRight",
            duration: 10,
            icon: <Icon type="alert" style={{ color: "rgb(0,0,255,.75)" }} />,
            style: this.notificationStyle
          });
        }
      } else {
        // low score wins
        if (
          points.length >= this.state.gameLimit &&
          this.state.notificationEnable
        ) {
          winner = true;
          notification["warning"]({
            message: newLeaderboard[1] + " wins!",
            description: "",
            placement: "bottomRight",
            duration: 10,
            icon: <Icon type="alert" style={{ color: "rgb(0,0,255,.75)" }} />,
            style: this.notificationStyle
          });
        }
      }
    }

    if (this.state.highScoreWins) {
      if (
        newLeaderboard[0] !== oldLeaderboard[0] &&
        !winner &&
        this.state.notificationEnable
      ) {
        notification["warning"]({
          message: newLeaderboard[0] + " takes the lead!",
          description: "",
          placement: "bottomRight",
          duration: 5,
          icon: <Icon type="alert" style={{ color: "rgb(0,0,255,.75)" }} />,
          style: this.notificationStyle
        });
      } else if (
        newLeaderboard[1] !== oldLeaderboard[1] &&
        !winner &&
        this.state.notificationEnable
      ) {
        notification["warning"]({
          message: newLeaderboard[1] + " falls to last place!",
          description: "",
          placement: "bottomRight",
          duration: 5,
          icon: <Icon type="alert" style={{ color: "rgb(0,0,255,.75)" }} />,
          style: this.notificationStyle
        });
      }
    } else {
      if (
        newLeaderboard[1] !== oldLeaderboard[1] &&
        !winner &&
        this.state.notificationEnable
      ) {
        notification["warning"]({
          message: newLeaderboard[1] + " takes the lead!",
          description: "",
          placement: "bottomRight",
          duration: 5,
          icon: <Icon type="alert" style={{ color: "rgb(0,0,255,.75)" }} />,
          style: this.notificationStyle
        });
      } else if (
        newLeaderboard[0] !== oldLeaderboard[0] &&
        !winner &&
        this.state.notificationEnable
      ) {
        notification["warning"]({
          message: newLeaderboard[0] + " falls to last place!",
          description: "",
          placement: "bottomRight",
          duration: 5,
          icon: <Icon type="alert" style={{ color: "rgb(0,0,255,.75)" }} />,
          style: this.notificationStyle
        });
      }
    }

    this.setState({ points });
    this.setState({ totalPoints });
  };

  makeLeaderboard = totalPoints => {
    var maxPoints = -1,
      minPoints = 100000,
      maxIx,
      minIx;
    for (let i = 0; i < totalPoints.length; i++) {
      if (totalPoints[i] > maxPoints) {
        maxPoints = totalPoints[i];
        maxIx = i;
      }
      if (totalPoints[i] < minPoints) {
        minPoints = totalPoints[i];
        minIx = i;
      }
    }
    return [
      this.state.players[maxIx],
      this.state.players[minIx],
      maxPoints,
      minPoints
    ];
  };

  loadScoreboard = () => {
    var newScoreboard = "null";
    for (let i = 0; i < this.state.scoreboardsList.length; ++i) {
      if (this.state.scoreboardsList[i].selected) {
        newScoreboard = this.state.scoreboardsList[i].title;
      }
    }
    if (newScoreboard !== "null") {
      this.setState({
        players: this.state.savedScoreboards[newScoreboard].players
      });
      this.setState({
        points: this.state.savedScoreboards[newScoreboard].points
      });
      this.setState({
        totalPoints: this.state.savedScoreboards[newScoreboard].totalPoints
      });
      this.setState({
        pointsOrRounds: this.state.savedScoreboards[newScoreboard]
          .pointsOrRounds
      });
      this.setState({
        pointsOrRoundsRadio: this.state.savedScoreboards[newScoreboard]
          .pointsOrRoundsRadio
      });
      this.setState({
        highScoreWins: this.state.savedScoreboards[newScoreboard].highScoreWins
      });
      this.setState({
        highScoreWinsRadio: this.state.savedScoreboards[newScoreboard]
          .highScoreWinsRadio
      });
      this.setState({
        gameLimit: this.state.savedScoreboards[newScoreboard].gameLimit
      });
    }
    var scoreboardsList = [...this.state.scoreboardsList];
    for (let i = 0; i < scoreboardsList.length; ++i) {
      scoreboardsList[i].selected = false;
    }
    this.setState({ scoreboardsList });
    this.closeModals();
  };

  padNum = string => {
    /* Assumes string is can be converted to a number. Adds a leading
    zero to single digit numbers. */
    if (string.length === 1) {
      string = "0" + string;
    }
    return string;
  };

  saveScoreboard = () => {
    if (
      typeof this.state.scoreboardTitle === "undefined" ||
      this.state.scoreboardTitle === "null"
    ) {
      notification["warning"]({
        message: "Saved failed",
        description: "Title cannot be blank.",
        placement: "bottomRight",
        duration: 3
      });
    } else {
      var today = new Date();
      var currentYear = today.getFullYear();
      var currentMonth = today.getMonth() + 1;
      var currentDate = today.getDate();
      var todaysDate =
        this.padNum(currentMonth.toString()) +
        "-" +
        this.padNum(currentDate.toString()) +
        "-" +
        currentYear.toString();
      var savedScoreboards = this.state.savedScoreboards;
      var newScoreboard = {
        title: this.state.scoreboardTitle,
        points: this.state.points,
        players: this.state.players,
        totalPoints: this.state.totalPoints,
        pointsOrRounds: this.state.pointsOrRounds,
        pointsOrRoundsRadio: this.state.pointsOrRoundsRadio,
        highScoreWins: this.state.highScoreWins,
        highScoreWinsRadio: this.state.highScoreWinsRadio,
        gameLimit: this.state.gameLimit,
        dateModified: todaysDate
      };
      savedScoreboards[this.state.scoreboardTitle] = newScoreboard;
      var scoreboardsList = [...this.state.scoreboardsList];
      scoreboardsList.push({
        title: newScoreboard.title,
        dateModified: newScoreboard.dateModified,
        selected: false
      });
      this.setState({ savedScoreboards });
      localStorage.setItem(
        "savedScoreboards",
        JSON.stringify(savedScoreboards)
      );
      //console.log(savedScoreboards, JSON.stringify(savedScoreboards));
      this.setState({ scoreboardsList });
      this.closeModals();
    }
  };

  toggleDeleteUsersActivated = () => {
    this.setState({ deleteUsersActivated: !this.state.deleteUsersActivated });
  };

  addPlayer = () => {
    var players = [...this.state.players];
    var totalPoints = [...this.state.totalPoints];
    var points = [...this.state.points];
    var newPlayer = "New" + this.state.players.length.toString();
    players.push(newPlayer);
    totalPoints.push(0);
    for (let i = 0; i < points.length; ++i) {
      points[i].push(0);
    }
    this.setState({ players });
    this.setState({ totalPoints });
    this.setState({ points });
  };

  removePlayer = player => {
    var players = [...this.state.players];
    players.splice(player, 1);
    var totalPoints = [...this.state.totalPoints];
    totalPoints.splice(player, 1);
    var newPoints = [];
    for (let i = 0; i < this.state.points.length; ++i) {
      var round = [];
      for (let j = 0; j < this.state.players.length; ++j) {
        if (j !== player) {
          round.push(this.state.points[i][j]);
          //console.log(this.state.points[i][j]);
        }
      }
      newPoints.push(round);
    }
    this.setState({ players });
    this.setState({ totalPoints });
    this.setState({ points: newPoints });
  };

  changePlayerName = (newName, playerIndex) => {
    var players = [...this.state.players];
    players[playerIndex] = newName;
    this.setState({ players });
  };

  removeRound = round => {
    var points = [...this.state.points];
    var totalPoints = [...this.state.totalPoints];
    for (let i = 0; i < totalPoints.length; ++i) {
      totalPoints[i] -= points[round][i];
    }
    points.splice(round, 1);
    this.setState({ points });
    this.setState({ totalPoints });
  };

  addRound = () => {
    if (this.state.players.length === 0) {
      return;
    }
    var points = [...this.state.points];
    var newRound = [];
    for (let i = 0; i < this.state.players.length; ++i) {
      newRound.push(0);
    }
    points.push(newRound);
    this.setState({ points });
  };

  toggleDeleteRoundsActivated = () => {
    this.setState({ deleteRoundsActivated: !this.state.deleteRoundsActivated });
  };

  clearPoints = () => {
    var totalPoints = [];
    for (let i = 0; i < this.state.players.length; ++i) {
      totalPoints.push(0);
    }
    this.setState({ points: [] });
    this.setState({ totalPoints });
  };

  clearPlayers = () => {
    this.setState({ points: [] });
    this.setState({ totalPoints: [] });
    this.setState({ players: [] });
  };

  closeModals = () => {
    this.setState({ modalVisible: [false, false, false] });
  };

  changeGameLimit = () => {
    var gameLimit = parseInt(document.getElementById("gameLimit").value, 10);
    if (typeof gameLimit === "number") {
      this.setState({ gameLimit });
    } else {
      this.setState({ gameLimit: 100 });
    }
  };

  makeChartData = () => {
    var chartData = [];
    for (let player = 0; player < this.state.players.length; ++player) {
      var playerOngoingTotal = [];
      for (
        let lastRound = 0;
        lastRound < this.state.points.length;
        ++lastRound
      ) {
        var totalPoints = 0;
        for (let round = 0; round <= lastRound; ++round) {
          totalPoints += this.state.points[round][player];
        }
        playerOngoingTotal.push({ x: lastRound + 1, y: totalPoints });
      }
      var playerInfo = {
        id: this.state.players[player],
        data: playerOngoingTotal
      };
      chartData.push(playerInfo);
    }
    return chartData;
  };

  modalClick = modal => {
    var modalVisible = [];
    for (let i = 0; i < this.state.modalVisible.length; ++i) {
      if (i === modal) {
        modalVisible.push(true);
      } else {
        modalVisible.push(false);
      }
    }
    this.setState({ modalVisible });
  };

  pointsOrRounds = radio => {
    if (radio.target.value) {
      this.setState({ pointsOrRounds: [false, true] });
      this.setState({ pointsOrRoundsRadio: 1 });
    } else {
      this.setState({ pointsOrRounds: [true, false] });
      this.setState({ pointsOrRoundsRadio: 0 });
    }
  };

  highScoreWins = radio => {
    if (radio.target.value) {
      this.setState({ highScoreWins: false });
      this.setState({ highScoreWinsRadio: 1 });
    } else {
      this.setState({ highScoreWins: true });
      this.setState({ highScoreWinsRadio: 0 });
    }
  };

  updateScoreboardTitle = () => {
    var scoreboardTitle = document.getElementById("scoreboardTitle").value;
    this.setState({ scoreboardTitle });
  };

  loadButtonSelect = id => {
    var scoreboardsList = this.state.scoreboardsList;
    for (let i = 0; i < this.state.scoreboardsList.length; ++i) {
      if (i === id) {
        scoreboardsList[i].selected = !scoreboardsList[i].selected;
      } else {
        scoreboardsList[i].selected = false;
      }
    }
    this.setState({ scoreboardsList });
  };

  deleteScoreboard = (scoreboardTitle, index) => {
    //console.log(scoreboardTitle, index);
    var savedScoreboards = this.state.savedScoreboards;
    delete savedScoreboards[scoreboardTitle];
    var scoreboardsList = [...this.state.scoreboardsList];
    scoreboardsList.splice(index, 1);
    this.setState({ savedScoreboards });
    this.setState({ scoreboardsList });
    localStorage.setItem("savedScoreboards", JSON.stringify(savedScoreboards));
  };

  render() {
    var emptyScoreboard;
    if (this.state.players.length === 0) {
      emptyScoreboard = (
        <th className="Scoreboard_emptyScoreboard">
          The scoreboard is empty. Add a player!
          <ManageScoreboardButtton
            type="user-add"
            description="Add a player."
            activated={false}
            handleClick={this.addPlayer}
          ></ManageScoreboardButtton>{" "}
        </th>
      );
    }

    var chartData = this.makeChartData();

    var maxPoints = 0,
      minPoints = 1000000;
    for (let i = 0; i < this.state.totalPoints.length; ++i) {
      if (this.state.totalPoints[i] > maxPoints) {
        maxPoints = this.state.totalPoints[i];
      }
      if (this.state.totalPoints[i] < minPoints) {
        minPoints = this.state.totalPoints[i];
      }
    }

    var chartYmax, chartXmax;
    if (this.state.pointsOrRounds[0]) {
      // game is to points
      chartYmax = Math.max(1.1 * this.state.gameLimit, maxPoints);
      chartXmax = this.state.points.length + 1;
    } else {
      // game is to rounds
      chartYmax = "auto";
      chartXmax = this.state.gameLimit + 1;
    }

    var playerIcons = [],
      pointsGameIsOver = false,
      noOneIsMax = true,
      noOneIsMin = true;
    for (let player = 0; player < this.state.players.length; ++player) {
      if (this.state.totalPoints[player] >= this.state.gameLimit) {
        pointsGameIsOver = true;
      }
    }
    for (let player = 0; player < this.state.players.length; ++player) {
      if (this.state.pointsOrRounds[0]) {
        // game is to points
        if (this.state.highScoreWins) {
          // highest score wins
          if (
            pointsGameIsOver &&
            this.state.totalPoints[player] === maxPoints &&
            this.state.points.length > 0
          ) {
            playerIcons.push(
              <Icon
                type="star"
                theme="twoTone"
                twoToneColor="#ffae00"
                spin
              ></Icon>
            );
          } else if (
            this.state.totalPoints[player] === maxPoints &&
            this.state.points.length > 0 &&
            noOneIsMax
          ) {
            playerIcons.push(
              <Icon
                type="smile"
                //theme="twoTone"
                //twoToneColor={this.state.playerColors[player]}
              ></Icon>
            );
            noOneIsMax = false;
          } else if (
            this.state.totalPoints[player] === minPoints &&
            this.state.points.length > 0
          ) {
            playerIcons.push(
              <Icon
                type="frown"
                //theme="twoTone"
                //twoToneColor={this.state.playerColors[player]}
              ></Icon>
            );
          } else {
            playerIcons.push(
              <Icon
                type="meh"
                //theme="twoTone"
                //twoToneColor={this.state.playerColors[player]}
              ></Icon>
            );
          }
        } else {
          // lowest score wins
          if (
            pointsGameIsOver &&
            this.state.totalPoints[player] === minPoints &&
            this.state.points.length > 0
          ) {
            playerIcons.push(
              <Icon
                type="star"
                theme="twoTone"
                twoToneColor="#ffae00"
                spin
              ></Icon>
            );
          } else if (
            this.state.totalPoints[player] === minPoints &&
            this.state.points.length > 0 &&
            noOneIsMin
          ) {
            playerIcons.push(
              <Icon
                type="smile"
                //theme="twoTone"
                //twoToneColor={this.state.playerColors[player]}
              ></Icon>
            );
            noOneIsMin = false;
          } else if (
            this.state.totalPoints[player] === maxPoints &&
            this.state.points.length > 0
          ) {
            playerIcons.push(
              <Icon
                type="frown"
                //theme="twoTone"
                //twoToneColor={this.state.playerColors[player]}
              ></Icon>
            );
          } else {
            playerIcons.push(
              <Icon
                type="meh"
                //theme="twoTone"
                //twoToneColor={this.state.playerColors[player]}
              ></Icon>
            );
          }
        }
      } else {
        // game is to rounds
        if (this.state.highScoreWins) {
          // highest score wins
          if (
            chartData[0].data.length >= this.state.gameLimit &&
            this.state.totalPoints[player] === maxPoints
          ) {
            playerIcons.push(
              <Icon
                type="star"
                theme="twoTone"
                twoToneColor="#ffae00"
                spin
              ></Icon>
            );
          } else if (
            this.state.totalPoints[player] === maxPoints &&
            this.state.points.length > 0 &&
            noOneIsMax
          ) {
            playerIcons.push(
              <Icon
                type="smile"
                //theme="twoTone"
                //twoToneColor={this.state.playerColors[player]}
              ></Icon>
            );
            noOneIsMax = false;
          } else if (
            this.state.totalPoints[player] === minPoints &&
            this.state.points.length > 0
          ) {
            playerIcons.push(
              <Icon
                type="frown"
                //theme="twoTone"
                //twoToneColor={this.state.playerColors[player]}
              ></Icon>
            );
          } else {
            playerIcons.push(
              <Icon
                type="meh"
                //theme="twoTone"
                //twoToneColor={this.state.playerColors[player]}
              ></Icon>
            );
          }
        } else {
          // lowest score wins
          if (
            chartData[0].data.length >= this.state.gameLimit &&
            this.state.totalPoints[player] === minPoints
          ) {
            playerIcons.push(
              <Icon
                type="star"
                theme="twoTone"
                twoToneColor="#ffae00"
                spin
              ></Icon>
            );
          } else if (
            this.state.totalPoints[player] === minPoints &&
            this.state.points.length > 0 &&
            noOneIsMin
          ) {
            playerIcons.push(
              <Icon
                type="smile"
                //theme="twoTone"
                //twoToneColor={this.state.playerColors[player]}
              ></Icon>
            );
            noOneIsMin = false;
          } else if (
            this.state.totalPoints[player] === maxPoints &&
            this.state.points.length > 0
          ) {
            playerIcons.push(
              <Icon
                type="frown"
                //theme="twoTone"
                //twoToneColor={this.state.playerColors[player]}
              ></Icon>
            );
          } else {
            playerIcons.push(
              <Icon
                type="meh"
                //theme="twoTone"
                //twoToneColor={this.state.playerColors[player]}
              ></Icon>
            );
          }
        }
      }
    }

    var saveScoreboardWarning = (
      <div className="Scoreboard_saveScoreboardWarning"></div>
    );
    if (
      typeof this.state.savedScoreboards[this.state.scoreboardTitle] !==
      "undefined"
    ) {
      saveScoreboardWarning = (
        <div className="Scoreboard_saveScoreboardWarning">
          WARNING: This scoreboard title already exists. Saving now will
          overwrite.
        </div>
      );
    }

    var chartMargins, tableAlign;
    if (window.innerHeight > window.innerWidth) {
      chartMargins = [25, 0, 5, 5];
      tableAlign = "center";
    } else {
      chartMargins = [50, 100, 100, 50];
      tableAlign = "left";
    }

    return (
      <div className="mainContainer">
        <h1 className="pageHeader">Scoreboard</h1>
        <div className="Scoreboard_mainButtons">
          <Button
            type="secondary"
            className="menuButton"
            onClick={() => this.modalClick(0)}
          >
            Load Scoreboard
          </Button>
          <Button
            type="secondary"
            className="menuButton"
            onClick={() => this.modalClick(1)}
          >
            Save Scoreboard
          </Button>
          <Button
            type="danger"
            className="menuButton"
            onClick={this.clearPoints}
          >
            Clear Points
          </Button>
          <Button
            type="danger"
            className="menuButton"
            onClick={this.clearPlayers}
          >
            Clear Players
          </Button>
          <div className="Scoreboard_gameLimit">
            Game is to:{" "}
            <input
              type="text"
              size="5"
              id="gameLimit"
              placeholder={this.state.gameLimit}
              onChange={this.changeGameLimit}
            ></input>
            <Radio.Group
              onChange={this.pointsOrRounds}
              value={this.state.pointsOrRoundsRadio}
            >
              <Radio value={0} style={this.radioStyle}>
                Points
              </Radio>
              <Radio value={1} style={this.radioStyle}>
                Rounds
              </Radio>
            </Radio.Group>
            <span className="Scoreboard_highWins">
              <Radio.Group
                onChange={this.highScoreWins}
                value={this.state.highScoreWinsRadio}
              >
                <Radio value={0} style={this.radioStyle}>
                  Highest Score Wins
                </Radio>
                <Radio value={1} style={this.radioStyle}>
                  Lowest Score Wins
                </Radio>
              </Radio.Group>
            </span>
          </div>
        </div>
        <table className="Scoreboard_table" align={tableAlign}>
          <thead>
            <tr>
              <th className="Scoreboard_manageUsers">
                <ManageScoreboardButtton
                  type="user-add"
                  description="Add a player."
                  activated={false}
                  handleClick={this.addPlayer}
                ></ManageScoreboardButtton>
                <ManageScoreboardButtton
                  type="usergroup-delete"
                  description="Remove players."
                  activated={this.state.deleteUsersActivated}
                  handleClick={this.toggleDeleteUsersActivated}
                ></ManageScoreboardButtton>
                <ManageScoreboardButtton
                  type="plus-circle"
                  description="Add a round."
                  activated={false}
                  handleClick={this.addRound}
                ></ManageScoreboardButtton>
                <ManageScoreboardButtton
                  type="minus-circle"
                  description="Remove rounds."
                  activated={this.state.deleteRoundsActivated}
                  handleClick={this.toggleDeleteRoundsActivated}
                ></ManageScoreboardButtton>
              </th>
              {emptyScoreboard}
              {this.state.players.map((player, index) => (
                <PlayerElement
                  key={"player" + index + this.state.players.length}
                  playerName={player}
                  playerIndex={index}
                  backgroundColor={this.state.playerColors[index]}
                  icon={playerIcons[index]}
                  totalPoints={this.state.totalPoints[index]}
                  numPlayers={this.state.players.length}
                  deleteUsersActivated={this.state.deleteUsersActivated}
                  removePlayer={this.removePlayer}
                  changePlayerName={this.changePlayerName}
                ></PlayerElement>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.points.map((round, index) => (
              <RoundElement
                key={"roundElement" + index}
                roundNumber={index}
                roundPoints={round}
                deleteRoundsActivated={this.state.deleteRoundsActivated}
                updatePoints={this.updatePoints}
                removeRound={this.removeRound}
              ></RoundElement>
            ))}
          </tbody>
        </table>
        <div className="Scoreboard_scoreboardLineChart">
          <LineChart
            xmax={chartXmax}
            ymax={chartYmax}
            gameLimit={this.state.gameLimit}
            data={chartData}
            chartMargins={chartMargins}
          ></LineChart>
        </div>
        <Modal
          visible={this.state.modalVisible[0]}
          onCancel={this.closeModals}
          onOk={this.loadScoreboard}
          okText="Load"
        >
          <div className="Scoreboard_modal">
            <strong> Select a Scoreboard:</strong>
            <br></br>
            {this.state.scoreboardsList.map((scoreboard, index) => (
              <div key={"loadButton" + index}>
                <LoadButton
                  key={"scoreboard-" + index.toString()}
                  id={index}
                  name={scoreboard.title}
                  dateModified={scoreboard.dateModified}
                  activated={this.state.scoreboardsList[index].selected}
                  onClick={this.loadButtonSelect}
                ></LoadButton>
                <Popconfirm
                  title={"Delete " + scoreboard.title + " ?"}
                  onConfirm={() =>
                    this.deleteScoreboard(scoreboard.title, index)
                  }
                >
                  <Icon
                    type="close-circle"
                    theme="twoTone"
                    twoToneColor="#fc9999"
                    style={{ margin: "5px", fontSize: "20px" }}
                  ></Icon>
                </Popconfirm>
              </div>
            ))}
          </div>
        </Modal>
        <Modal
          visible={this.state.modalVisible[1]}
          onCancel={this.closeModals}
          onOk={this.saveScoreboard}
          okText="Save"
        >
          <div className="Scoreboard_modal">
            <strong>Title of Scoreboard:</strong>
            <br></br>
            <input
              type="text"
              placeholder="Title"
              id="scoreboardTitle"
              onChange={this.updateScoreboardTitle}
            ></input>
            {saveScoreboardWarning}
            <strong> Saved Scoreboards:</strong>
            {this.state.scoreboardsList.map(scoreboard => (
              <div key={"savedScoreboadsList" + scoreboard.title}>
                {scoreboard.title}
              </div>
            ))}
          </div>
        </Modal>
      </div>
    );
  }
}

export default Scoreboard;
