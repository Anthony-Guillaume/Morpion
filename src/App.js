import React from 'react';
import './App.css';
import './components/Game.css';
import {Cell} from "./components/Cell"

const CELL_STATUS = {
  EMPTY: 0,
  CROSS: 1,
  CIRCLE: 2
}

const CELL_SYMBOL = {
  EMPTY: "",
  CROSS: "X",
  CIRCLE: "O"
}

class CellData
{
  status = CELL_STATUS.EMPTY
  symbol = CELL_SYMBOL.EMPTY
}
class App extends React.Component
{
  gameOver = false; 

  constructor()
  {
    super();
    const cells = [];
    for (let index = 0; index < 9; index++)
    {
      cells.push(new CellData());
    }
    this.state = {cells: cells};
  }

  addCross = (cellIndex) => {
    const cells = Array.from(this.state.cells);
    cells[cellIndex].status = CELL_STATUS.CROSS;
    cells[cellIndex].symbol = CELL_SYMBOL.CROSS;
    this.setState({cells});
  }

  addCircle = (cellIndex) => {
    const cells = Array.from(this.state.cells);
    cells[cellIndex].status = CELL_STATUS.CIRCLE;
    cells[cellIndex].symbol = CELL_SYMBOL.CIRCLE;
    this.setState({cells});
  }

  isALineCompleted = (symbol) => {
    const cells = this.state.cells;
    var line1 = cells[0].symbol === symbol && 
                cells[1].symbol === symbol &&
                cells[2].symbol === symbol;
    
    var line2 = cells[3].symbol === symbol && 
                cells[4].symbol === symbol &&
                cells[5].symbol === symbol;

    var line3 = cells[6].symbol === symbol && 
                cells[7].symbol === symbol &&
                cells[8].symbol === symbol;
    return line1 || line2 || line3;
  }

  isAColumnCompleted = (symbol) => {
    const cells = this.state.cells;
    var column1 = cells[0].symbol === symbol && 
                cells[3].symbol === symbol &&
                cells[6].symbol === symbol;
    
    var column2 = cells[1].symbol === symbol && 
                cells[4].symbol === symbol &&
                cells[7].symbol === symbol;
    
    var column3 = cells[2].symbol === symbol && 
                cells[5].symbol === symbol &&
                cells[8].symbol === symbol;
    return column1 || column2 || column3;
  }

  isADiagonalCompleted = (symbol) => {
    const cells = this.state.cells;
    var diagonal1 = cells[0].symbol === symbol && 
                cells[4].symbol === symbol &&
                cells[8].symbol === symbol;
    
    var diagonal2 = cells[2].symbol === symbol && 
                cells[4].symbol === symbol &&
                cells[6].symbol === symbol;
    return diagonal1 || diagonal2;
  }

  checkIfPlayerWon = () => {
    this.gameOver =  this.isADiagonalCompleted(CELL_SYMBOL.CIRCLE) || this.isALineCompleted(CELL_SYMBOL.CIRCLE) || this.isAColumnCompleted(CELL_SYMBOL.CIRCLE);
  }

  checkIfComputerWon = () => {
    this.gameOver = this.isADiagonalCompleted(CELL_SYMBOL.CROSS) || this.isALineCompleted(CELL_SYMBOL.CROSS) || this.isAColumnCompleted(CELL_SYMBOL.CROSS);
  }

  checkTied = () => {
    const cells = this.state.cells;
    for (let index = 0; index < cells.length; index++) {
      if (cells[index].status === CELL_STATUS.EMPTY)
      {
        this.gameOver = false;
        return;
      }
      
    }
    this.gameOver = true;
  }

  handleClick = (cellIndex) => {
    if (!this.gameOver)
    {
      this.addCircle(cellIndex);
      this.checkTied();
      if (this.gameOver)
      {
        return;
      }
      this.checkIfPlayerWon();
      if (!this.gameOver)
      {
        this.handleComputerPlay();
        this.checkTied();
        if (this.gameOver)
        {
          return;
        }
        this.checkIfComputerWon();
      }
    }
  }

  handleComputerPlay = () => {
    const cells = this.state.cells;
    var usableCellIndexes = [];
    for (let index = 0; index < cells.length; index++) 
    {
      if (cells[index].status === CELL_STATUS.EMPTY)
      {
        usableCellIndexes.push(index);
      }
    }
    const randomIndex = this.computeRandomInt(0, usableCellIndexes.length);
    const cellIndex = usableCellIndexes[randomIndex];
    this.addCross(cellIndex);
  }

  computeRandomInt(min, max) 
  {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  render()
  {
    const cells = this.state.cells.map((cell, index) => {
      return (<Cell
                key={index}
                id={index}
                onClick={this.handleClick}
                disabled={cell.status !== CELL_STATUS.EMPTY}
                symbol={cell.symbol}
              />)
      });
    return (
        <div className="container">
          {cells}
        </div>
    );
  }
}

export default App;
