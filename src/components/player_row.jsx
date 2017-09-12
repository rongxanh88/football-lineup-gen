import React, { Component } from 'react';
//import css too

const player = {
  position: "RB",
  full_name: "Terrell Davis",
  expected_point_production: "30.0",
  salary:  "7600"
}

class PlayerRow extends Component {
  render() {
    return (
      <tr className="player-row">
        <td className="player-detail">{player.position}</td>
        <td className="player-detail">{player.full_name}</td>
        <td className="player-detail">{player.expected_point_production}</td>
        <td className="player-detail">{player.salary}</td>
      </tr>
    )
  }
}

export default PlayerRow;