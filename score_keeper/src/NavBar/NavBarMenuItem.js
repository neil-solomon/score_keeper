import React from "react";

class NavBarMenuItem extends React.Component {
  state = { hover: false };
  toggleHover = () => {
    this.setState({ hover: !this.state.hover });
  };
  render() {
    var className = "";
    if (this.state.hover) {
      className = "NavBar_menuItemHover";
    } else {
      className = "NavBar_menuItem";
    }
    return (
      <div
        className={className}
        onMouseEnter={this.toggleHover}
        onMouseLeave={this.toggleHover}
        onClick={this.props.closeDrawer}
      >
        <a href={this.props.link}>{this.props.name}</a>
      </div>
    );
  }
}

export default NavBarMenuItem;
