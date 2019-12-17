import React from "react";
import { Icon } from "antd";
import "./Bank.css";

class TransferArrow extends React.Component {
  state = { className: "Bank_transferArrow" };

  changeClassName = className => {
    this.setState({ className: className });
  };

  handleClick = () => {
    this.changeClassName("Bank_transferArrowClicked");
  };

  render() {
    var fontSize;
    if (this.props.windowIsLandscape) {
      fontSize = "35px";
    } else {
      fontSize = "25px";
    }

    return (
      <div style={{ fontSize: fontSize }} className={this.state.className}>
        <Icon
          type="arrow-right"
          onMouseEnter={() => this.changeClassName("Bank_transferArrowHoverIn")}
          onMouseLeave={() =>
            this.changeClassName("Bank_transferArrowHoverOut")
          }
          onClick={this.handleClick}
        ></Icon>
      </div>
    );
  }
}

export default TransferArrow;
