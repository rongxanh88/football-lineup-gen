import React, { Component } from 'react'

class RangeInput extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.handleRangeChange(event)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>{this.props.weatherFeature} Range</label><br/>
        Lo: <input type="number" name={"lo-" + this.props.weatherFeature} />
        Hi: <input type="number" name={"hi-" + this.props.weatherFeature} />
        <input type="submit" value="Set Ranges"/>
      </form>
    )
  }
}

export default RangeInput