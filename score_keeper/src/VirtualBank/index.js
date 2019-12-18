import React from "react";
import { Modal, Icon, Popconfirm, notification } from "antd";
import PlayerElement from "./PlayerElement.js";
import "./VirtualBank.css";
import TransferArrow from "./TransferArrow.js";
import AddPlayerButton from "./AddPlayerButton.js";
import SaveButton from "./SaveButton.js";
import LoadButton from "./LoadButton.js";
import LoadBankButton from "./LoadBankButton";
import RemovePlayersButton from "./RemovePlayersButton.js";
import DeleteButton from "./DeleteButton";

class Bank extends React.Component {
  state = {
    addPlayerModalVisible: false,
    saveModalVisible: false,
    loadModalVisible: false,
    badNewPlayerName: false,
    players: [
      {
        name: "BANK",
        money: "$$$$",
        bank: true,
        selected: [false, false],
        losingMoney: false,
        gainingMoney: false
      }
    ],
    windowIsLandscape: true,
    savedBanks: {},
    savedBanksList: [],
    saveBankTitle: "",
    loadedBankToggle: false,
    removePlayersEnable: false,
    transferEnabled: true,
    transferMoneyInterval: null,
    transferAmount: 0,
    transferAmountCount: 0
    // smileyColor: "rgb(100,0,0)",
    // colorPeak: false
  };

  componentDidMount() {
    var savedBanks =
      JSON.parse(localStorage.getItem("GameNight_savedBanks")) || {};
    var savedBanksList = [];
    for (var bank in savedBanks) {
      savedBanksList.push({
        title: bank,
        dateModified: savedBanks[bank].dateModified,
        selected: false
      });
    }
    this.setState({ savedBanks });
    this.setState({ savedBanksList });

    this.checkWindowOrientation();
    window.addEventListener("resize", this.checkWindowOrientation);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.checkWindowOrientation);
    clearInterval(this.state.transferMoneyInterval);
  }

  checkWindowOrientation = () => {
    this.setState({
      windowIsLandscape: window.innerWidth > window.innerHeight
    });
  };

  togglePlayerSelected = (fromTo, playerId) => {
    var players = [...this.state.players];
    players[playerId].selected[fromTo - 1] = !this.state.players[playerId]
      .selected[fromTo - 1];
    this.setState({ players });
  };

  toggleAddPlayerModalVisible = () => {
    this.setState({ badNewPlayerName: false });
    this.setState({ addPlayerModalVisible: !this.state.addPlayerModalVisible });
  };

  toggleSaveModalVisible = () => {
    this.setState({ saveModalVisible: !this.state.saveModalVisible });
  };

  toggleLoadModalVisible = () => {
    var savedBanksList = [...this.state.savedBanksList];
    for (let i = 0; i < savedBanksList.length; ++i) {
      savedBanksList[i].selected = false;
    }
    this.setState({ savedBanksList });
    this.setState({ loadModalVisible: !this.state.loadModalVisible });
  };

  addPlayer = () => {
    var newPlayerName = document.getElementById("newPlayerName").value;
    if (newPlayerName === "") {
      this.setState({ badNewPlayerName: true });
      return;
    }
    var players = [...this.state.players];
    var newPlayerMoney = parseInt(
      document.getElementById("newPlayerMoney").value
    );
    if (isNaN(newPlayerMoney)) {
      notification["warning"]({
        message: "Starting Money must be a number!",
        description: "",
        placement: "bottomRight",
        duration: 5,
        style: {
          height: "100px",
          width: "300px",
          fontSize: "20px",
          backgroundColor: "rgb(255,255,0,.75)"
        }
      });
      return;
    }
    players.push({
      name: newPlayerName,
      money: newPlayerMoney,
      bank: false,
      selected: [false, false],
      losingMoney: false,
      gainingMoney: false
    });
    this.setState({ players });
    this.toggleAddPlayerModalVisible();
  };

  updateSaveBankTitle = () => {
    this.setState({
      saveBankTitle: document.getElementById("saveBankTitle").value
    });
  };

  saveBank = () => {
    if (
      typeof this.state.saveBankTitle === "undefined" ||
      this.state.saveBankTitle === "null" ||
      this.state.saveBankTitle === ""
    ) {
      notification["error"]({
        message: "Saved failed",
        description: "Title cannot be blank.",
        placement: "bottomRight",
        duration: 3
      });
      return;
    }
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
    var savedBanks = this.state.savedBanks;
    var newBank = {
      title: this.state.saveBankTitle,
      players: [...this.state.players],
      dateModified: todaysDate
    };
    for (let i = 0; i < newBank.players.length; ++i) {
      newBank.players[i].selected[0] = false;
      newBank.players[i].selected[1] = false;
    }
    savedBanks[newBank.title] = newBank;
    var savedBanksList = [...this.state.savedBanksList];
    var alreadyInList = false;
    for (let i = 0; i < savedBanksList.length; ++i) {
      if (savedBanksList[i].title === newBank.title) {
        alreadyInList = true;
      }
    }
    if (!alreadyInList) {
      savedBanksList.push({
        title: newBank.title,
        dateModified: newBank.dateModified,
        selected: false
      });
    }
    this.setState({ savedBanksList });
    this.setState({ savedBanks });
    localStorage.setItem("GameNight_savedBanks", JSON.stringify(savedBanks));
    this.toggleSaveModalVisible();
  };

  loadBank = () => {
    var newBank = null;
    for (let i = 0; i < this.state.savedBanksList.length; ++i) {
      if (this.state.savedBanksList[i].selected) {
        newBank = this.state.savedBanksList[i].title;
      }
    }
    if (newBank) {
      this.setState({
        players: this.state.savedBanks[newBank].players
      });
      this.setState({ loadedBankToggle: !this.state.loadedBankToggle });
    }
    this.toggleLoadModalVisible();
  };

  padNum = string => {
    /* Assumes string is can be converted to a number. Adds a leading
    zero to single digit numbers. */
    if (string.length === 1) {
      string = "0" + string;
    }
    return string;
  };

  deleteSavedBank = (savedBankTitle, index) => {
    //console.log(scoreboardTitle, index);
    var savedBanks = this.state.savedBanks;
    delete savedBanks[savedBankTitle];
    var savedBanksList = [...this.state.savedBanksList];
    savedBanksList.splice(index, 1);
    this.setState({ savedBanks });
    this.setState({ savedBanksList });
    localStorage.setItem("GameNight_savedBanks", JSON.stringify(savedBanks));
  };

  loadBankSelect = id => {
    var savedBanksList = [...this.state.savedBanksList];
    for (let i = 0; i < this.state.savedBanksList.length; ++i) {
      if (i === id) {
        savedBanksList[i].selected = !savedBanksList[i].selected;
      } else {
        savedBanksList[i].selected = false;
      }
    }
    this.setState({ savedBanksList });
  };

  toggleRemovePlayers = () => {
    this.setState({ removePlayersEnable: !this.state.removePlayersEnable });
  };

  removePlayer = playerId => {
    var players = [...this.state.players];
    players.splice(playerId, 1);
    this.setState({ players });
  };

  transferMoney = () => {
    var transferAmount = parseInt(
      document.getElementById("transferAmount").value
    );
    if (isNaN(transferAmount)) {
      return;
    }
    if (transferAmount < 0) {
      return;
    }
    var fromPlayers = [],
      toPlayers = [],
      players = [...this.state.players];
    for (let i = 0; i < players.length; ++i) {
      if (players[i].selected[0]) {
        fromPlayers.push(i);
        players[i].losingMoney = true;
      }
      if (players[i].selected[1]) {
        toPlayers.push(i);
        players[i].gainingMoney = true;
      }
    }
    this.setState({ transferAmount });
    var intervalTime = Math.round(2000 / transferAmount);
    var transferMoneyInterval = setInterval(
      () => this.moveMoney(fromPlayers, toPlayers),
      intervalTime
    );
    this.setState({ players });
    this.setState({ transferEnabled: false });
    this.setState({ transferMoneyInterval });
  };

  moveMoney = (fromPlayers, toPlayers) => {
    var players = [...this.state.players];
    for (let i = 0; i < fromPlayers.length; ++i) {
      if (fromPlayers[i] !== 0) {
        players[fromPlayers[i]].money -= 1 * toPlayers.length;
      }
    }
    for (let i = 0; i < toPlayers.length; ++i) {
      if (toPlayers[i] !== 0) {
        players[toPlayers[i]].money += 1 * fromPlayers.length;
      }
    }
    if (this.state.transferAmount - 1 === this.state.transferAmountCount) {
      this.setState({ transferAmount: 0 });
      this.setState({ transferAmountCount: 0 });
      this.setState({ transferEnabled: true });
      for (let i = 0; i < players.length; ++i) {
        players[i].losingMoney = false;
        players[i].gainingMoney = false;
      }
      this.setState({ players });
      clearInterval(this.state.transferMoneyInterval);
      return;
    }
    this.setState({ transferAmountCount: this.state.transferAmountCount + 1 });
    this.setState(players);
  };

  nullFunction = () => {
    return;
  };

  // animateSmiley = () => {
  //   var interval = setInterval(this.changeColor, 10);
  //   this.setState({ interval });
  // };

  // changeColor = () => {
  //   var color = parseInt(this.state.smileyColor.slice(4, 7));
  //   if (color === 250) {
  //     this.setState({ colorPeak: true });
  //   }
  //   if (this.state.colorPeak) {
  //     color -= 10;
  //   } else {
  //     color += 10;
  //   }
  //   var newColor = "rgb(" + color.toString() + ",0,0)";
  //   console.log(newColor);
  //   this.setState({ smileyColor: newColor });
  //   if (color === 100 && this.state.colorPeak) {
  //     clearInterval(this.state.interval);
  //     this.setState({ colorPeak: false });
  //   }
  // };

  render() {
    var badNewPlayerNameWarning;
    if (this.state.badNewPlayerName) {
      badNewPlayerNameWarning = (
        <div
          key={this.state.badNewPlayerName}
          className="VirtualBank_modalWarning"
        >
          Player name cannot be blank.
        </div>
      );
    } else {
      badNewPlayerNameWarning = (
        <div className="VirtualBank_modalWarning"></div>
      );
    }

    var saveBankWarning;
    if (
      typeof this.state.savedBanks[this.state.saveBankTitle] === "undefined"
    ) {
      saveBankWarning = (
        <div className="VirtualBank_modalWarning" id="saveBankWarning"></div>
      );
    } else {
      saveBankWarning = (
        <div
          key={this.state.saveBankTitle}
          className="VirtualBank_modalWarning"
          id="saveBankWarning"
        >
          WARNING: This bank title already exists. Saving now will overwrite.
        </div>
      );
    }

    var fromToStyle;
    if (this.state.windowIsLandscape) {
      fromToStyle = { fontWeight: "bold", fontSize: "18px" };
    } else {
      fromToStyle = { fontWeight: "bold", fontSize: "14px" };
    }

    return (
      <div className="mainContainer">
        <h1 className="pageHeader">Virtual Bank</h1>
        <div className="VirtualBank_menuButtons">
          {/* <Icon
            type="smile"
            style={{ fontSize: "50px", color: this.state.smileyColor }}
            onClick={this.animateSmiley}
          ></Icon> */}
          <AddPlayerButton
            windowIsLandscape={this.state.windowIsLandscape}
            toggleModalVisible={this.toggleAddPlayerModalVisible}
          ></AddPlayerButton>
          <RemovePlayersButton
            windowIsLandscape={this.state.windowIsLandscape}
            toggleRemovePlayers={this.toggleRemovePlayers}
          ></RemovePlayersButton>
          <SaveButton
            windowIsLandscape={this.state.windowIsLandscape}
            toggleModalVisible={this.toggleSaveModalVisible}
          ></SaveButton>
          <LoadButton
            windowIsLandscape={this.state.windowIsLandscape}
            toggleModalVisible={this.toggleLoadModalVisible}
          ></LoadButton>
        </div>
        <table
          align="center"
          className="VirtualBank_table"
          key={this.state.loadedBankToggle}
        >
          <thead>
            <tr>
              <th style={fromToStyle}>FROM</th>
              <th className="VirtualBank_middleTableHeader">
                <TransferArrow
                  transferEnabled={this.state.transferEnabled}
                  handleClick={this.transferMoney}
                  windowIsLandscape={this.state.windowIsLandscape}
                ></TransferArrow>
              </th>
              <th style={fromToStyle}>TO</th>
            </tr>
          </thead>
          <tbody>
            {this.state.players.map((player, index) => (
              <PlayerElement
                key={"playerElement" + index}
                playerId={index}
                name={player.name}
                money={player.money}
                bank={player.bank}
                selected={player.selected}
                toggleSelected={this.togglePlayerSelected}
                windowIsLandscape={this.state.windowIsLandscape}
                removePlayersEnable={this.state.removePlayersEnable}
                removePlayer={this.removePlayer}
                losingMoney={player.losingMoney}
                gainingMoney={player.gainingMoney}
              ></PlayerElement>
            ))}
          </tbody>
        </table>
        <Modal
          visible={this.state.addPlayerModalVisible}
          title="Add Player"
          onOk={this.addPlayer}
          onCancel={this.toggleAddPlayerModalVisible}
        >
          <div style={{ fontWeight: "bold", fontSize: "16px" }}>
            Player Name:{" "}
            <input
              id="newPlayerName"
              type="text"
              placeholder="Add Player"
              style={{ width: "200px", fontSize: "16px" }}
            ></input>
            {badNewPlayerNameWarning}
            Starting Money:{" "}
            <input
              id="newPlayerMoney"
              type="text"
              placeholder="$$$$$"
              style={{ width: "200px", fontSize: "16px" }}
            ></input>
          </div>
        </Modal>
        <Modal
          title="Save Bank"
          visible={this.state.saveModalVisible}
          onCancel={this.toggleSaveModalVisible}
          onOk={this.saveBank}
          okText="Save"
        >
          <div style={{ fontWeight: "bold", fontSize: "16px" }}>
            Title of Bank:{" "}
            <input
              type="text"
              placeholder="Title"
              id="saveBankTitle"
              onChange={this.updateSaveBankTitle}
              style={{ width: "200px", fontSize: "16px" }}
            ></input>
            {saveBankWarning}
            Saved Banks:{" "}
            {this.state.savedBanksList.map(bank => (
              <div
                style={{ fontWeight: "normal" }}
                key={"savedBanksList" + bank.title}
              >
                {bank.title}
              </div>
            ))}
          </div>
        </Modal>
        <Modal
          visible={this.state.loadModalVisible}
          onCancel={this.toggleLoadModalVisible}
          onOk={this.loadBank}
          okText="Load"
          title="Load Bank"
        >
          <div style={{ fontWeight: "bold", fontSize: "18px" }}>
            Select a Bank:{" "}
            {this.state.savedBanksList.map((bank, index) => (
              <div key={"loadButton" + index}>
                <LoadBankButton
                  key={"bank-" + index.toString()}
                  id={index}
                  name={bank.title}
                  dateModified={bank.dateModified}
                  selected={this.state.savedBanksList[index].selected}
                  onClick={this.loadBankSelect}
                  windowIsLandscape={this.state.windowIsLandscape}
                ></LoadBankButton>
                <Popconfirm
                  title={"Delete " + bank.title + " ?"}
                  onConfirm={() => this.deleteSavedBank(bank.title, index)}
                >
                  <div style={{ display: "inline-block", marginLeft: "5px" }}>
                    <DeleteButton
                      windowIsLandscape={this.props.windowIsLandscape}
                      handleClick={this.nullFunction}
                    ></DeleteButton>
                  </div>
                </Popconfirm>
              </div>
            ))}
          </div>
        </Modal>
      </div>
    );
  }
}

export default Bank;
