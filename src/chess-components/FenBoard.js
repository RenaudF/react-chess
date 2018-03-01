import React, { Component } from 'react';
import FenRow from './FenRow';

export default class FenBoard extends Component {
  
    parseFen(fenCode) {
      // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
      const [board] = fenCode.split(' '); // ignoring other params for now
      const rows = board.split('/');
      if (rows.length !== 8) throw 'Wrong number of rows';
      return rows.map(d => ({ fen: d }));
    }
  
    render() {
      this.rows = this.parseFen(this.props.fenCode);
      return (
        <div className="chess-board">
          <table>
            <tbody>
              {this.rows.map((r,i) => (
                <FenRow ref={c => {r.element = c;}} row={r.fen} index={i} key={r.fen+i} select={this.props.select.bind(null,i)}/>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }