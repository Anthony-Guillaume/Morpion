import React from 'react';
import './App.css';
import './components/Game.css';
import {Cell} from "./components/Cell"

const cellStatus = {
  EMPTY: 0,
  CROSS: 1,
  CIRCLE: 2
}

const cellSymbol = {
  EMPTY: "",
  CROSS: "X",
  CIRCLE: "O"
}

class CellData
{
  status = cellStatus.EMPTY
  symbol = cellSymbol.EMPTY
}
class App extends React.Component
{
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
    cells[cellIndex].status = cellStatus.CROSS;
    cells[cellIndex].symbol = cellSymbol.CROSS;
    this.setState({cells});
  }

  addCircle = (cellIndex) => {
    const cells = Array.from(this.state.cells);
    cells[cellIndex].status = cellStatus.CIRCLE;
    cells[cellIndex].symbol = cellSymbol.CIRCLE;
    this.setState({cells});
  }

  handleClick = (cellIndex) => {
    console.log(cellIndex);
    this.addCircle(cellIndex);
  }

  render()
  {
    const cells = this.state.cells.map((cell, index) => {
      return (<Cell
                key={index}
                id={index}
                onClick={this.handleClick}
                disabled={cell.status !== cellStatus.EMPTY}
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
