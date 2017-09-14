import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Table from './components/table.jsx';
import UploadForm from './components/upload_form.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      defenses: []
    }
    this.setAllPlayers = this.setAllPlayers.bind(this)
    this.setDefenses   = this.setDefenses.bind(this)
  }

  componentDidMount() {
    this.getAllPlayers()
    this.getDefenses()
  }
  
  getAllPlayers() {
    Promise.all([
       getPlayers('quarterbacks'),
       getPlayers('runningbacks'),
       getPlayers('receivers'),
       getPlayers('tightends')
     ])
     .then((allData) => {
       const quarterbacks = allData[0].quarterbacks
       const runningbacks = allData[1].runningbacks
       const receivers    = allData[2].receivers
       const tightends    = allData[3].tightends
       const allPlayers   = quarterbacks.concat(runningbacks, receivers, tightends)
       this.setAllPlayers(allPlayers)
     })
  }

  getDefenses() {
    getPlayers('defenses')
      .then(data => this.setDefenses(data.defenses))
  }

  setDefenses(defenses) {
    this.setState({ defenses: defenses })
  }

  setAllPlayers(allPlayers) {
    this.setState({ players: allPlayers })
  }

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
          <div className="available">
            <h3 id="header-players">All Available Players</h3>
            <Table
              id="available-players"
              players={this.state.players}
            />
            <h3 id="header-defenses">All Available Defenses</h3>
            <Table
              id="available-defenses"
              players={this.state.defenses}
            />
          </div>
          <div>
            <UploadForm />
            <h3>Generated Lineup</h3>
            <Table id="generated-lineup"
            players={[]}
            />
          </div>
        </section>
      </div>
    );
  }
}

const baseURL = "https://fantasy-football-api-1703.herokuapp.com"

const getPlayers = (position) => {
  return axios.get(baseURL + `/api/v1/${position}.json`)
    .then(response => response.data)
    .catch(error => console.log(error))
}

export default App;