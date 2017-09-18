import React, { Component } from 'react'
import getData from './services/fantasy_football_service'
import './App.css'

import Table from './components/table.jsx'
import UploadForm from './components/upload_form.jsx'
import WeatherModifer from './components/weather_modifer.jsx'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quarterbacks: [],
      runningbacks: [],
      receivers: [],
      tightends: [],
      defenses: [],
      weatherData: [],
      lineup: []
    }
    this.setAllData        = this.setAllData.bind(this)
    this.genLineup         = this.genLineup.bind(this)
    this.removePlayer      = this.removePlayer.bind(this)
    this.modifyPlayerStats = this.modifyPlayerStats.bind(this)
    // this.genLineupRecursivly = this.genLineupRecursivly.bind(this)
  }

  componentDidMount() {
    this.getAllData()
  }
  
  getAllData() {
    Promise.all([
       getData('quarterbacks'),
       getData('runningbacks'),
       getData('receivers'),
       getData('tightends'),
       getData('defenses'),
       getData('weather')
     ])
     .then((allData) => {
       const quarterbacks = allData[0].quarterbacks
       const runningbacks = allData[1].runningbacks
       const receivers    = allData[2].receivers
       const tightends    = allData[3].tightends
       const defenses     = allData[4].defenses
       const weather_data = allData[5].weatherData
       this.setAllData("QB", quarterbacks)
       this.setAllData("RB", runningbacks)
       this.setAllData("WR", receivers)
       this.setAllData("TE", tightends)
       this.setAllData("DEF", defenses)
       this.setAllData("weather", weather_data)
     })
  }

  setAllData(endpoint, all) {
    switch (endpoint) {
      case 'QB':
        this.setState({ quarterbacks: all })
        break
      case 'RB':
        this.setState({ runningbacks: all })
        break
      case 'WR':
        this.setState({ receivers: all })
        break
      case 'TE':
        this.setState({ tightends: all })
        break
      case 'DEF':
        this.setState({ defenses: all })
        break
      case 'weather':
        this.setState({ weatherData: all })
        break
      default:
        console.log('Error, did not set state change for players')
    }
  }

  removePlayer(element) {
    const position = element.children[0].innerText
    const name = element.children[1].innerText
    
    let players = []
    switch (position) {
      case 'QB':
        players = this.state.quarterbacks
        break
      case 'RB':
        players = this.state.runningbacks
        break
      case 'WR':
        players = this.state.receivers
        break
      case 'TE':
        players = this.state.tightends
        break
      case 'DEF':
        players = this.state.defenses
        break
    }
    const filtered_players = players.filter(player => {
      if (position !== 'DEF') {
        const full_name = player.first_name + ' ' + player.last_name
        if (full_name !== name) return player
      } else {
        if (player.name !== name) return player
      }
    })
    
    switch (position) {
      case 'QB':
        players = this.setState({quarterbacks: filtered_players})
        break
      case 'RB':
        players = this.setState({runningbacks: filtered_players})
        break
      case 'WR':
        players = this.setState({receivers: filtered_players})
        break
      case 'TE':
        players = this.setState({tightends: filtered_players})
        break
      case 'DEF':
        players = this.setState({defenses: filtered_players})
        break
    }
  }

  modifyPlayerStats(modifiers) {
    let quarterbacks = this.state.quarterbacks
    let runningbacks = this.state.runningbacks
    let receivers    = this.state.receivers
    let tightends    = this.state.tightends

    quarterbacks = this.modifyPlayers(quarterbacks, modifiers)
    runningbacks = this.modifyPlayers(runningbacks, modifiers)
    receivers = this.modifyPlayers(receivers, modifiers)
    tightends = this.modifyPlayers(tightends, modifiers)

    this.setState({quarterbacks: quarterbacks})
    this.setState({runningbacks: runningbacks})
    this.setState({receivers: receivers})
    this.setState({tightends: tightends})
  }

  modifyPlayers(players, modifiers) {
    const weatherData = this.state.weatherData
    return players.map(player => {
      const weathers = weatherData.filter(weather => {
        if (player.team === weather.awayTeam || player.team === weather.homeTeam) {
          return weather
        }
      })
      const weather = weathers[0]

      if (parseInt(weather.high) < modifiers.hiTemp && parseInt(weather.high) > modifiers.lowTemp) {
        player.expected_point_production = (player.expected_point_production * modifiers.tempModifier).toFixed(2)
      }
      if (parseInt(weather.windSpeed) < modifiers.hiWind && parseInt(weather.windSpeed) > modifiers.lowWind) {
        player.expected_point_production = (player.expected_point_production * modifiers.windModifier).toFixed(2)
      }
      return player
    })
  }

  genLineup() {
    const salaryCap = 50000
    let highestProduction = 0
    let bestLineup = []
    let numberOfOperations = 0

    let quarterbacks = truncatePlayers(this.state.quarterbacks, "QB")
    let runningbacks = truncatePlayers(this.state.runningbacks, "RB")
    let receivers = truncatePlayers(this.state.receivers, "WR")
    let tightends = truncatePlayers(this.state.tightends, "TE")
    let defenses = this.state.defenses.sort((a,b) => {
      return b.expected_point_production - a.expected_point_production
    }).slice(0,5)

    quarterbacks.forEach(quarterback => {
      let pointTotal = 0
      let salaryTotal = 0
      let lineup = []

      pointTotal += parseFloat(quarterback.expected_point_production)
      salaryTotal += parseFloat(quarterback.salary)
      lineup.push(quarterback)

      runningbacks.forEach(rb1 => {
        let pointTotal1 = pointTotal
        let salaryTotal1 = salaryTotal
        let lineup1 = lineup.slice()
        
        pointTotal1 += parseFloat(rb1.expected_point_production)
        salaryTotal1 += parseFloat(rb1.salary)
        lineup1.push(rb1)

        const secondRunningbacks = runningbacks.filter(rb2 => rb2 !== rb1)
        secondRunningbacks.forEach(rb2 => {
          let pointTotal2 = pointTotal1
          let salaryTotal2 = salaryTotal1
          let lineup2 = lineup1.slice()

          pointTotal2 += parseFloat(rb2.expected_point_production)
          salaryTotal2 += parseFloat(rb2.salary)
          lineup2.push(rb2)

          receivers.forEach(wr1 => {
            let pointTotal3 = pointTotal2
            let salaryTotal3 = salaryTotal2
            let lineup3 = lineup2.slice()

            pointTotal3 += parseFloat(wr1.expected_point_production)
            salaryTotal3 += parseFloat(wr1.salary)
            lineup3.push(wr1)

            const secondReceivers = receivers.filter(wr2 => wr2 !== wr1)
            secondReceivers.forEach(wr2 => {
              let pointTotal4 = pointTotal3
              let salaryTotal4 = salaryTotal3
              let lineup4 = lineup3.slice()

              pointTotal4 += parseFloat(wr2.expected_point_production)
              salaryTotal4 += parseFloat(wr2.salary)
              lineup4.push(wr2)

              const thirdReceivers = receivers.filter(wr3 => (wr3 !== wr2) && (wr3 !== wr1))
              thirdReceivers.forEach(wr3 => {
                let pointTotal5 = pointTotal4
                let salaryTotal5  = salaryTotal4
                let lineup5 = lineup4.slice()

                pointTotal5 += parseFloat(wr3.expected_point_production)
                salaryTotal5 += parseFloat(wr3.salary)
                lineup5.push(wr3)

                for(let i = 0; i < tightends.length; i++) {
                  const te = tightends[i]

                  let pointTotal6 = pointTotal5
                  let salaryTotal6 = salaryTotal5
                  let lineup6 = lineup5.slice()

                  pointTotal6 += parseFloat(te.expected_point_production)
                  salaryTotal6 += parseFloat(te.salary)
                  lineup6.push(te)

                  if (salaryTotal6 > salaryCap) {
                    continue
                  }

                  for(let j = 0; j < defenses.length; j++) {
                    const defense = defenses[j]
                    let pointTotal7 = pointTotal6
                    let salaryTotal7 = salaryTotal6
                    let lineup7 = lineup6.slice()
                    
                    pointTotal7 += parseFloat(defense.expected_point_production)
                    salaryTotal7 += parseFloat(defense.salary)
                    lineup7.push(defense)

                    if (salaryTotal7 > salaryCap) {
                      continue
                    }
                    const secondTightends = tightends.filter(te2 => te2 !== te)
                    const flexPos = secondRunningbacks.concat(thirdReceivers, secondTightends)

                    for(let k = 0; k < flexPos.length; k++) {
                      const player = flexPos[k]
                      let pointTotal8 = pointTotal7
                      let salaryTotal8 = salaryTotal7
                      let lineup8 = lineup7.slice()

                      pointTotal8 += parseFloat(player.expected_point_production)
                      salaryTotal8 += parseFloat(player.salary)
                      lineup8.push(player)

                      numberOfOperations++

                      if (salaryTotal8 > salaryCap) {
                        continue
                      } else if (pointTotal8 > highestProduction) {
                        highestProduction = pointTotal8
                        bestLineup = lineup8
                      }
                    }
                  }
                }
              })
            })
          })
        })
      })
    })
    console.log("number of operations: " + numberOfOperations)
    this.setState({lineup: bestLineup})
  }

  // genLineupRecursivly() {
    // let quarterbacks = truncatePlayers(this.state.quarterbacks, "QB")
    // let runningbacks = truncatePlayers(this.state.runningbacks, "RB")
    // let receivers = truncatePlayers(this.state.receivers, "WR")
    // let tightends = truncatePlayers(this.state.tightends, "TE")
    // let defenses = this.state.defenses.sort((a,b) => {
    //   return b.expected_point_production - a.expected_point_production
    // }).slice(0,5)

  //   const maxLineupSpaces = {
  //     "QB": 1,
  //     "RB": 2,
  //     "WR": 4,
  //     "TE": 1,
  //     "DEF": 1
  //   }

  //   let currentPositionsFilled = {
  //     "QB": 0,
  //     "RB": 0,
  //     "WR": 0,
  //     "TE": 0,
  //     "DEF": 0
  //   }

  //   const salaryCap = 50000
  //   let lineup = []
  //   let currentCost = 0
  //   let maxPoints = 0
  //   let currentPoints = 0

  //   lineup = this.recurse(maxLineupSpaces, maxPoints, salaryCap, currentPositionsFilled, currentCost, currentPoints, all)
  //   console.log(lineup)
  // }

  // recurse(maxLineupSpaces, maxPoints, salaryCap, currentPositionsFilled, currentCost, currentPoints, players) {
  //   //base case
  //   if (currentCost > salaryCap) {
  //     return
  //   }
  //   //recurse here
    
  //   // recurse(maxLineupSpaces, maxPoints, salaryCap, )

  //   //return lineup
  // }

  // removePlayer(event) {
  //   debugger
  // }

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
            <h3 className="table-header" id="header-quarterbacks">All Available Quarterbacks</h3>
            <Table
              id="available-quarterbacks"
              players={this.state.quarterbacks}
              onRemovePlayer={this.removePlayer}
              weatherData={this.state.weatherData}
            />
            <h3 className="table-header" id="header-runningbacks">All Available Runningbacks</h3>
            <Table
              id="available-runningbacks"
              players={this.state.runningbacks}
              onRemovePlayer={this.removePlayer}
              weatherData={this.state.weatherData}
            />
            <h3 className="table-header" id="header-receivers">All Available Receivers</h3>
            <Table
              id="available-receivers"
              players={this.state.receivers}
              onRemovePlayer={this.removePlayer}
              weatherData={this.state.weatherData}
            />
            <h3 className="table-header" id="header-tightends">All Available Tightends</h3>
            <Table
              id="available-tightends"
              players={this.state.tightends}
              onRemovePlayer={this.removePlayer}
              weatherData={this.state.weatherData}
            />
            <h3 className="table-header" id="header-defenses">All Available Defenses</h3>
            <Table
              id="available-defenses"
              players={this.state.defenses}
              onRemovePlayer={this.removePlayer}
            />
          </div>
          <div className="Dynamic-Lineup">
            <UploadForm />
            <WeatherModifer modifyPlayerStats={this.modifyPlayerStats}/>
            {/* <button type="button" className="button" onClick={this.componentDidMount.bind(this)}>Reset</button> */}
            <button type="button" className="button" id="header-gen-lineups" onClick={this.genLineup}>Generate Lineup</button>
            <h3 id="header-gen-lineups">Generated Lineup</h3>
            <Table id="generated-lineup"
            players={this.state.lineup}
            weatherData={this.state.weatherData}
            />
          </div>
        </section>
      </div>
    );
  }
}

const truncatePlayers = (players, position) => {
  return players.filter(player => player.position === position)
                .sort((a,b) => {
                  return parseFloat(b.expected_point_production) - parseFloat(a.expected_point_production)
                })
                .slice(0,5)
}

export default App;