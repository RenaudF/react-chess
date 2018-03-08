import React, { Component } from 'react';
import CharMap from './CharMap';

export default class ChessPiece extends Component {

    constructor(props) {
        super(props);
        if (!this.props.fen) throw new Error('A ChessPiece needs a valid fen prop');
        this.state = {
            player: (this.props.fen === this.props.fen.toLowerCase())? 'w' : 'b',
            display: CharMap[this.props.fen]
        };
    }
  
    render() {
        return (<div className="chess-piece">{this.state.display}</div>);
    }
}
