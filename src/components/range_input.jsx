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
    const feature = this.props.weatherFeature
    return (
      <form onSubmit={this.handleSubmit}>
        <label>{feature} Range</label><br/>
        Lo: <input className="num-input" type="number" name={"lo-" + feature} />
        Hi: <input className="num-input" type="number" name={"hi-" + feature} />
        <input type="submit" value="Set Ranges"/>
      </form>
    )
  }
}

export default RangeInput