import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { persistState } from 'redux-devtools';
import thunk from 'redux-thunk';

import TicTacToeReducers from '../reducers/TicTacToeReducers';
import DevTools from './devTools';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  DevTools.instrument(),
  persistState(getDebugSessionKey())
)(createStore);

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
}

export default function configureStore(state) {
  const store = finalCreateStore(TicTacToeReducers, state);

  if (module.hot) {
    module.hot.accept('../reducers/TicTacToeReducers', () =>
      store.replaceReducer(require('../reducers/TicTacToeReducers'))
    );
  }

  return store;
}