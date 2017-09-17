import React, { Component } from 'react'
import RangeInput from './range_input'

class WeatherModifier extends Component {
  constructor(props) {
    super(props)

    this.rangeChange = this.rangeChange.bind(this)

    this.state = {
      lowTemp: 0,
      hiTemp: 0,
      lowWind: 0,
      hiWind: 0
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
      </div>
    )
  }
}

export default WeatherModifier