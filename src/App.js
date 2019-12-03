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
    this.victoryNum = 100;
    this.messages = {
      regular: <p>All systems go. Click for credits!</p>,
      boostDenied: <p className='msg--red'>Not enough credits. Boost DENIED.</p>,
      victory: <p>You made 100 credits!</p>
    };
    this.initialState = {
      credits: 0,
      clickValue: 1,
      boostsActive: 0,
      statusMsg: this.messages.regular,
      cursorOnBoost: 'not-allowed',
      drain: setInterval(() => {
        if (this.state.credits > 0) {
          this.setState({
              credits: this.state.credits - 1,
              cursorOnBoost: this.state.credits - 1 >= 10 ? 'pointer' : 'not-allowed'
          });
        }
      }, 1000)
    };
    this.state = this.initialState;
  }

  calcLuminosity = () => {
    return (this.state.credits / this.victoryNum * 100).toFixed(2) + '%';
  }

  hanClickGo = () => {
    this.setState({
        credits: this.state.credits + this.state.clickValue,
        cursorOnBoost: this.state.credits + this.state.clickValue >= 10 ? 'pointer' : 'not-allowed'
    });
    if (this.state.credits + this.state.clickValue >= this.victoryNum) {
      this.setState({
          statusMsg: this.messages.victory
      });
    }
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
          boostsActive: this.boostsActive + 1,
          cursorOnBoost: this.state.credits - 10 >= 10 ? 'pointer' : 'not-allowed'
      });
    }
  }

  hanClickReset = () => {
    this.setState(this.initialState);
    this.setState({
        drain: setInterval(() => {
          if (this.state.credits > 0) {
            this.setState({
                credits: this.state.credits - 1
            });
          }
        }, 1000)
    });
  }

  render() {
    const { credits, clickValue, boostsActive, statusMsg, cursorOnBoost, drain } = this.state;

    const topDisplay =
      <div id="topDisplay">
        <p id="score">{credits}</p>
        <p id="credits-label">credits</p>
      </div>

    const btnBoost = <button 
      id="btnBoost" 
      onClick={this.hanClickBoost} 
      style={{cursor: cursorOnBoost}}
      >
        {`+boost! (-10 credits)`}
      </button>

    if (credits >= this.victoryNum) {
      clearInterval(drain);
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
      <div className="App" style={{backgroundColor: `hsl(0, 0%, ${this.calcLuminosity()}`}}>
        <div id="flex-base">

          {topDisplay}
          <button id="btnGo" onClick={this.hanClickGo}>{`+${clickValue.toString()} credits`}</button>
          {statusMsg}
          {credits >= 10 && boostsActive < 1 ? btnBoost : btnBoost}

        </div>
      </div>
    );
  }
}


/* EXPORT */
export default App;
