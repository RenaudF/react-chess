import React, { Component } from 'react';
import CharMap from './CharMap';

export default class FenRow extends Component {

  render() {
    this.row = this.parseRow(this.props.row);
    return (<tr>
      {this.row.map((c,i) => (
        <td index={i} key={c+i} className={this.getClass(this.props.index, i)} onClick={this.props.select.bind(null,i)}>{CharMap[c]}</td>
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
    if (row.length !== 8) throw new Error('Wrong row length')
    return row;
  }

  getClass(row, col) {
    return (row%2 === col%2)? 'dark' : 'light';
  }
}
