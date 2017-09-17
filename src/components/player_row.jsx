import React, { Component } from 'react'
import Popup from './popup'

class PlayerRow extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.findWeather = this.findWeather.bind(this)
    this.changeWeatherVisibility = this.changeWeatherVisibility.bind(this)
    this.state = {
      weather: [],
      visibility: {display: "none"}
    }
  }

  componentDidMount() {
    this.findWeather()
  }

  handleClick(event) {
    this.props.handleRow(event.target.parentElement.parentElement)
  }

  findWeather() {
    const team = this.props.data.team
    const weatherData = this.props.weatherData || []
    const weathers = weatherData.filter(data => {
      if (data.awayTeam === team || data.homeTeam === team) {
        return data
      }
    })
    const weather = weathers[0]
    this.setState({weather: weather})
  }

  changeWeatherVisibility() {
    if (this.state.visibility.display === 'none') {
      this.setState({visibility: {display: 'block'}})
      console.log('visible')
    } else {
      this.setState({visibility: {display: 'none' }})
      console.log('none')
    }
  }

  render() {
    if (this.props.data.name === undefined) {
      const fullName = this.props.data.first_name + ' ' + this.props.data.last_name
      return (
        <tr className="player-row" onMouseUp={this.changeWeatherVisibility}>
          <td height="15" className="player-detail">{this.props.data.position}</td>
          <td height="15" className="player-detail">{fullName}</td>
          <td height="15" className="player-detail">{this.props.data.expected_point_production}</td>
          <td height="15" className="player-detail">{this.props.data.salary}</td>
          <td height="15" className="player-detail">
            <button type="button" onClick={this.handleClick}>Remove</button>
          </td>
          <Popup weather={this.state.weather} visibility={this.state.visibility} />
        </tr>
      )
    } else {
      return (
        <tr className="player-row">
          <td height="15" className="player-detail">{this.props.data.position}</td>
          <td height="15" className="player-detail">{this.props.data.name}</td>
          <td height="15" className="player-detail">{this.props.data.expected_point_production}</td>
          <td height="15" className="player-detail">{this.props.data.salary}</td>
          <td height="15" className="player-detail">
            <button type="button" onClick={this.handleClick}>Remove</button>
          </td>
      </tr>
      )
    }
  }
}

export default PlayerRow