import React from "react";
import { Icon } from "antd";
import "./VirtualBank.css";

class AddPlayerButton extends React.Component {
  state = { className: "VirtualBank_addPlayerButton" };

  changeClassName = className => {
    this.setState({ className: className });
  };

  handleClick = () => {
    this.props.toggleModalVisible();
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
          type="user-add"
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

export default AddPlayerButton;
