import React, { Component } from 'react';
import FenBoard from './FenBoard';
import './chess.css';

export default class ChessGame extends Component {

    constructor(props) {
      super(props);
      this.move = this.move.bind(this);
      this.onFenEdit = this.onFenEdit.bind(this);
      this.state = {
        fenCode: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
      };
    }
  
    render() {
      return (
        <div className="chess-game">
          <input type="text" value={this.state.fenCode} onChange={this.onFenEdit}/>
          <FenBoard fenCode={this.state.fenCode} move={this.move}/>
        </div>
      );
    }
  
    onFenEdit(event) {
      this.setState({fenCode: event.target.value});
    }
  
    move(from, to) {
      console.log('TODO');
    }
  }