import React, { Component } from 'react';

class PlayerRow extends Component {
  constructor(props) {
    super(props)

    // this.handleClick = this.handleClick.bind(this)
  }

  // handleClick(event) {
  //   debugger
  //   this.props.handleChange(event.target.parentElement.parentElement)
  // }

  render() {
    if (this.props.data.name === undefined) {
      const fullName = this.props.data.first_name + ' ' + this.props.data.last_name
      return (
        <tr className="player-row">
          <td height="15" className="player-detail">{this.props.data.position}</td>
          <td height="15" className="player-detail">{fullName}</td>
          <td height="15" className="player-detail">{this.props.data.expected_point_production}</td>
          <td height="15" className="player-detail">{this.props.data.salary}</td>
          {/* <td height="15" className="player-detail">
            <button type="button" onClick={this.handleClick}>Remove Player</button>
          </td> */}
        </tr>
      )
    } else {
      return (
        <tr className="player-row">
          <td height="15" className="player-detail">{this.props.data.name}</td>
          <td height="15" className="player-detail">{this.props.data.expected_point_production}</td>
          <td height="15" className="player-detail">{this.props.data.salary}</td>
          {/* <td height="15" className="player-detail">
            <button type="button" onClick={this.handleClick}>Remove Player</button>
          </td> */}
      </tr>
      )
    }
  }
}

export default PlayerRow;