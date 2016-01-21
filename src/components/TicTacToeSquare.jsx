import React, {Component, PropTypes} from 'react';
import {Button} from 'react-toolbox/lib/button';

export default class TicTacToeSquare extends Component {
  getIcon() {
    if (this.props.status === 'player') {
      return 'close';
    } else if (this.props.status === 'ai') {
      return 'radio_button_unchecked';
    } else {
      return ' ';
    }
  }

  render() {
    return (
      <Button
        raised
        disabled={this.props.status !== 'available'}
        onClick={this.props.onClick}
        icon={this.getIcon()}>
      </Button>
    );
  }
}

TicTacToeSquare.propTypes = {
  onClick: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};