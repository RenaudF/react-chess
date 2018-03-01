import React, { Component } from 'react';
import FenRow from './FenRow';

export default class FenBoard extends Component {
  
    parseFen(fenCode) {
      // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
      const [board] = fenCode.split(' '); // ignoring other params for now
      const rows = board.split('/');
      return rows;
    }
  
    render() {
      const rows = this.parseFen(this.props.fenCode);
      return (
        <div className="chess-board">
          <table>
            <tbody>
              {rows.map((r,i) => (<FenRow row={r} key={r+i} rowOddity={i%2}/>))}
            </tbody>
          </table>
        </div>
      );
    }
  }