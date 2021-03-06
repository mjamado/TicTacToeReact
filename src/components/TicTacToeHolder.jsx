import React, {Component, PropTypes} from 'react';
import {Card, CardTitle, CardActions} from 'react-toolbox/lib/card';
import {Button} from 'react-toolbox';
import {Link} from 'react-router';
import Dialog from 'react-toolbox/lib/dialog';

import TicTacToeBoard from '../components/TicTacToeBoard';
import TicTacToeScore from '../components/TicTacToeScore';
import styles from '../scss/TicTacToe';

export default class TicTacToeHolder extends Component {
  dialogText(status) {
    if (status === 'win') {
      return this.props.translations.youwon;
    } else if (status === 'loss') {
      return this.props.translations.iwon;
    } else if (status === 'tie') {
      return this.props.translations.itsatie;
    } else {
      return '';
    }
  }
  
  render() {
    const {
      translations,
      squares,
      gameAux,
      score,
      onSquareClick,
      onDialogOk,
      onReset
    } = this.props;
    
    return (
      <Card className={styles.card}>
        <CardTitle
            title={translations.appTitle}
            subtitle={translations.appSubTitle}
          />
        <TicTacToeBoard
          squares={squares}
          translations={translations}
          onSquareClick={(x, y) => onSquareClick(x, y)}
        />
        <TicTacToeScore {...{
            translations: translations,
            score: score
          }}
        />
        <CardActions className={styles.cardActions}>
          <Link to="/"><Button icon="home" raised primary>{translations.home}</Button></Link>
          <Button icon="autorenew" raised onMouseUp={onReset}>{translations.reset}</Button>
        </CardActions>
        <Dialog
          actions={[{label: 'Ok', onClick: onDialogOk}]}
          active={gameAux.status !== 'playing'}
          type='small'
        >
          <p>{this.dialogText(gameAux.status)}</p>
        </Dialog>
      </Card>
    )
  }
}

TicTacToeHolder.propTypes = {
  onSquareClick: PropTypes.func.isRequired,
  onDialogOk: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  squares: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  translations: PropTypes.object.isRequired,
  gameAux: PropTypes.object.isRequired,
  score: PropTypes.shape({
    victories: PropTypes.number.isRequired,
    losses: PropTypes.number.isRequired,
    ties: PropTypes.number.isRequired
  }).isRequired
}