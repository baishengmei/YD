import React from 'react';
import { IndexRoute, Route } from 'react-router';
import NotFoundPage from './components/NotFoundPage';
import App from './containers/App';
import IndexPage from './containers/IndexPage';

/**
 * Please keep routes in alphabetical order
 */
const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={IndexPage} />
    <Route path="index" component={IndexPage} />
    { /* Routes */ }
    {/*<Route path="about" component={About}/>*/}

    { /* Catch all route */ }
    <Route path="*" component={NotFoundPage} status={404} />
  </Route>
)

export default routes;