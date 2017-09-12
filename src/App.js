import React, { Component } from 'react';
import './App.css';

import Table from './components/table.jsx'
import UploadForm from './components/upload_form.jsx'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img
            className="App-logo"
            src={ require('./assets/nfl_logo.jpg') }
            alt=""
          />
          <h1>Daily Fantasy Football Lineup Generator</h1>
        </div>
        <section className="App-body">
          <div class="available">
            <UploadForm />
            <h3>All Available Players</h3>
            <Table id="available-players" />
          </div>
          <div>
            <h3>Generated Lineup</h3>
            <Table id="generated-lineup" />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
