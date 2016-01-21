import React, {Component, PropTypes} from 'react';
import {CardText} from 'react-toolbox/lib/card';
import {List, ListItem, ListSubHeader} from 'react-toolbox';

export default class TicTacToeScore extends Component {
  render() {
    const {translations, score} = this.props;

    return (
      <CardText>
        <List>
          <ListSubHeader caption={translations.score} />
          <ListItem
            caption={translations.victories + ': ' + score.victories.toString(10)}
            leftIcon='mood'
          />
          <ListItem
            caption={translations.losses + ': ' + score.losses.toString(10)}
            leftIcon='mood_bad'
          />
          <ListItem
            caption={translations.ties + ': ' + score.ties.toString(10)}
            leftIcon='radio_button_unchecked'
          />
        </List>
      </CardText>
    );
  }
}

TicTacToeScore.propTypes = {
  translations: PropTypes.shape({
    victories: PropTypes.string.isRequired,
    losses: PropTypes.string.isRequired,
    ties: PropTypes.string.isRequired
  }).isRequired,
  score: PropTypes.shape({
    victories: PropTypes.number.isRequired,
    losses: PropTypes.number.isRequired,
    ties: PropTypes.number.isRequired
  }).isRequired
};