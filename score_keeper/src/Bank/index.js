import React from "react";
import { Modal, Icon, Popconfirm, notification } from "antd";
import PlayerElement from "./PlayerElement.js";
import "./Bank.css";
import TransferArrow from "./TransferArrow.js";
import AddPlayerButton from "./AddPlayerButton.js";
import SaveButton from "./SaveButton.js";
import LoadButton from "./LoadButton.js";
import LoadBankButton from "./LoadBankButton";
import RemovePlayersButton from "./RemovePlayersButton.js";

class Bank extends React.Component {
  state = {
    addPlayerModalVisible: false,
    saveModalVisible: false,
    loadModalVisible: false,
    badNewPlayerName: false,
    players: [
      { name: "BANK", money: "$$$$", bank: true, selected: [false, false] }
    ],
    windowIsLandscape: true,
    savedBanks: {},
    savedBanksList: [],
    saveBankTitle: ""
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
    this.setState({ loadModalVisible: !this.state.loadModalVisible });
  };

  addPlayer = () => {
    var newPlayerName = document.getElementById("newPlayerName").value;
    if (newPlayerName === "") {
      this.setState({ badNewPlayerName: true });
      return;
    }
    var players = [...this.state.players];
    var newPlayerMoney = document.getElementById("newPlayerMoney").value;
    players.push({
      name: newPlayerName,
      money: newPlayerMoney,
      bank: false,
      selected: [false, false]
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
      players: this.state.players,
      dateModified: todaysDate
    };
    savedBanks[newBank.title] = newBank;
    var savedBanksList = [...this.state.savedBanksList];
    savedBanksList.push({
      title: newBank.title,
      dateModified: newBank.dateModified,
      selected: false
    });
    this.setState({ savedBanks });
    this.setState({ savedBanksList });
    localStorage.setItem("GameNight_savedBanks", JSON.stringify(savedBanks));
    this.toggleSaveModalVisible();
  };

  loadBank = () => {
    var newBank = "null";
    for (let i = 0; i < this.state.savedBanksList.length; ++i) {
      if (this.state.savedBanksList[i].selected) {
        newBank = this.state.savedBanksList[i].title;
      }
    }
    if (newBank !== "null") {
      this.setState({
        players: this.state.savedBanks[newBank].players
      });
    }
    var savedBanksList = [...this.state.savedBanksList];
    for (let i = 0; i < savedBanksList.length; ++i) {
      savedBanksList[i].selected = false;
    }
    this.setState({ savedBanksList });
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

  toggleRemovePlayers = () => {};

  render() {
    var badNewPlayerNameWarning;
    if (this.state.badNewPlayerName) {
      badNewPlayerNameWarning = (
        <div key={this.state.badNewPlayerName} className="Bank_modalWarning">
          Player name cannot be blank.
        </div>
      );
    } else {
      badNewPlayerNameWarning = <div className="Bank_modalWarning"></div>;
    }

    var saveBankWarning;
    if (
      typeof this.state.savedBanks[this.state.saveBankTitle] === "undefined"
    ) {
      saveBankWarning = <div className="Bank_modalWarning"></div>;
    } else {
      saveBankWarning = (
        <div key={this.state.saveBankTitle} className="Bank_modalWarning">
          WARNING: This bank title already exists. Saving now will overwrite.
        </div>
      );
    }

    return (
      <div className="mainContainer">
        <h1 className="pageHeader">Bank</h1>
        <div className="Bank_menuButtons">
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
        <table align="center" className="Bank_table">
          <thead>
            <tr>
              <th>FROM</th>
              <th className="Bank_middleTableHeader">
                <TransferArrow
                  windowIsLandscape={this.state.windowIsLandscape}
                ></TransferArrow>
              </th>
              <th>TO</th>
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
      </div>
    );
  }
}

export default Bank;
