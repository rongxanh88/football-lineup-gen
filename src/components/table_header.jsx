import React, { Component } from 'react';

class TableHeader extends Component {
  render() {
    return (
      <tr>
        <th>Position</th>
        <th>Player Name</th>
        <th>Projected Point Production</th>
        <th>Salary</th>
      </tr>
    )
  }
}

export default TableHeader;