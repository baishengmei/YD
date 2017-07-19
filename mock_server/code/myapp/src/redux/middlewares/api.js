import { sendErrorMessage } from '../../actions/Message';

export default function api(client) {
  return () => next => (action) => {
    const { promise, types, ...rest } = action;
    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ ...rest, type: REQUEST });

    return promise(client)
    .then((payload) => {
      next({ ...rest, payload, type: SUCCESS });
    })
    .catch((error) => {
      next({ ...rest, type: FAILURE });
      console.log('http error', error);
      next(sendErrorMessage(error.message));
    });
  };
}
