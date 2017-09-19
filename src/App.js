import React, { Component } from 'react'
import getData from './services/fantasy_football_service'
import './App.css'
import appHelper from './helpers/app-helper'

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
    const players = {
      quarterbacks: this.state.quarterbacks,
      runningbacks: this.state.runningbacks,
      receivers:    this.state.receivers,
      tightends:    this.state.tightends,
      defenses:     this.state.defenses
    }

    const bestLineup = appHelper.genLineup(players)
    this.setState({lineup: bestLineup})
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
            <h4>Click on any row to expand weather data!</h4>
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

export default App;