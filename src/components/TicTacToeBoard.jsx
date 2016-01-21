import React, {Component, PropTypes} from 'react';
import {CardText} from 'react-toolbox/lib/card';

import TicTacToeSquare from './TicTacToeSquare';
import styles from '../scss/TicTacToe';

export default class TicTacToeBoard extends Component {
  render() {
    return (
      <CardText className={styles.board}>
        {this.props.squares.map((square, index) =>
          <TicTacToeSquare key={index} {...square} onClick={() => this.props.onSquareClick(square.x, square.y)} />
        )}
      </CardText>
    );
  }
}

TicTacToeBoard.propTypes = {
  onSquareClick: PropTypes.func.isRequired,
  squares: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  translations: PropTypes.object.isRequired
};