import React, {Component} from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

let DevTools;

if (DEBUG) {
  DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey='ctrl-h' changePositionKey='ctrl-q' theme='monokai'>
      <LogMonitor />
    </DockMonitor>
  );
} else {
  DevTools = React.createClass({
    render() {
      return null;
    }
  });
}

export default DevTools;