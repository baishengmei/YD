import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import api from '../middlewares/api'
import auth from '../middlewares/auth'
import rootReducer from '../reducers'
import httpClient from '../../core/HttpClient';

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, api(httpClient), auth)
  )
}
