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
    this.messages = {
      regular: <p>All systems go. Click for credits!</p>,
      boostDenied: <p className='msg--red'>Not enough credits. Boost DENIED.</p>,
      victory: <p>You made 100 credits!</p>
    }
    this.initialState = {
      credits: 0,
      clickValue: 1,
      boostsActive: 0,
      statusMsg: this.messages.regular
    };
    this.state = this.initialState;
  }

  hanClickGo = () => {
    this.setState({
        credits: this.state.credits + this.state.clickValue
    });
  }

  hanClickBoost = () => {
    if (this.state.credits < 10) {
      this.setState({
          statusMsg: this.messages.boostDenied
      });
      setTimeout(() => {
          this.setState({
              statusMsg: this.messages.regular
          })
      }, 2000);
    } else {
      this.setState({
          credits: this.state.credits - 10,
          clickValue: this.state.clickValue + 1,
          boostsActive: this.boostsActive + 1
      });
    }
  }

  hanClickReset = () => {
    this.setState(this.initialState);
  }

  render() {
    const { credits, clickValue, boostsActive, statusMsg } = this.state;

    const topDisplay =
      <div id="topDisplay">
        <p id="score">{credits}</p>
        <p>credits</p>
      </div>

    const btnBoost = <button 
      id="btnBoost" 
      onClick={this.hanClickBoost}
      >
      {`+boost! (-10 credits)`}
    </button>

    if (credits >= 20) {
      return (
        <div className="App">
          <div id="flex-base">

            {topDisplay}
            <h2>Victory!</h2>
            {statusMsg}
            <button id="btnReset" onClick={this.hanClickReset}>Another game?</button>

          </div>
        </div>
      );
    }

    return (
      <div id="flex-base">

        {topDisplay}
        <button id="btnGo" onClick={this.hanClickGo}>{`+${clickValue.toString()} credits`}</button>
        {statusMsg}
        {credits >= 10 && boostsActive < 1 ? btnBoost : btnBoost}

      </div>
    );
  }
}


/* EXPORT */
export default App;
