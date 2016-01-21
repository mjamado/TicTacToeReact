import {combineReducers} from 'redux';

import SquaresReducer from './SquaresReducer';
import TranslationsReducer from './TranslationsReducer';
import ScoreReducer from './ScoreReducer';
import GameAuxReducer from './GameAuxReducer';

const TicTacToeReducer = combineReducers({
  squares: SquaresReducer,
  translations: TranslationsReducer,
  score: ScoreReducer,
  gameAux: GameAuxReducer
});

export default TicTacToeReducer;