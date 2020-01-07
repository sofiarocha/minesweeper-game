import React, { Component } from "react";
import Cell from "../components/Cell";

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 8,
            height: 8,
            mines: 10,
            gameOver: false,
            gameBoard: [],
            minesLeft: 10
        };
    }

    componentDidMount() {
        const { width, height, mines } = this.state;
        this.setState({
            gameBoard: this.initBoard(width, height, mines)
        });
    }

    initBoard = (width, height, mines) => {
        let boardData = this.createEmptyBoard(width, height);
        boardData = this.populateMines(width, height, mines, boardData);
        boardData = this.countNeighbours(width, height, boardData);
        return boardData;
    };

    // create the empty board
    createEmptyBoard = (width, height) => {
        const boardData = [];
        for (let i = 0; i < width; i++) {
            boardData.push([]);
            for (let j = 0; j < height; j++) {
                boardData[i].push({
                    x: i,
                    y: j,
                    isMine: false,
                    isClicked: false,
                    neighbour: 0,
                    isFlag: false
                });
            }
        }
        return boardData;
    };

    // populate the board with mines
    populateMines = (width, height, mines, boardData) => {
        let minesAdded = 0;
        while (minesAdded <= mines) {
            const minePositionX = Math.floor(Math.random() * width);
            const minePositionY = Math.floor(Math.random() * height);
            if (!boardData[minePositionX][minePositionY].isMine) {
                const newBoardData = [...boardData];
                newBoardData[minePositionX][minePositionY].isMine = true;
            }
            minesAdded++;
        }
        return boardData;
    };

    // count mines in the borders
    countNeighbours = (width, height, boardData) => {
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                if (!boardData[i][j].isMine) {
                    let countMines = 0;
                    const neighbours = this.getNeighboursArray(i, j, boardData);
                    neighbours.map(cell => {
                        if (cell.isMine) {
                            countMines++;
                        }
                        return countMines;
                    });
                    const newBoardData = [...boardData];
                    newBoardData[i][j].neighbour = countMines;
                }
            }
        }
        return boardData;
    };

    // get an array of neighbours
    getNeighboursArray = (x, y, boardData) => {
        const neighbours = [];
        // up
        if (x > 0) neighbours.push(boardData[x - 1][y]);
        // corner up-right
        if (x > 0 && y < boardData[0].length - 1) {
            neighbours.push(boardData[x - 1][y + 1]);
        }
        // right
        if (y < boardData[0].length - 1) neighbours.push(boardData[x][y + 1]);
        // corner down-right
        if (x < boardData.length - 1 && y < boardData[0].length - 1) {
            neighbours.push(boardData[x + 1][y + 1]);
        }
        // down
        if (x < boardData.length - 1) neighbours.push(boardData[x + 1][y]);
        // corner down-left
        if (x < boardData.length - 1 && y > 0) {
            neighbours.push(boardData[x + 1][y - 1]);
        }
        // left
        if (y > 0) neighbours.push(boardData[x][y - 1]);
        // corner up-left
        if (x > 0 && y > 0) neighbours.push(boardData[x - 1][y - 1]);

        return neighbours;
    };

    // handle cell click
    handleClickedCell = value => {
        const { gameBoard } = this.state;
        if (value.isMine) {
            this.setState({
                gameOver: true
            });
            this.revealAllBoard();
            console.log("GAME OVER");
        } else if (value.neighbour === 0) {
            this.revealCell(value);
            this.revealEmptyCell(value, gameBoard);
        }
        this.revealCell(value);
    };

    revealCell = value => {
        this.setState(prevState => ({
            ...prevState,
            gameBoard: prevState.gameBoard.map((row, index) => {
                if (index === value.x) {
                    return prevState.gameBoard[value.x].map(
                        (cell, indexCell) => {
                            if (indexCell === value.y) {
                                return {
                                    ...cell,
                                    isClicked: true
                                };
                            }
                            return cell;
                        }
                    );
                }
                return row;
            })
        }));
    };

    revealAllBoard = () => {
        this.setState(prevState => ({
            ...prevState,
            gameBoard: prevState.gameBoard.map(row => {
                return row.map(cell => {
                    return {
                        ...cell,
                        isClicked: true
                    };
                });
            })
        }));
    };

    revealEmptyCell = (value, gameBoard) => {
        const cellsArray = this.getNeighboursArray(value.x, value.y, gameBoard);

        cellsArray.forEach(cell => {
            if (!cell.isFlag && !cell.isClicked) {
                const newBoardData = [...gameBoard];
                newBoardData[cell.x][cell.y].isClicked = true;
                if (cell.neighbour === 0) {
                    this.revealEmptyCell(cell, newBoardData);
                }
                this.revealCell(cell);
            }
        });
    };

    // handle flag click
    handleClickFlag = (e, value) => {
        e.preventDefault();
        this.setState(prevState => ({
            ...prevState,
            gameBoard: prevState.gameBoard.map((row, index) => {
                if (index === value.x) {
                    return prevState.gameBoard[value.x].map(
                        (cell, indexCell) => {
                            if (indexCell === value.y) {
                                return {
                                    ...cell,
                                    isFlag: true
                                };
                            }
                            return cell;
                        }
                    );
                }
                return row;
            }),
            minesLeft: prevState.minesLeft - 1
        }));
    };

    renderBoard = data => {
        return data.map((datarow, index) => {
            return (
                <div className="board-row" key={`${index}`}>
                    {datarow.map(item => {
                        return (
                            <Cell
                                value={item}
                                key={`${item.x}${item.y}`}
                                onClickCell={this.handleClickedCell}
                                onClickFlag={this.handleClickFlag}
                            />
                        );
                    })}
                </div>
            );
        });
    };

    render() {
        const { gameBoard, width, height, mines } = this.state;
        return <div className="board">{this.renderBoard(gameBoard)}</div>;
    }
}

export default Board;
