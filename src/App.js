import React, { Component } from 'react'
import axios from 'axios'
import './App.css'

import Table from './components/table.jsx'
import UploadForm from './components/upload_form.jsx'
// import Button from './components/gen_lineup.jsx'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: [],
      defenses: [],
      lineup: []
    }
    this.setAllPlayers = this.setAllPlayers.bind(this)
    this.setDefenses   = this.setDefenses.bind(this)
    this.genLineup     = this.genLineup.bind(this)
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

  genLineup() {
    const salaryCap = 50000
    let highestProduction = 0
    let bestLineup = []

    let quarterbacks = this.state.players.filter(player => player.position === "QB")
                                         .sort((playerA, playerB) => {
                                           return parseFloat(playerB.expected_point_production) - parseFloat(playerA.expected_point_production)
                                         }).slice(0,10)

    let runningbacks = this.state.players.filter(player => player.position === "RB")
                                         .sort((playerA, playerB) => {
                                           return parseFloat(playerB.expected_point_production) - parseFloat(playerA.expected_point_production)
                                         }).slice(0,10)

    let receivers = this.state.players.filter(player => player.position === "WR")
                                      .sort((playerA, playerB) => {
                                        return parseFloat(playerB.expected_point_production) - parseFloat(playerA.expected_point_production)
                                      }).slice(0,10)

    let tightends = this.state.players.filter(player => player.position === "TE")
                                      .sort((playerA, playerB) => {
                                        return parseFloat(playerB.expected_point_production) - parseFloat(playerA.expected_point_production)
                                      }).slice(0,10)

    let defenses = this.state.defenses.sort((defenseA, defenseB) => {
                                        return parseFloat(defenseB.expected_point_production) - parseFloat(defenseA.expected_point_production)
                                      }).slice(0,10)

    quarterbacks.forEach(quarterback => {
      let pointTotal = 0
      let salaryTotal = 0
      let lineup = []

      pointTotal += quarterback.expected_point_production
      salaryTotal += quarterback.salary
      lineup.push(quarterback)
      debugger
      //two runningbacks
      runningbacks.forEach(rb1 => {
        pointTotal += rb1.expected_point_production
        salaryTotal += rb1.salary
        lineup.push(rb1)

        const secondRunningbacks = runningbacks.filter(rb2 => rb2 !== rb1)
        secondRunningbacks.forEach(rb2 => {
          pointTotal += rb2.expected_point_production
          salaryTotal += rb2.salary
          lineup.push(rb2)

          receivers.forEach(wr1 => {
            pointTotal += wr1.expected_point_production
            salaryTotal += wr1.salary
            lineup.push(wr1)

            const secondReceivers = receivers.filter(wr2 => wr2 !== wr1)
            secondReceivers.forEach(wr2 => {
              pointTotal += wr2.expected_point_production
              salaryTotal += wr2.salary
              lineup.push(wr2)

              const thirdReceivers = receivers.filter(wr3 => (wr3 !== wr2) && (wr3 !== wr1))
              thirdReceivers.forEach(wr3 => {
                pointTotal += wr3.expected_point_production
                salaryTotal += wr3.salary
                lineup.push(wr3)

                tightends.forEach(te => {
                  pointTotal += te.expected_point_production
                  salaryTotal += te.salary
                  lineup.push(te)

                  defenses.forEach(defense => {
                    pointTotal += defense.expected_point_production
                    salaryTotal += defense.salary
                    lineup.push(defense)

                    if (salaryTotal > salaryCap) {
                      //dont do anything
                    } else if (pointTotal > highestProduction) {
                      highestProduction = pointTotal
                      bestLineup = lineup
                    }
                  })
                })
              })
            })
          })
        })
      })
    })                                      
    debugger
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
          <div className="Dynamic-Lineup">
            <UploadForm />
            <button type="button" id="header-gen-lineups" onClick={this.genLineup}>Generate Lineup</button>
            {/* <Button id="gen-button" text="Generate Lineup" /> */}
            <h3 id="header-gen-lineups">Generated Lineup</h3>
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