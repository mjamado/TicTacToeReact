import React, {Component, PropTypes} from 'react';
import {Card, CardTitle, CardText, CardActions} from 'react-toolbox/lib/card';
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
        <CardText>
          <p>Este projecto junta várias tecnologias necessárias ao pacote <b>React/Redux</b>.</p>
          <p>Algumas são necessárias em <i>runtime</i>, outras apenas para desenvolvimento.</p>
          <List>
            <ListSubHeader caption='Runtime' />
            <ListItem
              caption='React'
              legend={['Novo paradigma de desenvolvimento ', <i>front-end</i>, ' porque os engenheiros do ', <i>Facebook</i>, ' não conseguiam desenhar o ícone das notificações em tempo real (', <i>true story</i>, ')']} />
            <ListItem
              caption='React Router'
              legend={['Porque ', <i>single page applications</i>, ' são demasiado ', <i>hipster</i>, ' e são impossíveis de partilhar ', <i>links</i>, ' - a malta quer ', <i>deep-linking</i>]} />
            <ListItem
              caption='Redux'
              legend='Gestão do estado das apps fácil de entender, desenvolver e analisar - implementa uma boa ideia dos mesmos tipos do React, o Flux, mas melhor' />
            <ListItem
              caption='Reselect'
              legend={['Estar constantemente a partir o ', <i>state</i>, ' é mais eficaz com ', <i>memoization</i>, ' (', <i>ya</i>, ', isto é todo um tópico... para outra altura)']} />
            <ListItem
              caption='Redux Thunk'
              legend={['Porque nem todas as alterações de estado são síncronas e usar ', <i>promisses</i>, ' puras é uma dor de cabeça']} />
            <ListItem
              caption='Normalize.css'
              legend={['É tipo um ', <i>CSS reset</i>, ', mas menos agressivo']} />
            <ListItem
              caption='React Toolbox'
              legend={['Porque eu sou um nabo em design e componentes já feitos e bonitos é mesmo a minha praia (', <i>also: material design, yum...</i>, ')']} />
          </List>
          <List>
            <ListSubHeader caption='Para desenvolvimento' />
            <ListItem
              caption='Babel'
              legend={['Porque os ', <i>browsers</i>, ' demoram imenso a implementar coisas boas, como ES6 e JSX']} />
            <ListItem
              caption='SASS'
              legend='Na realidade, são vários pacotes relacionados com SCSS e CSS, incluindo módulos (o que também é todo um tópico para outra altura)' />
            <ListItem
              caption='Webpack'
              legend={['Este é que é mesmo todo um tópico - ou vários; compilação, packaging, servidor de desenvolvimento encapsulado, ', <i>hot reloading</i>, ', ', <i>auto-injection</i>, ' e sei lá mais o quê']} />
            <ListItem
              caption='Hot Loader'
              legend={['Gravar o ficheiro onde estás a trabalhar, e o ', <i>browser</i>, ' actualiza sozinho, mantendo o estado - quão espectacular é isto?']} />
            <ListItem
              caption='Redux DevTools'
              legend='Que acções foram disparadas e como alteraram o estado, com possibilidade de eliminar acções em qualquer altura' />
          </List>
          <p>Depois há mais uma série de outros pacotes de ferramentas, mas o essencial é isto.</p>
          <p>A <i>app</i> em si é um <i>remake</i> do <i>TicTacToe</i> que fiz para o <i>LikeFriends</i>, mas <i>standalone</i>. Não vou voltar a explicar a motivação e a heurística da coisa</p>
          <p>Ide jogar!</p>
        </CardText>
        <CardActions>
          <Button raised primary><Link to="/play">{translations.play}</Link></Button>
        </CardActions>
      </Card>
    )
  }
}

TicTacToeIndex.propTypes = {
  translations: PropTypes.object.isRequired,
}

export default connect(TicTacToeSelector)(TicTacToeIndex)