import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Chess</h2>
        </div>
        <p className="App-intro">
          Basic chessboard implementation in React.
        </p>
        <ChessGame />
      </div>
    );
  }
}

class ChessGame extends Component {

  constructor(props) {
    super(props);
    this.move = this.move.bind(this);
    this.state = {
      fenCode: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
    };
  }

  render() {
    return (
      <div className="chess-game">
        <input type="text" value={this.state.fenCode}/>
        <FenBoard fenCode={this.state.fenCode} move={this.move}/>
      </div>
    );
  }

  move(from, to) {
    console.log('TODO');
  }
}

class FenBoard extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      board: this.parseFen(this.props.fenCode)
    };
  }

  parseFen(fenCode) {
    // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
    const [board] = fenCode.split(' '); // ignoring other params for now
    const rows = board.split('/').map(this.parseRow);
    return rows;
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

  render() {
    return (
      <div className="chess-board">
        <table>
          <tbody>
            {this.state.board.map((r,i) => (<FenRow row={r} rowOddity={i%2}/>))}
          </tbody>
        </table>
      </div>
    );
  }
}

class FenRow extends Component {

  render() {
    return (<tr>
      {this.props.row.map((c,i) => (<td className={this.getClass(i%2)}>{c}</td>))}
    </tr>);
  }

  getClass(columnOddity) {
    return (this.props.rowOddity === columnOddity)? 'dark' : 'light';
  }
}

export default App;
