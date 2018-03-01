import React, { Component } from 'react';
import CharMap from './CharMap';

export default class FenRow extends Component {

  render() {
    this.row = this.parseRow(this.props.row);
    return (<tr>
      {this.row.map((c,i) => (
        <td key={c+i} className={this.getClass(i%2)} onClick={this.props.select.bind(null,i)}>{CharMap[c]}</td>
      ))}
    </tr>);
  }

  parseRow(fenRow) {
    const row = [];
    fenRow.split('').forEach(c => {
      if (isNaN(c)) row.push(c);
      else for (let i=0; i<(+c); i++) {
        row.push('');
      }
    });
    return row;
  }

  getClass(columnOddity) {
    return (this.props.rowOddity === columnOddity)? 'dark' : 'light';
  }
}
