import React from 'react';
import ReactDOM from 'react-dom/server';
// maybe it's eslint bug for import/extensions
import UniversalRouter from 'universal-router'; // eslint-disable-line import/extensions
import configureStore from '../redux/store/configureStore';
import App from '../components/App';
import Html from '../components/Html';
import setRuntimeVariable from '../actions/Runtime';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import pkg from '../../package.json';

const keywords = pkg.keywords.join(', ');

export default (routes, isLogin = true) => async (req, res, next) => {
  try {
    const store = configureStore({
      auth: {
        status: 'initial',
        user: req.session.user || null
      }
    });

    store.dispatch(setRuntimeVariable({
      name: 'initalNow',
      value: Date.now(),
    }));

    const css = new Set();

    const context = {
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
      // for material-ui
      // getUA: () => req.headers['user-agent'],
      // Initialize a new Redux store
      // http://redux.js.org/docs/basics/UsageWithReact.html
      store,
      path: req.path,
    };

    const route = await UniversalRouter.resolve(routes, {
      ...context,
      query: req.query,
    });

    if (route.redirect) {
      return res.redirect(route.status || 302, route.redirect);
    }

    if (route.beforeEnter) {
      route.beforeEnter.forEach(fn => fn());
    }

    const data = {
      description: '有道智选发布系统',
      keywords,
      ...route
    };
    data.children = ReactDOM.renderToString(<App context={context}>{route.component}</App>);
    data.state = store.getState();

    data.styles = [
      { id: 'css', cssText: [...css].join('') }
    ];
    data.isLogin = isLogin;

    data.scripts = [
      assets.vendor.js,
      assets.client.js,
    ];

    if (route.chunk) {
      data.scripts.push(assets[route.chunk].js);
    }

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200).send(`<!DOCTYPE html>\n${html}`);
  } catch (err) {
    next(err);
  }
};
