import React from "react";
import { Popconfirm, Icon } from "antd";

class PlayerElement extends React.Component {
  state = { nameInputFocus: false };

  cellStyle = {
    backgroundColor: this.props.backgroundColor,
    border: "1px solid black",
    width: (40 / parseInt(this.props.numPlayers)).toString() + "vw",
    height: "80px"
  };

  inputStyle = {
    width: (40 / parseInt(this.props.numPlayers)).toString() + "vw",
    height: "20px"
  };

  nameStyle = { height: "20px", textAlign: "center", cursor: "pointer" };

  toggleNameInputFocus = () => {
    console.log("toggleNameInputFocus");
    this.setState({ nameInputFocus: !this.state.nameInputFocus });
  };

  updatePlayerName = () => {
    var newName = document.getElementById(this.props.player + "nameInput")
      .value;
    if (newName === "") {
      this.toggleNameInputFocus();
      return;
    }
    this.props.changePlayerName(newName, this.props.playerIndex);
    this.toggleNameInputFocus();
  };

  render() {
    var nameInput;
    if (this.state.nameInputFocus) {
      nameInput = (
        <div>
          <input
            id={this.props.player + "nameInput"}
            type="text"
            placeholder={this.props.playerName}
            onBlur={this.updatePlayerName}
            style={this.inputStyle}
            autoFocus
          ></input>
        </div>
      );
    } else {
      nameInput = (
        <div style={this.nameStyle} onClick={this.toggleNameInputFocus}>
          {this.props.playerName}
        </div>
      );
    }

    var deleteUser;
    if (this.props.deleteUsersActivated) {
      deleteUser = (
        <div
          style={{ height: "20px" }}
          className="Scoreboard_fadeIn"
          key={"deleteUser" + this.props.playerIndex}
        >
          <Icon
            type="close-circle"
            theme="twoTone"
            twoToneColor="rgb(255,0,0)"
            style={{ fontSize: "15px" }}
            onClick={() => this.props.removePlayer(this.props.playerIndex)}
          ></Icon>
        </div>
      );
    } else {
      deleteUser = <div style={{ height: "20px" }}></div>;
    }

    return (
      <th style={this.cellStyle}>
        {nameInput}
        <div style={{ fontSize: "20px" }}>{this.props.icon}</div>
        <div style={{ fontSize: "18px" }}>{this.props.totalPoints}</div>
        {deleteUser}
      </th>
    );
  }
}

export default PlayerElement;
