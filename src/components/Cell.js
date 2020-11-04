import React from 'react';
import './Game.css';

export class Cell extends React.Component
{
  handleClick = (e) => {
    this.props.onClick(e.target.id);
  }

  render()
  {
      return (
        <button id={this.props.id} onClick={this.handleClick} disabled={this.props.disabled}> {this.props.symbol} </button>
      )
  }

}