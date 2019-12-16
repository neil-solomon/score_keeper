import React from "react";
import { Modal } from "antd";
import PlayerElement from "./PlayerElement.js";
import "./Bank.css";
import TransferArrow from "./TransferArrow.js";
import AddPlayerButton from "./AddPlayerButton.js";

class Bank extends React.Component {
  state = {
    addPlayerModalVisible: false,
    badNewPlayerName: false,
    players: [
      { name: "BANK", money: "$$$$", bank: true, selected: [false, false] }
    ]
  };

  toggleSelected = (fromTo, playerId) => {
    var players = [...this.state.players];
    players[playerId].selected[fromTo - 1] = !this.state.players[playerId]
      .selected[fromTo - 1];
    this.setState({ players });
  };

  toggleAddPlayerModalVisible = () => {
    this.setState({ badNewPlayerName: false });
    this.setState({ addPlayerModalVisible: !this.state.addPlayerModalVisible });
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

  render() {
    var badNewPlayerNameWarning;
    if (this.state.badNewPlayerName) {
      badNewPlayerNameWarning = (
        <div
          style={{
            height: "35px",
            fontSize: "14px",
            fontWeight: "normal"
          }}
        >
          Player name cannot be blank.
        </div>
      );
    } else {
      badNewPlayerNameWarning = (
        <div
          style={{
            height: "35px",
            fontSize: "14px",
            fontWeight: "normal"
          }}
        ></div>
      );
    }

    return (
      <div className="mainContainer">
        <h1 className="pageHeader">Bank</h1>
        <div style={{ fontSize: "30px" }}>
          <AddPlayerButton
            toggleAddPlayerModalVisible={this.toggleAddPlayerModalVisible}
          ></AddPlayerButton>
        </div>
        <table align="center">
          <thead>
            <tr>
              <th>FROM</th>
              <th className="Bank_middleTableHeader">
                <TransferArrow></TransferArrow>
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
                toggleSelected={this.toggleSelected}
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
      </div>
    );
  }
}

export default Bank;
