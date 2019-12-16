import React from "react";
import { Icon } from "antd";
import "./Bank.css";

class AddPlayerButton extends React.Component {
  state = { className: "Bank_addPlayerButton" };

  changeClassName = className => {
    this.setState({ className: className });
  };

  handleClick = () => {
    this.changeClassName("Bank_addPlayerButtonClicked");
    this.props.toggleAddPlayerModalVisible();
  };

  render() {
    return (
      <div style={{ fontSize: "35px" }} className={this.state.className}>
        <Icon
          type="user-add"
          onMouseEnter={() =>
            this.changeClassName("Bank_addPlayerButtonHoverIn")
          }
          onMouseLeave={() =>
            this.changeClassName("Bank_addPlayerButtonHoverOut")
          }
          onClick={this.handleClick}
        ></Icon>
      </div>
    );
  }
}

export default AddPlayerButton;
