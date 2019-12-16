import React from "react";

class LoadButton extends React.Component {
  state = {
    hover: false
  };

  styles1 = {
    fontSize: "18px",
    display: "inline-block",
    background: "rgb(255,255,255,1)",
    color: "rgb(0,0,0,.75)",
    border: "2px solid rgb(0,200,255,.5)",
    width: "250px",
    margin: "1px",
    cursor: "pointer"
  };

  styles2 = {
    fontSize: "18px",
    display: "inline-block",
    background: "rgb(255,255,255,1)",
    color: "rgb(0,100,255,.75)",
    border: "2px solid rgb(0,200,255,.75)",
    width: "250px",
    margin: "1px",
    cursor: "pointer"
  };

  styles3 = {
    fontSize: "18px",
    display: "inline-block",
    background: "rgb(0,200,255,.25)",
    color: "rgb(0,100,255,.75)",
    border: "2px solid rgb(0,200,255,1)",
    width: "250px",
    margin: "1px",
    cursor: "pointer"
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
      <div
        style={styles}
        onMouseEnter={() => this.toggleHover()}
        onMouseLeave={() => this.toggleHover()}
        onClick={() => this.props.onClick(this.props.id)}
      >
        <strong>{this.props.name}</strong>
        <br></br>
        {this.props.dateModified}
      </div>
    );
  }
}

export default LoadButton;
