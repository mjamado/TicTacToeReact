const initialState = {
  pt: {
    appTitle: 'TicTacToe v2',
    appSubTitle: 'Experiências com React, Redux, webpack e mais 50 coisas interessantes.',
    score: 'Classificação',
    victories: 'Vitórias',
    losses: 'Derrotas',
    ties: 'Empates',
    youwon: 'Ganhaste!',
    iwon: 'Ganhei!',
    itsatie: 'É um empate!',
    play: 'Jogar',
    home: 'Início',
    reset: 'Limpar'
  },
  en: {
    appTitle: 'TicTacToe v2',
    appSubTitle: 'Experiments with React, Redux, webpack and 50 more interesting stuff .',
    score: 'Score',
    victories: 'Victories',
    losses: 'Losses',
    ties: 'Ties',
    youwon: 'You won!',
    iwon: 'I won!',
    itsatie: 'It\'s a tie!',
    play: 'Play',
    home: 'Home',
    reset: 'Reset'
  }
};

export default function TranslationsReducer(state = initialState, action) {
  // no reducing at all
  return state;
}