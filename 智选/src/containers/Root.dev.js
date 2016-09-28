import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import withContext from '../decorators/withContext';
import injectTapEventPlugin from 'react-tap-event-plugin';
import DevTools from './DevTools';

injectTapEventPlugin();

@withContext
export default class Root extends Component {
  render() {
    const { store, history, routes } = this.props
    return (
      <Provider store={store} key="provider">
        <div>
          <Router history={history} routes={routes} />
          <DevTools />
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  routes: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.element,
    PropTypes.array,
  ]).isRequired
}
