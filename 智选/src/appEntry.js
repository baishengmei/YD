import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import context from './clientContext';
import Root from './containers/Root';
import routes from './routes';
import configureStore from './redux/store/configureStore';

const appContainer = document.getElementById('app');

function render(store, history) {
  ReactDOM.render(
    <Root
      store={store}
      routes={routes}
      history={history}
      context={context}/>,
    appContainer
  );
}

function run() {
  const store = configureStore(window.__PRELOADED_STATE__);
  delete window.__PRELOADED_STATE__;
  const history = syncHistoryWithStore(browserHistory, store);

  // Make taps on links and buttons work fast on mobiles
  FastClick.attach(document.body);

  render(store, history);
}

// Run the application when both DOM is ready and page content is loaded
if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body) {
  run();
} else {
  document.addEventListener('DOMContentLoaded', run, false);
}
