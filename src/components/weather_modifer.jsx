import React, { Component } from 'react'
import RangeInput from './range_input'
import FeatureModifier from './modifier'

class WeatherModifier extends Component {
  constructor(props) {
    super(props)

    this.rangeChange     = this.rangeChange.bind(this)
    this.changeModifiers = this.changeModifiers.bind(this)
    this.updatePlayers   = this.updatePlayers.bind(this)

    this.state = {
      lowTemp: 0,
      hiTemp: 0,
      lowWind: 0,
      hiWind: 0,
      tempModifier: 1.0,
      windModifier: 1.0
    }
  }

  rangeChange(event) {
    let elements = event.target.children
    let low = parseInt(elements[2].value, 10)
    let high = parseInt(elements[3].value, 10)
    let tempFeature = elements[2].name.split('-')
    tempFeature = tempFeature[1]
    let windFeature = elements[3].name.split('-')
    windFeature = windFeature[1]

    if (tempFeature === "Temperature") {
      this.setState({lowTemp: low})
      this.setState({hiTemp: high})
    } else if (windFeature === "WindSpeed") {
      this.setState({lowWind: low})
      this.setState({hiWind: high})
    }
  }

  changeModifiers(event) {
    const feature = event.target.name
    const modifier = parseFloat(event.target.value)

    if (feature === "Temperature") {
      this.setState({tempModifier: modifier})
    } else if (feature === "WindSpeed") {
      this.setState({windModifier: modifier})
    }
  }

  updatePlayers() {
    const modifiers = this.state
    this.props.modifyPlayerStats(modifiers)
  }

  render() {
    return (
      <div>
        <RangeInput
          weatherFeature={"Temperature"}
          low={this.state.lowTemp}
          high={this.state.hiTemp}
          handleRangeChange={this.rangeChange}
        />
        <RangeInput
          weatherFeature={"WindSpeed"}
          low={this.state.lowWind}
          high={this.state.hiWind}
          handleRangeChange={this.rangeChange}
        />
        <div>
          <h6>Temperature Effect</h6>
          <FeatureModifier
            weatherFeature={"Temperature"}
            modifierChange={this.changeModifiers}
          />
          <h6>Wind Speed Effect</h6>
          <FeatureModifier
            weatherFeature={"WindSpeed"}
            modifierChange={this.changeModifiers}
          />
        </div>
        <button type="button" onClick={this.updatePlayers}>Update</button>
      </div>
    )
  }
}

export default WeatherModifier