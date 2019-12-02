/*
Joseph P. Pasaoa
React Clicker Game Lab
*/


/* IMPORTS */
import React from 'react';
import './App.css';
const { log } = require('./utils/helpers.js');


/* EXEC */
class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        {log("Hello")};
      </div>
    );
  }
}


/* EXPORT */
export default App;
