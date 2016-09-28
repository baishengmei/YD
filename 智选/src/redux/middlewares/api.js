import {  sendErrorMessage } from '../../actions/Message';

export default function api(client) {

  return ({dispatch, getState}) => {
    return next => action => {

      const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});

      return promise(client)
      .then( result => next({...rest, result, type: SUCCESS}) )
      .catch( errorMessage => {
        next({...rest, type: FAILURE});
        next(sendErrorMessage(errorMessage));
      });
    };
  };
}
