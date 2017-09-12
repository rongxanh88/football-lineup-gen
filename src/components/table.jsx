import React, { Component } from 'react';
//import css too

import TableHeader from './table_header'
import PlayerRow from './player_row'

class LineupTable extends Component {
  render() {
    return (
      <table className="lineup-table">
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

export default LineupTable;