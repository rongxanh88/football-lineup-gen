import React, { Component } from 'react'

import TableHeader from './table_header'
import PlayerRow from './player_row'

class Table extends Component {
  constructor(props) {
    super(props)

    this.toPlayerRow = this.toPlayerRow.bind(this)
    this.handleRow = this.handleRow.bind(this)
  }

  handleRow(element) {
    this.props.onRemovePlayer(element)
  }

  render() {
    return (
      <table className="lineup-table" id={this.props.id}>
        <thead>
          <TableHeader />
        </thead>
        <tbody>
          {this.props.players.map(this.toPlayerRow)}
        </tbody>
      </table>
    )
  }

  toPlayerRow(player) {
    return (
      <PlayerRow
        key={player.id}
        data={player}
        weatherData={this.props.weatherData}
        handleRow={this.handleRow}
      />
    )
  }
}


export default Table;