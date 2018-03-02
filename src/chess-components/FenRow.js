import React, { Component } from 'react';
import CharMap from './CharMap';

export default class FenRow extends Component {

  render() {
    this.row = this.parseFen(this.props.row);
    return (<tr>
      {this.row.map((d,i) => (
        <td ref={c => {d.element = c;}} index={i} key={d.fen+i} className={this.getClass(this.props.index, i)} onClick={this.props.select.bind(null,i)}>
          <div className="chess-piece">{CharMap[d.fen]}</div>
        </td>
      ))}
    </tr>);
  }

  parseFen(fenRow) {
    const row = [];
    fenRow.split('').forEach(c => {
      if (isNaN(c)) row.push(c);
      else for (let i=0; i<(+c); i++) {
        row.push('');
      }
    });
    if (row.length !== 8) throw new Error('Wrong row length')
    return row.map(d => ({fen: d}));
  }

  getClass(row, col) {
    const selected = (this.props.selected === col)? 'selected ' : '';
    return selected + ((row%2 === col%2)? 'dark' : 'light');
  }
}
