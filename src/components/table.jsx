import React, { Component } from 'react';

import TableHeader from './table_header'
import PlayerRow from './player_row'

class Table extends Component {
  render() {
    return (
      <table className="lineup-table" id={this.props.id}>
        <thead>
          <TableHeader />
        </thead>
        <tbody>
          {this.props.players.map(toPlayerRow)}
        </tbody>
      </table>
    )
  }
}

const toPlayerRow = (player)  => {
  return (
    <PlayerRow data={player}/>
  )
}

export default Table;