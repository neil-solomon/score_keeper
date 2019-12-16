import React from "react";

class PlayerElement extends React.Component {
  state = {
    className1: "Bank_playerElement",
    className2: "Bank_playerElement",
    selected1: false,
    selected2: false
  };

  styleLandscape = {
    width: "175px",
    height: "75px",
    borderStyle: "solid",
    borderWidth: "2px",
    borderRadius: "10px",
    fontSize: "18px",
    cursor: "pointer"
  };

  stylePortrait = {
    width: "100px",
    height: "50px",
    borderStyle: "solid",
    borderWidth: "2px",
    borderRadius: "10px",
    fontSize: "14px",
    cursor: "pointer"
  };

  changeClassName1 = className => {
    if (
      !this.state.selected1 ||
      className.slice(0, 26) === "Bank_playerElementClickOff"
    ) {
      this.setState({ className1: className });
    }
  };
  changeClassName2 = className => {
    if (
      !this.state.selected2 ||
      className.slice(0, 26) === "Bank_playerElementClickOff"
    ) {
      this.setState({ className2: className });
    }
  };

  handleClick1 = () => {
    if (this.state.selected1) {
      if (window.innerWidth > window.innerHeight) {
        this.changeClassName1("Bank_playerElementClickOffLandscape");
      } else {
        this.changeClassName1("Bank_playerElementClickOffPortrait");
      }
    } else {
      if (window.innerWidth > window.innerHeight) {
        this.changeClassName1("Bank_playerElementClickOnLandscape");
      } else {
        this.changeClassName1("Bank_playerElementClickOffPortrait");
      }
    }
    this.props.toggleSelected(1, this.props.playerId);
    this.setState({ selected1: !this.state.selected1 });
  };
  handleClick2 = () => {
    if (this.state.selected2) {
      if (window.innerWidth > window.innerHeight) {
        this.changeClassName2("Bank_playerElementClickOffLandscape");
      } else {
        this.changeClassName2("Bank_playerElementClickOffPortrait");
      }
    } else {
      if (window.innerWidth > window.innerHeight) {
        this.changeClassName2("Bank_playerElementClickOnLandscape");
      } else {
        this.changeClassName2("Bank_playerElementClickOffPortrait");
      }
    }
    this.props.toggleSelected(2, this.props.playerId);
    this.setState({ selected2: !this.state.selected2 });
  };

  render() {
    var style;
    if (window.innerHeight > window.innerWidth) {
      style = this.stylePortrait;
    } else {
      style = this.styleLandscape;
    }

    return (
      <tr>
        <td>
          <div
            onMouseEnter={() =>
              this.changeClassName1("Bank_playerElementHoverIn")
            }
            onMouseLeave={() =>
              this.changeClassName1("Bank_playerElementHoverOut")
            }
            onClick={this.handleClick1}
            className={this.state.className1}
            style={style}
          >
            <div>{this.props.name}</div>
            <div>{this.props.money}</div>
          </div>
        </td>
        <td></td>
        <td>
          <div
            onMouseEnter={() =>
              this.changeClassName2("Bank_playerElementHoverIn")
            }
            onMouseLeave={() =>
              this.changeClassName2("Bank_playerElementHoverOut")
            }
            onClick={this.handleClick2}
            className={this.state.className2}
            style={style}
          >
            <div>{this.props.name}</div>
            <div>{this.props.money}</div>
          </div>
        </td>
      </tr>
    );
  }
}

export default PlayerElement;
