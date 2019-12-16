import React from "react";
import { Icon, Tooltip } from "antd";

class ManageScoreboardButtton extends React.Component {
  state = { hover: false };

  style = {
    fontSize: "20px",
    color: "rgb(0,0,0)"
  };

  hoverStyle = {
    fontSize: "20px",
    color: "rgb(0,100,255)"
  };

  toggleHover = () => {
    this.setState({ hover: !this.state.hover });
  };

  render() {
    var style;
    if (this.state.hover || this.props.activated) {
      style = this.hoverStyle;
    } else {
      style = this.style;
    }
    return (
      <div>
        <Tooltip
          title={this.props.description}
          mouseEnterDelay={3}
          placement="right"
        >
          <Icon
            style={style}
            type={this.props.type}
            onMouseEnter={this.toggleHover}
            onMouseLeave={this.toggleHover}
            onClick={this.props.handleClick}
          ></Icon>
        </Tooltip>
      </div>
    );
  }
}

export default ManageScoreboardButtton;
