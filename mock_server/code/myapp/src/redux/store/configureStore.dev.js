import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createLogger from '../middlewares/logger'
import api from '../middlewares/api'
import auth from '../middlewares/auth'
import message from '../middlewares/message'
import rootReducer from '../reducers'
import httpClient from '../../core/HttpClient';
// import DevTools from '../../components/DevTools'

export default function configureStore(preloadedState) {
  // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
  let devToolsExtension = f => f;
  // eslint-disable-next-line no-underscore-dangle
  if (process.env.BROWSER && window.__REDUX_DEVTOOLS_EXTENSION__) {
    // eslint-disable-next-line no-underscore-dangle
    devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__();
  }

  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(thunk, api(httpClient), createLogger(), auth, message),
      // DevTools.instrument()
      devToolsExtension
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
