import React from "react";
import { Button, Icon } from "antd";
import "./TicTacGrow.css";

class TicTacGrow extends React.Component {
  state = {
    player1Turn: true,
    grid: [],
    candidateCells: [],
    boardReset: false,
    randomClicksInterval: "",
    numToWin: 4,
    gridSize: 11,
    maxGridSize: 31,
    someoneWon: false,
    cellExistsStyle: {
      fontSize: "2vh",
      height: "4vh",
      width: "4vh"
    }
  };

  buttonStyle = {
    textAlign: "center",
    fontSize: "18px",
    height: "36px",
    width: "140px"
  };

  iconStyle = {
    fontSize: "18px",
    margin: "3px",
    color: "rgb(0,150,255,.75)"
  };

  componentDidMount() {
    this.initializeBoard(this.state.numToWin, this.state.gridSize);
  }

  initializeBoard = (newNumToWin, newGridSize) => {
    var numToWin = newNumToWin;
    var gridSize = newGridSize;
    var midGrid = Math.floor(gridSize / 2);
    var grid = [];
    var cellExistsStyle = {};
    if (window.innerHeight > window.innerWidth) {
      //portrait
      cellExistsStyle.width = (100 / gridSize).toString() + "vw";
      cellExistsStyle.height = cellExistsStyle.width;
      cellExistsStyle.fontSize = (100 / (gridSize * 2)).toString() + "vw";
    } else {
      //landscape
      cellExistsStyle.width = (80 / gridSize).toString() + "vh";
      cellExistsStyle.height = cellExistsStyle.width;
      cellExistsStyle.fontSize = (80 / (gridSize * 2)).toString() + "vh";
    }

    for (let i = 0; i < gridSize; ++i) {
      var row = [];
      for (let j = 0; j < gridSize; ++j) {
        if (
          i >= midGrid - 1 &&
          i <= midGrid + 1 &&
          j >= midGrid - 1 &&
          j <= midGrid + 1
        ) {
          row.push({
            exists: true,
            player1: false,
            player2: false,
            style: cellExistsStyle,
            className: "TicTacGrow_cellExists",
            text: ""
          });
        } else {
          row.push({
            exists: false,
            player1: false,
            player2: false,
            style: {},
            className: "TicTacGrow_cellEmpty",
            text: ""
          });
        }
      }
      grid.push(row);
    }

    var candidateCells = [
      [midGrid - 1, midGrid - 2],
      [midGrid, midGrid - 2],
      [midGrid + 1, midGrid - 2],
      [midGrid + 2, midGrid - 1],
      [midGrid + 2, midGrid],
      [midGrid + 2, midGrid + 1],
      [midGrid + 1, midGrid + 2],
      [midGrid, midGrid + 2],
      [midGrid - 1, midGrid + 2],
      [midGrid - 2, midGrid + 1],
      [midGrid - 2, midGrid],
      [midGrid - 2, midGrid - 1]
    ];

    clearInterval(this.state.randomClicksInterval);
    this.setState({ cellExistsStyle });
    this.setState({ player1Turn: true });
    this.setState({ numToWin });
    this.setState({ gridSize });
    this.setState({ someoneWon: false });
    this.setState({ randomClicksInterval: "" });
    this.setState({ grid });
    this.setState({ candidateCells });
    this.setState({ boardReset: !this.state.boardReset });
  };

  componentWillUnmount() {
    clearInterval(this.state.randomClicksInterval);
  }

  addCell = () => {
    if (this.state.numToWin === 3 && this.state.gridSize === 3) {
      return;
    }
    var candidateCells = [...this.state.candidateCells];
    if (candidateCells.length < 1) return;
    var random = Math.round(Math.random() * 1000000) % candidateCells.length;
    var newCell = candidateCells[random];
    var grid = [...this.state.grid];
    grid[newCell[0]][newCell[1]].className = "TicTacGrow_cellExists";
    grid[newCell[0]][newCell[1]].style = this.state.cellExistsStyle;
    grid[newCell[0]][newCell[1]].exists = true;

    candidateCells.splice(random, 1);
    var newCandidates = [
      [newCell[0] - 1, newCell[1]],
      [newCell[0], newCell[1] - 1],
      [newCell[0] + 1, newCell[1]],
      [newCell[0], newCell[1] + 1]
    ];
    for (let i = 0; i < newCandidates.length; ++i) {
      if (
        newCandidates[i][0] >= 0 &&
        newCandidates[i][0] < grid.length &&
        newCandidates[i][1] >= 0 &&
        newCandidates[i][1] < grid.length
      ) {
        if (
          !grid[newCandidates[i][0]][newCandidates[i][1]].exists &&
          !this.hasArray(candidateCells, newCandidates[i])
        ) {
          candidateCells.push(newCandidates[i]);
        }
      }
    }

    this.setState({ grid });
    this.setState({ candidateCells });
  };

  hasArray = (searchArray, findArray) => {
    for (let i = 0; i < searchArray.length; ++i) {
      if (
        searchArray[i][0] === findArray[0] &&
        searchArray[i][1] === findArray[1]
      ) {
        return true;
      }
    }
    return false;
  };

  cellClick = (row, column) => {
    if (this.state.someoneWon) {
      return;
    }
    var grid = [...this.state.grid];
    if (
      !grid[row][column].exists ||
      grid[row][column].player1 ||
      grid[row][column].player2
    ) {
      return;
    }
    if (this.state.player1Turn) {
      grid[row][column].player1 = true;
      grid[row][column].text = "X";
    } else {
      grid[row][column].player2 = true;
      grid[row][column].text = "O";
    }
    this.checkForWinner(grid);
    this.setState({ grid });
    this.setState({ player1Turn: !this.state.player1Turn });
    this.addCell();
  };

  startRandomClicks = () => {
    if (this.state.randomClicksInterval === "") {
      var randomClicksInterval = setInterval(() => this.randomClicks(), 100);
      this.setState({ randomClicksInterval });
    }
  };

  randomClicks = () => {
    var candidateCells = [];
    for (let i = 0; i < this.state.grid.length; ++i) {
      for (let j = 0; j < this.state.grid.length; ++j) {
        if (
          this.state.grid[i][j].exists &&
          !this.state.grid[i][j].player1 &&
          !this.state.grid[i][j].player2
        ) {
          candidateCells.push([i, j]);
        }
      }
    }
    if (candidateCells.length < 1) {
      clearInterval(this.state.randomClicksInterval);
      this.setState({ randomClicksInterval: "" });
      return;
    }
    var random = Math.round(Math.random() * 1000000) % candidateCells.length;
    var newCell = candidateCells[random];
    this.cellClick(newCell[0], newCell[1]);
  };

  changeNumToWin = value => {
    if (value) {
      if (this.state.numToWin + 1 > this.state.gridSize) {
        return;
      } else {
        this.initializeBoard(this.state.numToWin + 1, this.state.gridSize);
      }
    } else {
      if (this.state.numToWin - 1 < 2) {
        return;
      } else {
        this.initializeBoard(this.state.numToWin - 1, this.state.gridSize);
      }
    }
  };

  changeGridSize = value => {
    if (value) {
      if (this.state.gridSize + 2 > this.state.maxGridSize) {
        return;
      } else {
        this.initializeBoard(this.state.numToWin, this.state.gridSize + 2);
      }
    } else {
      if (this.state.gridSize - 2 < this.state.numToWin) {
        return;
      } else {
        this.initializeBoard(this.state.numToWin, this.state.gridSize - 2);
      }
    }
  };

  checkForWinner = newGrid => {
    var grid = newGrid,
      winner,
      rowWinner = false,
      colWinner = false,
      diagUpWinner = false,
      diagDownWinner = false,
      winnerStartIx = [];

    for (let i = 0; i < grid.length && !rowWinner; ++i) {
      for (
        let j = 0;
        j < grid.length - this.state.numToWin + 1 && !rowWinner;
        ++j
      ) {
        if (grid[i][j].exists) {
          if (grid[i][j].player1) {
            winner = true;
            for (let k = 1; k < this.state.numToWin && winner; ++k) {
              if (!grid[i][j + k].player1) {
                winner = false;
              }
            }
            if (winner) {
              rowWinner = true;
              winnerStartIx = [i, j];
            }
          } else if (grid[i][j].player2) {
            winner = true;
            for (let k = 1; k < this.state.numToWin && winner; ++k) {
              if (!grid[i][j + k].player2) {
                winner = false;
              }
            }
            if (winner) {
              rowWinner = true;
              winnerStartIx = [i, j];
            }
          }
        }
      }
    }
    if (rowWinner) {
      for (let i = 0; i < this.state.numToWin; ++i) {
        grid[winnerStartIx[0]][winnerStartIx[1] + i].className =
          "TicTacGrow_cellWinner";
        grid[winnerStartIx[0]][
          winnerStartIx[1] + i
        ].style = this.state.cellExistsStyle;
      }
      this.setState({ grid });
      this.setState({ someoneWon: true });
      clearInterval(this.state.randomClicksInterval);
      return;
    }

    for (let i = 0; i < grid.length && !colWinner; ++i) {
      for (
        let j = 0;
        j < grid.length - this.state.numToWin + 1 && !colWinner;
        ++j
      ) {
        if (grid[j][i].exists) {
          if (grid[j][i].player1) {
            winner = true;
            for (let k = 1; k < this.state.numToWin && winner; ++k) {
              if (!grid[j + k][i].player1) {
                winner = false;
              }
            }
            if (winner) {
              colWinner = true;
              winnerStartIx = [j, i];
            }
          } else if (grid[j][i].player2) {
            winner = true;
            for (let k = 1; k < this.state.numToWin && winner; ++k) {
              if (!grid[j + k][i].player2) {
                winner = false;
              }
            }
            if (winner) {
              colWinner = true;
              winnerStartIx = [j, i];
            }
          }
        }
      }
    }
    if (colWinner) {
      for (let i = 0; i < this.state.numToWin; ++i) {
        grid[winnerStartIx[0] + i][winnerStartIx[1]].className =
          "TicTacGrow_cellWinner";
        grid[winnerStartIx[0] + i][
          winnerStartIx[1]
        ].style = this.state.cellExistsStyle;
      }
      this.setState({ grid });
      this.setState({ someoneWon: true });
      clearInterval(this.state.randomClicksInterval);
      return;
    }

    for (
      let i = this.state.numToWin - 1;
      i < grid.length && !diagUpWinner;
      ++i
    ) {
      for (
        let j = 0;
        j < grid.length - this.state.numToWin + 1 && !diagUpWinner;
        ++j
      ) {
        if (grid[i][j].exists) {
          if (grid[i][j].player1) {
            winner = true;
            for (let k = 1; k < this.state.numToWin && winner; ++k) {
              if (!grid[i - k][j + k].player1) {
                winner = false;
              }
            }
            if (winner) {
              diagUpWinner = true;
              winnerStartIx = [i, j];
            }
          } else if (grid[i][j].player2) {
            winner = true;
            for (let k = 1; k < this.state.numToWin && winner; ++k) {
              if (!grid[i - k][j + k].player2) {
                winner = false;
              }
            }
            if (winner) {
              diagUpWinner = true;
              winnerStartIx = [i, j];
            }
          }
        }
      }
    }
    if (diagUpWinner) {
      for (let i = 0; i < this.state.numToWin; ++i) {
        grid[winnerStartIx[0] - i][winnerStartIx[1] + i].className =
          "TicTacGrow_cellWinner";
        grid[winnerStartIx[0] - i][
          winnerStartIx[1] + i
        ].style = this.state.cellExistsStyle;
      }
      this.setState({ grid });
      this.setState({ someoneWon: true });
      clearInterval(this.state.randomClicksInterval);
      return;
    }

    for (
      let i = 0;
      i < grid.length - this.state.numToWin + 1 && !diagDownWinner;
      ++i
    ) {
      for (
        let j = 0;
        j < grid.length - this.state.numToWin + 1 && !diagDownWinner;
        ++j
      ) {
        if (grid[i][j].exists) {
          if (grid[i][j].player1) {
            winner = true;
            for (let k = 1; k < this.state.numToWin && winner; ++k) {
              if (!grid[i + k][j + k].player1) {
                winner = false;
              }
            }
            if (winner) {
              diagDownWinner = true;
              winnerStartIx = [i, j];
            }
          } else if (grid[i][j].player2) {
            winner = true;
            for (let k = 1; k < this.state.numToWin && winner; ++k) {
              if (!grid[i + k][j + k].player2) {
                winner = false;
              }
            }
            if (winner) {
              diagDownWinner = true;
              winnerStartIx = [i, j];
            }
          }
        }
      }
    }
    if (diagDownWinner) {
      for (let i = 0; i < this.state.numToWin; ++i) {
        grid[winnerStartIx[0] + i][winnerStartIx[1] + i].className =
          "TicTacGrow_cellWinner";
        grid[winnerStartIx[0] + i][
          winnerStartIx[1] + i
        ].style = this.state.cellExistsStyle;
      }
      this.setState({ grid });
      this.setState({ someoneWon: true });
      clearInterval(this.state.randomClicksInterval);
      return;
    }
  };

  render() {
    if (window.innerHeight > window.innerWidth) {
      console.log("Portrait!");
    } else {
      console.log("Landscape!");
    }

    var boardMessage;
    if (this.state.player1Turn) {
      if (this.state.someoneWon) {
        boardMessage = (
          <div className="TicTacGrow_turn">Player&nbsp;2&nbsp;Wins!!!</div>
        );
      } else {
        boardMessage = (
          <div className="TicTacGrow_turn">Player&nbsp;1's&nbsp;Turn</div>
        );
      }
    } else {
      if (this.state.someoneWon) {
        boardMessage = (
          <div className="TicTacGrow_turn">Player&nbsp;1&nbsp;Wins!!!</div>
        );
      } else {
        boardMessage = (
          <div className="TicTacGrow_turn">Player&nbsp;2's&nbsp;Turn</div>
        );
      }
    }

    var numToWinString = this.state.numToWin.toString(),
      gridSizeString = this.state.gridSize.toString();
    if (numToWinString.length < 2) {
      numToWinString = "0" + numToWinString;
    }
    if (gridSizeString.length < 2) {
      gridSizeString = "0" + gridSizeString;
    }

    return (
      <div className="mainContainer">
        <h1 className="pageHeader">Tic-Tac-Grow</h1>
        <div className="TicTacGrow_menuButtons">
          <div className="TicTacGrow_menuButton">
            <Button
              type="primary"
              style={this.buttonStyle}
              onClick={() =>
                this.initializeBoard(this.state.numToWin, this.state.gridSize)
              }
            >
              Reset Board
            </Button>
          </div>
          <div className="TicTacGrow_menuButton">
            {" "}
            <Button
              type="danger"
              style={this.buttonStyle}
              onClick={this.startRandomClicks}
            >
              Random Clicks
            </Button>
          </div>
          <div className="TicTacGrow_menuButton">
            {" "}
            Number in a row to win: <strong>{numToWinString}</strong>{" "}
            <Icon
              type="minus-circle"
              style={this.iconStyle}
              onClick={() => this.changeNumToWin(0)}
            ></Icon>
            <Icon
              type="plus-circle"
              style={this.iconStyle}
              onClick={() => this.changeNumToWin(1)}
            ></Icon>
          </div>
          <div className="TicTacGrow_menuButton">
            {" "}
            Maximum grid size: <strong>{gridSizeString}</strong>{" "}
            <Icon
              type="minus-circle"
              style={this.iconStyle}
              onClick={() => this.changeGridSize(0)}
            ></Icon>
            <Icon
              type="plus-circle"
              style={this.iconStyle}
              onClick={() => this.changeGridSize(1)}
            ></Icon>
          </div>
        </div>
        <h2>{boardMessage}</h2>
        <table
          key={this.state.boardReset}
          className="TicTacGrow_table"
          align="center"
        >
          <tbody>
            {this.state.grid.map((row, index1) => (
              <tr key={"gridRow" + index1}>
                {row.map((cell, index2) => (
                  <td
                    key={"gridCell" + index1 + index2 + cell.className}
                    className={cell.className}
                    style={cell.style}
                    onClick={() => this.cellClick(index1, index2)}
                  >
                    {cell.text}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TicTacGrow;
