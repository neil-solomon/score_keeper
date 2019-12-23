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
    gridSize: 7,
    maxGridSize: 31,
    gameHasWinner: false,
    gameIsDraw: false,
    cellExistsStyle: {
      fontSize: "2vh",
      height: "4vh",
      width: "4vh"
    },
    gridNotInitialized: true,
    playingComputer: false,
    computerMoveTimeout: null
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
    this.resizeGrid();
    window.addEventListener("resize", this.resizeGrid);
  }

  componentWillUnmount() {
    clearInterval(this.state.randomClicksInterval);
    window.removeEventListener("resize", this.resizeGrid);
    clearTimeout(this.state.computerMoveTimeout);
  }

  resizeGrid = () => {
    if (this.state.gridNotInitialized) {
      return;
    }
    if (window.innerWidth > window.innerHeight) {
      var cellExistsStyle = {
        width: (80 / this.state.gridSize).toString() + "vh",
        height: (80 / this.state.gridSize).toString() + "vh",
        fontSize: (80 / (this.state.gridSize * 2)).toString() + "vh"
      };
    } else {
      var cellExistsStyle = {
        width: (100 / this.state.gridSize).toString() + "vw",
        height: (100 / this.state.gridSize).toString() + "vw",
        fontSize: (100 / (this.state.gridSize * 2)).toString() + "vw"
      };
    }
    var grid = [...this.state.grid];
    for (let i = 0; i < grid.length; ++i) {
      for (let j = 0; j < grid[0].length; ++j) {
        if (grid[i][j].exists) {
          grid[i][j].style = cellExistsStyle;
        }
      }
    }
    this.setState({ grid });
    this.setState({ cellExistsStyle });
  };

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
    this.setState({ gameHasWinner: false });
    this.setState({
      gameIsDraw: false
    });
    this.setState({ randomClicksInterval: "" });
    this.setState({ grid });
    this.setState({ candidateCells });
    this.setState({ boardReset: !this.state.boardReset });
    this.setState({ gridNotInitialized: false });
  };

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
    if (this.state.gameHasWinner || this.state.gameIsDraw) {
      return;
    }
    if (this.state.playingComputer && !this.state.player1Turn) {
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
    this.checkForDraw(grid);
    // for (let i = this.state.numToWin; i >= 3; --i) {
    //   var longRuns = this.findLongRuns(i);
    //   console.log(i, longRuns);
    // }
    this.setState({ grid });
    this.setState({ player1Turn: !this.state.player1Turn });
    this.addCell();
    if (this.state.playingComputer && this.state.player1Turn) {
      var computerMoveTimeout = setTimeout(
        () => this.makeComputerMove(row, column),
        2000
      );
      this.setState({ computerMoveTimeout });
    }
  };

  makeComputerMove = (player1Row, player1Col) => {
    if (this.state.gameHasWinner || this.state.gameIsDraw) {
      return;
    }
    var grid = [...this.state.grid];

    var computerDidntPlay = true;

    for (let i = this.state.numToWin; i >= 3; --i) {
      var longRuns = this.findLongRuns(i);
      console.log(longRuns);
      if (longRuns.player2.length !== 0) {
        var ix;
        if (longRuns.player2.length === 1) {
          ix = 0;
        } else {
          ix = Math.round(Math.random() * 1000000) % longRuns.player2.length;
        }
        grid[longRuns.player2[ix][0]][longRuns.player2[ix][1]].player2 = true;
        grid[longRuns.player2[ix][0]][longRuns.player2[ix][1]].text = "O";
        computerDidntPlay = false;
        console.log("extendLongRun", longRuns.player2[ix]);
        break;
      }
      if (longRuns.player1.length !== 0) {
        var ix;
        if (longRuns.player1.length === 1) {
          ix = 0;
        } else {
          ix = Math.round(Math.random() * 1000000) % longRuns.player1.length;
        }
        grid[longRuns.player1[ix][0]][longRuns.player1[ix][1]].player2 = true;
        grid[longRuns.player1[ix][0]][longRuns.player1[ix][1]].text = "O";
        computerDidntPlay = false;
        console.log("blockLongRun", longRuns.player1[ix]);
        break;
      }
    }

    if (computerDidntPlay) {
      // Pick random cell of the cells closest to the center
      var candidateCells = [];
      for (let i = 0; i < grid.length; ++i) {
        for (let j = 0; j < grid.length; ++j) {
          if (grid[i][j].exists && !grid[i][j].player1 && !grid[i][j].player2) {
            candidateCells.push([i, j]);
          }
        }
      }
      var minDistFromCenter = Math.sqrt(2 * Math.pow(grid.length, 2)),
        candidateCellsMinDist = [];
      for (let i = 0; i < candidateCells.length - 1; ++i) {
        var distFromCenter = Math.sqrt(
          Math.pow(candidateCells[i][0] - Math.round(grid.length / 2), 2) +
            Math.pow(candidateCells[i][1] - Math.round(grid.length / 2), 2)
        );
        if (distFromCenter < minDistFromCenter) {
          minDistFromCenter = distFromCenter;
          candidateCellsMinDist = [];
          candidateCellsMinDist.push(candidateCells[i]);
        } else if (distFromCenter === minDistFromCenter) {
          candidateCellsMinDist.push(candidateCells[i]);
        }
      }
      if (candidateCellsMinDist.length === 0) {
        // grid is full, no moves available
        return;
      }
      console.log("closest", candidateCellsMinDist);
      var random =
        Math.round(Math.random() * 1000000) % candidateCellsMinDist.length;
      grid[candidateCellsMinDist[random][0]][
        candidateCellsMinDist[random][1]
      ].player2 = true;
      grid[candidateCellsMinDist[random][0]][
        candidateCellsMinDist[random][1]
      ].text = "O";
    }

    this.checkForWinner(grid);
    this.checkForDraw(grid);
    this.setState({ grid });
    this.addCell();
    this.setState({ player1Turn: !this.state.player1Turn });
    clearTimeout(this.state.computerMoveTimeout);
  };

  findLongRuns = numCellsToCheck => {
    var player1Count,
      player2Count,
      longRunsPlayer1 = [],
      longRunsPlayer2 = [];

    // check rows
    for (let i = 0; i < this.state.grid.length; ++i) {
      for (let j = 0; j <= this.state.grid.length - numCellsToCheck; ++j) {
        if (this.state.grid[i][j].exists) {
          player1Count = 0;
          player2Count = 0;
          for (let k = 0; k < numCellsToCheck; ++k) {
            if (this.state.grid[i][j + k].player1) {
              ++player1Count;
            }
            if (this.state.grid[i][j + k].player2) {
              ++player2Count;
            }
          }
          if (player1Count === numCellsToCheck - 1 && player2Count === 0) {
            for (let k = 0; k < numCellsToCheck; ++k) {
              // find empty cell
              if (
                !this.state.grid[i][j + k].player1 &&
                this.state.grid[i][j + k].exists
              ) {
                longRunsPlayer1.push([i, j + k]);
              }
            }
          }
          if (player2Count === numCellsToCheck - 1 && player1Count === 0) {
            for (let k = 0; k < numCellsToCheck; ++k) {
              // find empty cell
              if (
                !this.state.grid[i][j + k].player2 &&
                this.state.grid[i][j + k].exists
              ) {
                longRunsPlayer2.push([i, j + k]);
              }
            }
          }
        }
      }
    }

    // check columns
    for (let i = 0; i < this.state.grid.length; ++i) {
      for (let j = 0; j <= this.state.grid.length - numCellsToCheck; ++j) {
        if (this.state.grid[j][i].exists) {
          player1Count = 0;
          player2Count = 0;
          for (let k = 0; k < numCellsToCheck; ++k) {
            if (this.state.grid[j + k][i].player1) {
              ++player1Count;
            }
            if (this.state.grid[j + k][i].player2) {
              ++player2Count;
            }
          }
          if (player1Count === numCellsToCheck - 1 && player2Count === 0) {
            for (let k = 0; k < numCellsToCheck; ++k) {
              // find empty cell
              if (
                !this.state.grid[j + k][i].player1 &&
                this.state.grid[j + k][i].exists
              ) {
                longRunsPlayer1.push([j + k, i]);
              }
            }
          }
          if (player2Count === numCellsToCheck - 1 && player1Count === 0) {
            for (let k = 0; k < numCellsToCheck; ++k) {
              // find empty cell
              if (
                !this.state.grid[j + k][i].player2 &&
                this.state.grid[j + k][i].exists
              ) {
                longRunsPlayer2.push([j + k, i]);
              }
            }
          }
        }
      }
    }

    // check up diags
    for (let i = numCellsToCheck - 1; i < this.state.grid.length; ++i) {
      for (let j = 0; j <= this.state.grid.length - numCellsToCheck; ++j) {
        if (this.state.grid[i][j].exists) {
          player1Count = 0;
          player2Count = 0;
          for (let k = 0; k < numCellsToCheck; ++k) {
            if (this.state.grid[i - k][j + k].player1) {
              ++player1Count;
            }
            if (this.state.grid[i - k][j + k].player2) {
              ++player2Count;
            }
          }
          if (player1Count === numCellsToCheck - 1 && player2Count === 0) {
            for (let k = 0; k < numCellsToCheck; ++k) {
              // find empty cell
              if (
                this.state.grid[i - k][j + k].exists &&
                !this.state.grid[i - k][j + k].player1
              ) {
                longRunsPlayer1.push([i - k, j + k]);
              }
            }
          }
          if (player2Count === numCellsToCheck - 1 && player1Count === 0) {
            // find empty cell
            for (let k = 0; k < numCellsToCheck; ++k) {
              if (
                this.state.grid[i - k][j + k].exists &&
                !this.state.grid[i - k][j + k].player2
              ) {
                longRunsPlayer2.push([i - k, j + k]);
              }
            }
          }
        }
      }
    }

    // check down diags
    for (let i = 0; i <= this.state.grid.length - numCellsToCheck; ++i) {
      for (let j = 0; j <= this.state.grid.length - numCellsToCheck; ++j) {
        if (this.state.grid[i][j].exists) {
          player1Count = 0;
          player2Count = 0;
          for (let k = 0; k < numCellsToCheck; ++k) {
            if (this.state.grid[i + k][j + k].player1) {
              ++player1Count;
            }
            if (this.state.grid[i + k][j + k].player2) {
              ++player2Count;
            }
          }
          if (player1Count === numCellsToCheck - 1 && player2Count === 0) {
            for (let k = 0; k < numCellsToCheck; ++k) {
              // find empty cell
              if (
                this.state.grid[i + k][j + k].exists &&
                !this.state.grid[i + k][j + k].player1
              ) {
                longRunsPlayer1.push([i + k, j + k]);
              }
            }
          }
          if (player2Count === numCellsToCheck - 1 && player1Count === 0) {
            // find empty cell
            for (let k = 0; k < numCellsToCheck; ++k) {
              if (
                this.state.grid[i + k][j + k].exists &&
                !this.state.grid[i + k][j + k].player2
              ) {
                longRunsPlayer2.push([i + k, j + k]);
              }
            }
          }
        }
      }
    }
    var longRuns = {
      player1: longRunsPlayer1,
      player2: longRunsPlayer2
    };
    return longRuns;
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
      this.setState({ gameHasWinner: true });
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
      this.setState({ gameHasWinner: true });
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
      this.setState({ gameHasWinner: true });
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
      this.setState({ gameHasWinner: true });
      clearInterval(this.state.randomClicksInterval);
      return;
    }
  };

  checkForDraw = grid => {
    for (let i = 0; i < grid.length; ++i) {
      for (let j = 0; j < grid.length; ++j) {
        if (
          !grid[i][j].exists ||
          (!grid[i][j].player1 && !grid[i][j].player2)
        ) {
          return;
        }
      }
    }
    this.setState({ gameIsDraw: true });
  };

  changePlayingComputer = value => {
    this.initializeBoard(this.state.numToWin, this.state.gridSize);
    this.setState({ playingComputer: value });
  };

  render() {
    var player2, playComputerStyle, playHumanStyle;
    if (this.state.playingComputer) {
      player2 = "Computer";
      playComputerStyle = {
        color: "rgb(0, 0, 255)",
        backgroundColor: "rgb(0, 200, 255, .75)"
      };
      playHumanStyle = {};
    } else {
      player2 = "Player 2";
      playComputerStyle = {};
      playHumanStyle = {
        color: "rgb(0, 0, 255)",
        backgroundColor: "rgb(0, 200, 255, .75)"
      };
    }

    var boardMessage;
    if (this.state.player1Turn) {
      if (this.state.gameHasWinner) {
        boardMessage = (
          <div className="TicTacGrow_turnWinner" key={this.state.player1Turn}>
            {player2}&nbsp;Wins!!!
          </div>
        );
      } else if (this.state.gameIsDraw) {
        boardMessage = (
          <div className="TicTacGrow_turnWinner" key={this.state.player1Turn}>
            It's a Draw!!!
          </div>
        );
      } else {
        boardMessage = (
          <div className="TicTacGrow_turn" key={this.state.player1Turn}>
            Player&nbsp;1's&nbsp;Turn
          </div>
        );
      }
    } else {
      if (this.state.gameHasWinner) {
        boardMessage = (
          <div className="TicTacGrow_turnWinner" key={this.state.player1Turn}>
            Player&nbsp;1&nbsp;Wins!!!
          </div>
        );
      } else if (this.state.gameIsDraw) {
        boardMessage = (
          <div className="TicTacGrow_turnWinner" key={this.state.player1Turn}>
            It's a Draw!!!
          </div>
        );
      } else {
        boardMessage = (
          <div className="TicTacGrow_turn" key={this.state.player1Turn}>
            {player2}'s&nbsp;Turn
          </div>
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
          {/* <div className="TicTacGrow_menuButton">
            <Button
              type="danger"
              className="menuButton"
              onClick={this.startRandomClicks}
            >
              Random Clicks
            </Button>
          </div> */}
          <div className="TicTacGrow_menuButton">
            <Button
              type="secondary"
              className="menuButton"
              style={playComputerStyle}
              onClick={() => this.changePlayingComputer(true)}
            >
              Play Computer
            </Button>
          </div>
          <div className="TicTacGrow_menuButton">
            <Button
              type="secondary"
              className="menuButton"
              style={playHumanStyle}
              onClick={() => this.changePlayingComputer(false)}
            >
              Play Human
            </Button>
          </div>
          <div className="TicTacGrow_menuButton">
            <Button
              type="primary"
              className="menuButton"
              onClick={() =>
                this.initializeBoard(this.state.numToWin, this.state.gridSize)
              }
            >
              New Game
            </Button>
          </div>
          <div className="TicTacGrow_menuButton">
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
