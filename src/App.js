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
    this.state = {
      credits: 0,
      perClick: 1
    };
  }

  handleClickGo = () => {
    this.setState({
        credits: this.state.credits + this.state.perClick
    });
  }

  render() {
    const { credits, perClick } = this.state;
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
