import React from "react";
import { Icon } from "antd";
import "./VirtualBank.css";

class DeleteButton extends React.Component {
  state = { className: "VirtualBank_deleteButton" };

  changeClassName = className => {
    if (!this.props.windowIsLandscape) {
      return;
    }
    this.setState({ className: className });
  };

  render() {
    var fontSize;
    if (this.props.windowIsLandscape) {
      fontSize = "30px";
    } else {
      fontSize = "15px";
    }

    return (
      <div style={{ fontSize: fontSize }} className={this.state.className}>
        <Icon
          type="close-circle"
          onMouseEnter={() =>
            this.changeClassName("VirtualBank_deleteButtonHoverIn")
          }
          onMouseLeave={() =>
            this.changeClassName("VirtualBank_deleteButtonHoverOut")
          }
          onClick={this.props.handleClick}
        ></Icon>
      </div>
    );
  }
}

export default DeleteButton;
