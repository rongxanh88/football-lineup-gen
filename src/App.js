import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img className="App-logo" src={ require('./assets/nfl_logo.jpg') }/>
          <h1>Daily Fantasy Football Lineup Generator</h1>
        </div>
      </div>
    );
  }
}

export default App;
