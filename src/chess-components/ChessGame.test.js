import React from 'react';
import ReactDOM from 'react-dom';
import ChessGame from './ChessGame';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('should initialise the board properly', () => {
    const rootNode = mount(<ChessGame />).getDOMNode();
    const rows = Array.from(rootNode.querySelectorAll('tr'));
    expect(rows.length).toEqual(8);
    rows.forEach(row => {
        const cells = Array.from(row.querySelectorAll('td'));
        expect(cells.length).toEqual(8);
    })
    const cells = Array.from(rootNode.querySelectorAll('td'));
    const boardText = cells.map(d => d.textContent).join();
    expect(boardText).toEqual("♖,♘,♗,♕,♔,♗,♘,♖,♙,♙,♙,♙,♙,♙,♙,♙,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,♟,♟,♟,♟,♟,♟,♟,♟,♜,♞,♝,♛,♚,♝,♞,♜");
});