/*
Joseph P. Pasaoa
React Clicker Game Lab
*/


/* IMPORTS */
import React from 'react';
import './App.css';
// const { log } = require('./utils/helpers.js');


/* EXEC */
class App extends React.Component {
  constructor() {
    super();
    this.initialState = {
      credits: 0,
      perClick: 1
    };
    this.state = this.initialState;
  }

  handleClickGo = () => {
    this.setState({
        credits: this.state.credits + this.state.perClick
    });
  }

  handleClickReset = () => {
    this.setState(this.initialState);
  }

  render() {
    const { credits, perClick } = this.state;

    if (credits >= 10) {
      return(
        <div className="App">
          <div id="grid-base">
            <div id="topDisplay">
              <p id="score">{credits}</p>
              <p>credits</p>
            </div>
            <h2>Victory!</h2>
            <p>You made 100 credits!</p>
            <button id="btnReset" onClick={this.handleClickReset}>Another game?</button>
          </div>
        </div>
      );
    }

    return (
      <div className="App">
        <div id="grid-base">
          <div id="topDisplay">
            <p id="score">{credits}</p>
            <p>credits</p>
          </div>
          <button id="btnGo" onClick={this.handleClickGo}>{`+${perClick.toString()} credits`}</button>
        </div>
      </div>
    );
  }
}


/* EXPORT */
export default App;
