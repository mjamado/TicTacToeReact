import React, {Component, PropTypes} from 'react';
import {Card, CardTitle, CardText, CardActions, CardMedia} from 'react-toolbox/lib/card';
import {List, ListItem, ListSubHeader, Button} from 'react-toolbox';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import styles from '../scss/TicTacToe';
import {TicTacToeSelector} from '../selectors/TicTacToeSelector';

class TicTacToeIndex extends Component {
  render() {
    const translations = this.props.translations;
    
    return (
      <Card className={styles.index}>
        <CardTitle
          title={translations.appTitle}
          subtitle={translations.appSubTitle}
        />
        <CardMedia
          aspectRatio="wide"
          image={require('file?name=imgs/index.jpg!../imgs/index.jpg')}
        />
        <CardText>
          <p><i>Remake</i> do <i>TicTacToe</i> que fiz para o <i>LikeFriends</i>, mas <i>standalone</i>.</p>
          <p>Este projecto junta várias tecnologias necessárias ao pacote <b>React/Redux</b>, e também pode servir como <i>boilerplate</i>.</p>
          <p>Ide jogar!</p>
        </CardText>
        <CardActions>
          <Link to="/play"><Button raised primary>{translations.play}</Button></Link>
        </CardActions>
      </Card>
    )
  }
}

TicTacToeIndex.propTypes = {
  translations: PropTypes.object.isRequired,
}

export default connect(TicTacToeSelector)(TicTacToeIndex)