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
    marginBottom: "25px",
    borderStyle: "solid",
    borderWidth: "2px",
    borderRadius: "10px",
    fontSize: "18px",
    cursor: "pointer"
  };

  stylePortrait = {
    width: "100px",
    height: "50px",
    marginBottom: "10px",
    borderStyle: "solid",
    borderWidth: "2px",
    borderRadius: "10px",
    fontSize: "14px",
    cursor: "pointer"
  };

  handleHoverIn1 = () => {
    if (this.props.windowIsLandscape && !this.props.selected[0]) {
      this.setState({ className1: "Bank_playerElementHoverIn" });
    }
  };
  handleHoverIn2 = () => {
    if (this.props.windowIsLandscape && !this.props.selected[1]) {
      this.setState({ className2: "Bank_playerElementHoverIn" });
    }
  };
  handleHoverOut1 = () => {
    if (this.props.windowIsLandscape && !this.props.selected[0]) {
      this.setState({ className1: "Bank_playerElementHoverOut" });
    }
  };
  handleHoverOut2 = () => {
    if (this.props.windowIsLandscape && !this.props.selected[1]) {
      this.setState({ className2: "Bank_playerElementHoverOut" });
    }
  };

  handleClick1 = () => {
    if (this.state.selected1) {
      if (this.props.windowIsLandscape) {
        this.setState({ className1: "Bank_playerElementClickOffLandscape" });
      } else {
        this.setState({ className1: "Bank_playerElementClickOffPortrait" });
      }
    } else {
      if (this.props.windowIsLandscape) {
        this.setState({ className1: "Bank_playerElementClickOnLandscape" });
      } else {
        this.setState({ className1: "Bank_playerElementClickOnPortrait" });
      }
    }
    this.props.toggleSelected(1, this.props.playerId);
    this.setState({ selected1: !this.state.selected1 });
  };
  handleClick2 = () => {
    if (this.state.selected2) {
      if (this.props.windowIsLandscape) {
        this.setState({ className2: "Bank_playerElementClickOffLandscape" });
      } else {
        this.setState({ className2: "Bank_playerElementClickOffPortrait" });
      }
    } else {
      if (this.props.windowIsLandscape) {
        this.setState({ className2: "Bank_playerElementClickOnLandscape" });
      } else {
        this.setState({ className2: "Bank_playerElementClickOnPortrait" });
      }
    }
    this.props.toggleSelected(2, this.props.playerId);
    this.setState({ selected2: !this.state.selected2 });
  };

  render() {
    var style;
    if (this.props.windowIsLandscape) {
      style = this.styleLandscape;
    } else {
      style = this.stylePortrait;
    }

    return (
      <tr>
        <td>
          <div
            onMouseEnter={this.handleHoverIn1}
            onMouseLeave={this.handleHoverOut1}
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
            onMouseEnter={this.handleHoverIn2}
            onMouseLeave={this.handleHoverOut2}
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
