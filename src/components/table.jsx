import React, { Component } from 'react';
//import css too

import TableHeader from './table_header'
import PlayerRow from './player_row'

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {id: props["id"]}
  }
  render() {
    return (
      <table className="lineup-table" id={this.state.id}>
        <thead>
          <TableHeader />
        </thead>
        <tbody>
          <PlayerRow />
          <PlayerRow />
          <PlayerRow />
          <PlayerRow />
          <PlayerRow />
          <PlayerRow />
          <PlayerRow />
          <PlayerRow />
          <PlayerRow />
        </tbody>
      </table>
    )
  }
}

export default Table;