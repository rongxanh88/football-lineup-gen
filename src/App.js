import React, { Component } from 'react';
import './App.css';

import LineupTable from './components/table.jsx'
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
          <div>
            <UploadForm />
          </div>
          <div>
            <LineupTable />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
