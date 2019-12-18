import React from "react";
import "./NavBar.css";
import { Drawer, Icon } from "antd";
import NavBarMenuItem from "./NavBarMenuItem.js";

class NavBar extends React.Component {
  state = {
    drawerVisible: false
  };

  toggleDrawerVisible = () => {
    this.setState({ drawerVisible: !this.state.drawerVisible });
  };

  render() {
    return (
      <div className="NavBar_navBar">
        <div className="NavBar_menuButton" onClick={this.toggleDrawerVisible}>
          <Icon type="menu"></Icon>
        </div>
        <div className="NavBar_appTitle">
          <a href="./#/Home">Game Night! </a>
        </div>
        <div className="NavBar_navBarLinkRightmost">
          <a href="https://www.linkedin.com/in/neil-solomon/" target="_blank">
            <Icon type="linkedin"></Icon>
          </a>
        </div>
        <div className="NavBar_navBarLink">
          <a href="https://github.com/neil-solomon/" target="_blank">
            <Icon type="github"></Icon>
          </a>
        </div>
        <div className="NavBar_drawer">
          <Drawer
            title=" "
            placement="left"
            closable={false}
            onClose={this.toggleDrawerVisible}
            visible={this.state.drawerVisible}
            bodyStyle={{}}
            headerStyle={{
              height: "51px",
              backgroundColor: "rgb(0, 200, 255,.75)",
              borderRadius: 0
            }}
          >
            <NavBarMenuItem
              closeDrawer={this.toggleDrawerVisible}
              name="Scoreboard"
              link="./#/Scoreboard"
            ></NavBarMenuItem>
            <NavBarMenuItem
              closeDrawer={this.toggleDrawerVisible}
              name="Dice Roller"
              link="./#/DiceRoller"
            ></NavBarMenuItem>
            <NavBarMenuItem
              closeDrawer={this.toggleDrawerVisible}
              name="Risk Dice Roller"
              link="./#/RiskDiceRoller"
            ></NavBarMenuItem>
            <NavBarMenuItem
              closeDrawer={this.toggleDrawerVisible}
              name="Tic-Tac-Grow"
              link="./#/TicTacGrow"
            ></NavBarMenuItem>
            <NavBarMenuItem
              closeDrawer={this.toggleDrawerVisible}
              name="Virtual Bank"
              link="./#/VirtualBank"
            ></NavBarMenuItem>
            <div
              style={{
                color: "rgb(0, 0, 0, 0.5)",
                fontSize: "12px",
                position: "absolute",
                bottom: 20
              }}
            >
              &copy;2019 Neil Solomon
            </div>
          </Drawer>
        </div>
      </div>
    );
  }
}

export default NavBar;
