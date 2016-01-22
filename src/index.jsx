import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {Provider} from 'react-redux';
import ToolboxApp from 'react-toolbox/lib/app';

import DevTools from './utils/devTools';
import configureStore from './utils/configureStore';
import App from './components/App';
import TicTacToe from './containers/TicTacToe';
import TicTacToeIndex from './containers/TicTacToeIndex';

const store = configureStore();

render(
  <Provider store={store}>
    <ToolboxApp>
      <Router history={createBrowserHistory()}>
        <Route path="/" component={App}>
          <IndexRoute component={TicTacToeIndex} />
          <Route path="play" component={TicTacToe} />
        </Route>
      </Router>
      <DevTools />
    </ToolboxApp>
  </Provider>,
  document.getElementById('content')
);