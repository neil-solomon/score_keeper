import React from "react";

class LoadBankButton extends React.Component {
  state = {
    className: "VirtualBank_loadBankButton",
    hover: false
  };

  styleLandscape = {
    display: "inline-block",
    width: "200px",
    height: "75px",
    marginBottom: "10px",
    borderStyle: "solid",
    borderWidth: "2px",
    borderRadius: "10px",
    fontSize: "18px",
    fontWeight: "normal",
    padding: "10px",
    cursor: "pointer"
  };

  stylePortrait = {
    display: "inline-block",
    width: "150px",
    height: "50px",
    marginBottom: "5px",
    borderStyle: "solid",
    borderWidth: "2px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "normal",
    padding: "5px",
    cursor: "pointer"
  };

  componentDidUpdate(prevProps) {
    if (prevProps.selected && !this.props.selected && !this.state.hover) {
      this.setState({ className: "VirtualBank_loadBankButtonClickOffNoHover" });
    }
  }

  handleHoverIn = () => {
    if (this.props.windowIsLandscape && !this.props.selected) {
      this.setState({ className: "VirtualBank_loadBankButtonHoverIn" });
    }
    this.setState({ hover: true });
  };

  handleHoverOut = () => {
    if (this.props.windowIsLandscape && !this.props.selected) {
      this.setState({ className: "VirtualBank_loadBankButtonHoverOut" });
    }
    this.setState({ hover: false });
  };

  handleClick = () => {
    if (this.props.selected) {
      if (this.props.windowIsLandscape) {
        this.setState({
          className: "VirtualBank_loadBankButtonClickOffLandscape"
        });
      } else {
        this.setState({
          className: "VirtualBank_loadBankButtonClickOffPortrait"
        });
      }
    } else {
      if (this.props.windowIsLandscape) {
        this.setState({
          className: "VirtualBank_loadBankButtonClickOnLandscape"
        });
      } else {
        this.setState({
          className: "VirtualBank_loadBankButtonClickOnPortrait"
        });
      }
    }
    this.props.onClick(this.props.id);
  };

  render() {
    var style;
    if (this.props.windowIsLandscape) {
      style = this.styleLandscape;
    } else {
      style = this.stylePortrait;
    }

    return (
      <div
        style={style}
        className={this.state.className}
        onMouseEnter={this.handleHoverIn}
        onMouseLeave={this.handleHoverOut}
        onClick={this.handleClick}
      >
        <strong>{this.props.name}</strong>
        <br></br>
        {this.props.dateModified}
      </div>
    );
  }
}

export default LoadBankButton;
