/*
Joseph P. Pasaoa
React Clicker Game Lab
*/


/* TO DO
add high score system
add scores record grid
mobile ui responsiveness
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
      regular: <p className='msg'>All systems go. Click for credits!</p>,
      boostDenied: <p className='msg msg--red'>Not enough credits. Boost DENIED.</p>
    };
    this.styles = {
      btnBoostOff: 'linear-gradient(to bottom, #525252 0%,#000 100%)',
      btnBoostOn: 'linear-gradient(to bottom, #e7ea12 0%,#f16d11 100%)'
    };
    this.initialState = {
      credits: 0,
      clickValue: 1,
      boostsActive: 0,
      statusMsg: this.messages.regular,
      cursorOnBoost: 'not-allowed',
      btnBoostFill: this.styles.btnBoostOff,
      btnBoostBorder: '#333',
      drain: setInterval(() => {
        if (this.state.credits > 0) {
          this.setState({
              credits: this.state.credits - 1,
              cursorOnBoost: this.state.credits - 1 >= 10 ? 'pointer' : 'not-allowed',
              btnBoostFill: this.state.credits - 1 >= 10 ? this.styles.btnBoostOn : this.styles.btnBoostOff,
              btnBoostBorder: this.state.credits - 1 >= 10 ? 'orange' : '#333'
          });
        }
      }, 1000),
      statNumClicks: 0,
      statNumBoosts: 0,
      statStartTime: Date.now(),
      statTimeToWin: null
    };
    this.state = this.initialState;
  }

  calcLuminosity = () => {
    return (this.state.credits / this.victoryNum * 100).toFixed(2) + '%';
  }

  hanClickGo = () => {
    this.setState({
        credits: this.state.credits + this.state.clickValue,
        cursorOnBoost: this.state.credits + this.state.clickValue >= 10 ? 'pointer' : 'not-allowed',
        btnBoostFill: this.state.credits + this.state.clickValue >= 10 ? this.styles.btnBoostOn : this.styles.btnBoostOff,
        btnBoostBorder: this.state.credits + this.state.clickValue >= 10 ? 'orange' : '#333',
        statNumClicks: this.state.statNumClicks + 1
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
          boostsActive: this.boostsActive + 1,
          cursorOnBoost: this.state.credits - 10 >= 10 ? 'pointer' : 'not-allowed',
          btnBoostFill: this.state.credits - 10 >= 10 ? this.styles.btnBoostOn : this.styles.btnBoostOff,
          btnBoostBorder: this.state.credits - 10 >= 10 ? 'orange' : '#333',
          statNumBoosts: this.state.statNumBoosts + 1
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
        }, 1000),
        statStartTime: Date.now()
    });
  }

  markEndTime = () => {
    return (Date.now() - this.state.statStartTime) / 1000;
  }

  render() {
    const { 
      credits, 
      clickValue, 
      boostsActive, 
      statusMsg, 
      cursorOnBoost, 
      btnBoostFill, 
      btnBoostBorder, 
      drain,
      statNumClicks,
      statNumBoosts
    } = this.state;

    const topDisplay =
      <div id="topDisplay">
        <p id="score">{credits}</p>
        <p id="credits-label">credits</p>
      </div>

    const btnBoost = 
      <button 
        id="btnBoost" 
        onClick={this.hanClickBoost} 
        style={{cursor: cursorOnBoost, backgroundImage: btnBoostFill, border: `solid 3px ${btnBoostBorder}`}}
      >
        +boost!<br />{`(-10 creds)`}
      </button>

    const title =
      <h1>Click, <br />Pass <br />the Cent</h1>

    const footer =
      <footer>Copyright ©2019 Joseph P. Pasaoa. All rights reserved.</footer>


    if (credits >= this.victoryNum) {
      const statTimeToWin = this.markEndTime();
      clearInterval(drain);
      return (
        <div className="App">
          <div id="flex-base">

            {topDisplay}
            <h2>Victory!</h2>
            <p className="msg msg--grats">You made 100 credits! Congratulations!</p>
            <button id="btnReset" onClick={this.hanClickReset}>Try again?</button>
            <p className="msg">stats ~</p>
            Time: {statTimeToWin}, Clicks: {statNumClicks}, Boosts: {statNumBoosts}
            {title}
            {footer}
          </div>
        </div>
      );
    }

    return (
      <div className="App" style={{backgroundColor: `hsl(0, 0%, ${this.calcLuminosity()}`}}>
        <div id="flex-base">

          {topDisplay}
          <div id="controls">
            {credits >= 10 && boostsActive < 1 ? btnBoost : btnBoost}
            <button id="btnGo" onClick={this.hanClickGo} type="button"><span>{`+${clickValue.toString()}`}</span> credits</button>
          </div>
          {statusMsg}
          {title}
          {footer}
        </div>
      </div>
    );
  }
}


/* EXPORT */
export default App;
