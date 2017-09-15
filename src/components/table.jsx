import React, { Component } from 'react';

import TableHeader from './table_header'
import PlayerRow from './player_row'

class Table extends Component {
  constructor(props) {
    super(props)

    // this.handleRow = this.handleRow.bind(this)
  }

  // handleRow(element) {
  //   //inside table component
  //   debugger
  // }

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
    <PlayerRow key={player.id} data={player}/>
    // <PlayerRow key={player.id} data={player} handleChange={this.handleRow} />
  )
}

export default Table;