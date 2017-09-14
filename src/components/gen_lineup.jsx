import React, { Component } from 'react'

class Button extends Component {
  constructor(props) {
    super(props)
    this.state = {value: ''}
  }

  render() {
    return (
      <button type="button" id={this.props.id}>{this.props.text}</button>
    )
  }
}

export default Button