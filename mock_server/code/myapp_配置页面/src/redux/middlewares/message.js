import {
  SHOW_ALERT_MESSAGE,
  SHOW_INFO_MESSAGE,
  SHOW_WARN_MESSAGE,
  SHOW_ERROR_MESSAGE,
} from '../../constants/ActionTypes';

export default () => next => (action) => {
  switch (action.type) {
    case SHOW_ALERT_MESSAGE:
    case SHOW_INFO_MESSAGE:
    case SHOW_WARN_MESSAGE:
    case SHOW_ERROR_MESSAGE:
      alert(action.message);
      break;
    default:
      return next(action);
  }
};
