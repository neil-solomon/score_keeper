import React from "react";
import { Button } from "antd";

class LoadButton extends React.Component {
  state = {
    hover: false
  };

  styles1 = {
    background: "rgb(255,255,255,1)",
    color: "rgb(0,0,0,.60)",
    border: "2px solid rgb(66,78,191,.25)",
    margin: "1px",
    width: "20vw",
    height: "4vw",
    fontSize: "1vw",
    fontWeight: "bold"
  };

  styles2 = {
    background: "rgb(255,255,255,1)",
    color: "rgb(66,78,191,.9)",
    border: "2px solid rgb(66,78,191,.5)",
    margin: "1px",
    width: "20vw",
    height: "4vw",
    fontSize: "1vw",
    fontWeight: "bold"
  };

  styles3 = {
    background: "rgb(66,78,191,.1)",
    color: "rgb(66,78,191,.9)",
    border: "2px solid rgb(66,78,191,.5)",
    margin: "1px",
    width: "20vw",
    height: "4vw",
    fontSize: "1vw",
    fontWeight: "bold"
  };

  toggleHover = () => {
    this.setState({ hover: !this.state.hover });
    //console.log("hover");
  };

  render() {
    var styles = this.styles1;
    if (this.state.hover && !this.props.activated) {
      styles = this.styles2;
    } else if (this.props.activated) {
      styles = this.styles3;
    }

    return (
      <div style={this.divStyle}>
        <Button
          style={styles}
          size="large"
          type="primary"
          onMouseEnter={() => this.toggleHover()}
          onMouseLeave={() => this.toggleHover()}
          onClick={() => this.props.onClick(this.props.id)}
        >
          {this.props.name}
          <br></br>
          {this.props.dateModified}
        </Button>
      </div>
    );
  }
}

export default LoadButton;
