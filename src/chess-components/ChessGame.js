import React, { Component } from 'react';
import FenBoard from './FenBoard';
import CharMap from './CharMap';
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
      this.lastCorrectFen = this.state.fenCode;
    }
  
    render() {
      return (
        <div className="chess-game">
          <input type="text" value={this.state.fenCode} onChange={this.onFenEdit}/>
          <FenBoard ref={c => {this.board = c;}} fenCode={this.state.fenCode} select={this.select} selected={this.state.selected}/>
        </div>
      );
    }

    componentDidCatch(error, info) {
        console.warn('Invalid Fen input:', this.state.fenCode, '\n');
        console.warn('Reverting to last:', this.lastCorrectFen);
        this.setState({fenCode: this.lastCorrectFen});
    }
  
    onFenEdit(event) {
      this.setState({fenCode: event.target.value});
    }

    select(row, col) {
        const selected = [row,col];
        const toCell = this.getCell.apply(this, selected);
        this.setState(prev => {
            this.lastCorrectFen = prev.fenCode;
            if (prev.selected) {
                const fromCell = this.getCell.apply(this, prev.selected);
                if (fromCell.row === toCell.row && fromCell.col === toCell.col) {
                    return {selected: null};
                } else if (toCell.value && fromCell.player === toCell.player) {
                    console.warn('Player can\'t take his own pieces');
                } else {
                    this.move(fromCell, toCell);
                    return {selected: null};
                }
            } else if (toCell) {
                return {selected: selected};
            }
        })
    }

    getCell(row, col) {
        const value = this.board.rows[row].element.row[col].fen;
        return {
            value, row, col,
            player: value === value.toLowerCase()
        };
    }
  
    move(from, to) {
        const boardMatrix = this.board.rows.map(r => r.element.row.map(d => d.fen));

        boardMatrix[from.row][from.col] = "";
        boardMatrix[to.row][to.col] = from.value;
        if (to.value) console.log(CharMap[from.value] + ' takes ' + CharMap[to.value]);

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