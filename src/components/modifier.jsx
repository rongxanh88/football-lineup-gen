import React, { Component } from 'react'

class FeatureModifier extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.props.modifierChange(event)
  }

  render() {
    return (
      <select name={this.props.weatherFeature} onChange={this.handleChange}>
        <option value={1.0}>No Effect</option>
        <option value={0.95}>Light Effect</option>
        <option value={0.9}>Medium Effect</option>
        <option value={0.8}>Heavy Effect</option>
      </select>
    )
  }
}

export default FeatureModifier