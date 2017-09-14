import React, { Component } from 'react';

class PlayerRow extends Component {
  render() {
    const fullName = this.props.data.first_name + ' ' + this.props.data.last_name
    return (
      <tr className="player-row">
        <td height="50" className="player-detail">{this.props.data.position}</td>
        <td height="50" className="player-detail">{fullName}</td>
        <td height="50" className="player-detail">{this.props.data.expected_point_production}</td>
        <td height="50" className="player-detail">{this.props.data.salary}</td>
      </tr>
    )
  }
}

export default PlayerRow;