import React, { Component } from 'react';
import FenBoard from './FenBoard';
import './chess.css';

export default class ChessGame extends Component {

    constructor(props) {
      super(props);
      this.select = this.select.bind(this);
      this.onFenEdit = this.onFenEdit.bind(this);
      this.state = {
        fenCode: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
        selected: null
      };
    }
  
    render() {
      return (
        <div className="chess-game">
          <input type="text" value={this.state.fenCode} onChange={this.onFenEdit}/>
          <FenBoard ref={c => {this.board = c;}} fenCode={this.state.fenCode} select={this.select}/>
        </div>
      );
    }
  
    onFenEdit(event) {
      this.setState({fenCode: event.target.value});
    }

    select(row, col) {
        let selected = [row,col];
        this.setState(prev => {
            if (prev.selected) {
                this.move(prev.selected, selected);
                return Object.assign({}, prev, {selected: null});
            } else {
                return Object.assign({}, prev, {selected: selected});
            }
        })
    }
  
    move(from, to) {
        const fromValue = this.board.rows[from[0]].element.row[from[1]];
        if (!fromValue) return;
        const toValue = this.board.rows[to[0]].element.row[to[1]];
        const boardMatrix = this.board.rows.map(r => r.element.row.map(d => d));

        boardMatrix[from[0]][from[1]] = "";
        boardMatrix[to[0]][to[1]] = fromValue;
        if (toValue) console.log(fromValue + ' takes ' +toValue);

        const newFen = boardMatrix.map(d => d.reduce((a,b) => {
            if (b === "") {
                const head = a.slice(0, a.length-1);
                const tail = a.charAt(a.length-1);
                if (!isNaN(tail)) return head + (+tail+1);
                else return head + tail + 1
            } else return a + b;
        }, "")).join('/');

        setTimeout(() => this.setState({fenCode: newFen}));
    }
  }