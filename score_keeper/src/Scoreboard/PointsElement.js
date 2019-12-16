import React from "react";

class PointsElement extends React.Component {
  state = { pointsInputFocus: false };

  togglePointsInputFocus = () => {
    this.setState({ pointsInputFocus: !this.state.pointsInputFocus });
  };

  updatePoints = () => {
    console.log("PointsElement_updatePoints");
    this.togglePointsInputFocus();
    var newPoints = parseInt(
      document.getElementById(this.props.player + "pointsInput").value
    );
    if (isNaN(newPoints)) {
      return;
    }
    this.props.updatePoints(this.props.pointsIndex, newPoints);
  };

  render() {
    var pointsInput;
    if (this.state.pointsInputFocus) {
      pointsInput = (
        <div>
          <input
            id={this.props.player + "pointsInput"}
            type="text"
            placeholder={this.props.points}
            onBlur={this.updatePoints}
            style={{
              fontSize: "15px",
              textAlign: "center",
              height: "20px",
              width: "40px"
            }}
            autoFocus
          ></input>
        </div>
      );
    } else {
      pointsInput = (
        <div
          style={{
            fontSize: "15px",
            textAlign: "center",
            height: "20px",
            cursor: "pointer"
          }}
          onClick={this.togglePointsInputFocus}
        >
          {this.props.points}
        </div>
      );
    }
    return <td style={{ border: "1px solid black" }}>{pointsInput}</td>;
  }
}

export default PointsElement;
