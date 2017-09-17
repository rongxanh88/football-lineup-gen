import React, { Component } from 'react'

class Popup extends Component {
  render() {
    if (this.props.weather) {
      const low = this.props.weather.low
      const high = this.props.weather.high
      const wc = this.props.weather.windChill
      const ws = this.props.weather.windSpeed
      const forecast = this.props.weather.forecast
      const link = this.props.weather.imageLink
      let isDome = ''

      if (this.props.weather.isDome === "0") {
        isDome = "No"
      } else {
        isDome = "Yes"
      }
      return (
        <td className="weather" style={this.props.visibility}>
          Dome: {isDome} low: {low} high: {high} forecast: {forecast} Wind Chill: {wc} Wind Speed: {ws}
          <img src={link} />
        </td>
      )
    } else {
      return (
        <td></td>
      )
    }
  }
}

export default Popup