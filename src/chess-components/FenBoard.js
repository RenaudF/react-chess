import React, { Component } from 'react';
import FenRow from './FenRow';

export default class FenBoard extends Component {
  
    parseFen(fenCode) {
      // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
      const [board] = fenCode.split(' '); // ignoring other params for now
      const rows = board.split('/');
      if (rows.length !== 8) throw new Error('Wrong number of rows');
      return rows.map(d => ({ fen: d }));
    }
  
    render() {
      this.rows = this.parseFen(this.props.fenCode);
      return (
        <div className="chess-board">
          <table>
            <tbody>
              {this.rows.map((d,i) => (
                <FenRow ref={c => {d.element = c;}} row={d.fen} index={i} key={d.fen+i} select={this.props.select.bind(null,i)} selected={(this.props.selected && this.props.selected[0] === i)? this.props.selected[1] : undefined}/>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }