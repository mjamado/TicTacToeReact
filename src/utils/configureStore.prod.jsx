import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import TicTacToeReducers from '../reducers/TicTacToeReducers';

const finalCreateStore = compose(
  applyMiddleware(thunk)
)(createStore);

export default function configureStore(state) {
  return finalCreateStore(TicTacToeReducers, state);
};