import React from "react";
import { Icon } from "antd";
import "./VirtualBank.css";

class RemovePlayersButton extends React.Component {
  state = { className: "VirtualBank_addPlayerButton" };

  changeClassName = className => {
    if (!this.props.windowIsLandscape) {
      return;
    }
    this.setState({ className: className });
  };

  handleClick = () => {
    this.props.toggleRemovePlayers();
  };

  render() {
    var fontSize, margin;
    if (this.props.windowIsLandscape) {
      fontSize = "40px";
      margin = "50px";
    } else {
      fontSize = "30px";
      margin = "20px";
    }

    return (
      <div
        style={{
          fontSize: fontSize,
          marginLeft: margin,
          marginRight: margin,
          display: "inline-block"
        }}
        className={this.state.className}
      >
        <Icon
          type="usergroup-delete"
          onMouseEnter={() =>
            this.changeClassName("VirtualBank_addPlayerButtonHoverIn")
          }
          onMouseLeave={() =>
            this.changeClassName("VirtualBank_addPlayerButtonHoverOut")
          }
          onClick={this.handleClick}
        ></Icon>
      </div>
    );
  }
}

export default RemovePlayersButton;
