import React from "react";
import { Icon } from "antd";
import PointsElement from "./PointsElement.js";
import PlayerElement from "./PlayerElement.js";

class RoundElement extends React.Component {
  roundCellStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    border: "1px solid black"
  };

  render() {
    var deleteRound;
    if (this.props.deleteRoundsActivated) {
      deleteRound = (
        <div
          style={{ height: "20px", width: "10px", display: "inline-block" }}
          className="Scoreboard_fadeIn"
          key={"deleteRound" + this.props.playerIndex}
        >
          <Icon
            type="close-circle"
            theme="twoTone"
            twoToneColor="rgb(255,0,0)"
            style={{ fontSize: "8px" }}
            onClick={() => this.props.removeRound(this.props.roundNumber)}
          ></Icon>
        </div>
      );
    } else {
      deleteRound = (
        <div
          style={{ height: "20px", width: "10px", display: "inline-block" }}
        ></div>
      );
    }

    return (
      <tr>
        <td style={this.roundCellStyle}>
          {deleteRound}
          {this.props.roundNumber + 1}
        </td>
        {this.props.roundPoints.map((playerPoints, index) => (
          <PointsElement
            key={"roundCell " + this.props.roundNumber + index}
            points={playerPoints}
            pointsIndex={[this.props.roundNumber, index]}
            updatePoints={this.props.updatePoints}
          ></PointsElement>
        ))}
      </tr>
    );
  }
}

export default RoundElement;
