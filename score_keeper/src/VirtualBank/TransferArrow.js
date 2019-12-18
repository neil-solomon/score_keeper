import React from "react";
import { Icon } from "antd";
import "./VirtualBank.css";

class TransferArrow extends React.Component {
  state = { className: "VirtualBank_transferArrow" };

  changeClassName = className => {
    if (!this.props.windowIsLandscape) {
      return;
    }
    this.setState({ className: className });
  };

  handleClick = () => {
    if (!this.props.transferEnabled) {
      return;
    }
    this.props.handleClick();
  };

  render() {
    var fontSize, inputStyle;
    if (this.props.windowIsLandscape) {
      fontSize = "35px";
      inputStyle = {
        fontWeight: "bold",
        border: "1px solid black",
        borderRadius: "3px",
        boxShadow: "0px 1px 5px rgb(0,0,0,.5)",
        fontSize: "20px",
        width: "100px",
        marginRight: "10px",
        outline: "none"
      };
    } else {
      fontSize = "25px";
      inputStyle = {
        fontWeight: "bold",
        border: "1px solid black",
        borderRadius: "3px",
        boxShadow: "0px .5px 5px rgb(0,0,0,.5)",
        fontSize: "16px",
        width: "75px",
        marginRight: "5px",
        outline: "none"
      };
    }

    var opacity;
    if (!this.props.transferEnabled) {
      opacity = 0.5;
    } else {
      opacity = 1;
    }

    return (
      <div>
        <input
          id="transferAmount"
          type="number"
          style={inputStyle}
          placeholder="$$$$$"
        ></input>
        <div
          style={{
            fontSize: fontSize,
            opacity: opacity,
            display: "inline-block"
          }}
          className={this.state.className}
        >
          <Icon
            type="arrow-right"
            onMouseEnter={() =>
              this.changeClassName("VirtualBank_transferArrowHoverIn")
            }
            onMouseLeave={() =>
              this.changeClassName("VirtualBank_transferArrowHoverOut")
            }
            onClick={this.handleClick}
          ></Icon>
        </div>
      </div>
    );
  }
}

export default TransferArrow;
