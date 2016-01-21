import {createSelector} from 'reselect';

const squaresSelector = state => state.squares;
const translationsSelector = state => state.translations[state.gameAux.language];
const scoreSelector = state => state.score;
const gameAuxSelector = state => state.gameAux;

export const TicTacToeSelector = createSelector(
  squaresSelector,
  translationsSelector,
  scoreSelector,
  gameAuxSelector,
  (squares, translations, score, gameAux) => {
    return {
      squares,
      translations,
      score,
      gameAux
    }
  }
);