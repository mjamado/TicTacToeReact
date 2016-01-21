import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import * as actions from '../actions/TicTacToeActions';
import TicTacToeHolder from '../components/TicTacToeHolder';
import {TicTacToeSelector} from '../selectors/TicTacToeSelector';

class TicTacToe extends Component {
  render() {
    const {dispatch, squares, gameAux, translations, score} = this.props;
    
    return (
      <TicTacToeHolder
        squares={squares}
        translations={translations}
        score={score}
        gameAux={gameAux}
        onSquareClick={(x, y) => dispatch(actions.playerPlay(x, y))}
        onDialogOk={() => dispatch(actions.resetBoard())}
      /> 
    )
  }
}

TicTacToe.propTypes = {
  squares: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  translations: PropTypes.shape({
    victories: PropTypes.string.isRequired,
    losses: PropTypes.string.isRequired,
    ties: PropTypes.string.isRequired
  }).isRequired,
  gameAux: PropTypes.object.isRequired,
  score: PropTypes.shape({
    victories: PropTypes.number.isRequired,
    losses: PropTypes.number.isRequired,
    ties: PropTypes.number.isRequired
  }).isRequired
}

export default connect(TicTacToeSelector)(TicTacToe)