import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from '../components/Html';
import { Provider } from 'react-redux';
import { match, createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from '../redux/store/configureStore';
import Root from '../containers/Root';
import { LOGIN_SUCCESS } from '../constants/ActionTypes';
import pkg from '../../package.json';

const keywords = pkg.keywords.join(', ');

export default (routes, isLogin = true) => async (req, res, next) => {
  try {
    const data = {
      title: '',
      keywords: keywords,
      description: '有道智选发布系统',
      css: '',
      body: ''
    };
    const css = [];

    const memoryHistory = createMemoryHistory(req.originalUrl);
    const store = configureStore();
    const history = syncHistoryWithStore(memoryHistory, store);

    const context = {
      insertCss: (...styles) => {
        styles.forEach(style => css.push(style._getCss()));
      },
      setTitle: value => data.title = value,
      setMeta: (key, value) => data[key] = value,
      getUA: () => req.headers['user-agent'],
      getUsername: () => isLogin ? req.session.user.email : ''
    };

    if ( isLogin ) {
      store.dispatch({
        type: LOGIN_SUCCESS,
        result: {
          username: context.getUsername()
        }
      });
    }

    // await new Promise((resolve, reject) => {
    //   match({
    //     history,
    //     routes,
    //     location: req.originalUrl
    //   }, (error, redirectLocation, renderProps) => {
    //     if (error) {
    //       reject(error);
    //       return;
    //     }
    //     const component = (
    //       <Provider store={store} key="provider">
    //         <div>
    //           <RouterContext {...renderProps} />
    //           <DevTools />
    //         </div>
    //       </Provider>
    //     );
    //     data.body = ReactDOM.renderToString(<component { context } />);
    //     data.css = css.join('');
    //     data.isLogin = isLogin;
    //     resolve();
    //   });
    // });
    //
    //
    data.body = ReactDOM.renderToString(
      <Root
        store={store}
        history={history}
        routes={routes}
        context={context} />
    );
    data.css = css.join('');
    data.isLogin = isLogin;

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} initialState={store.getState()} />);
    res.status(200).send('<!DOCTYPE html>\n' + html);
  } catch (err) {
    next(err);
  }
};