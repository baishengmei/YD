import { SET_RUNTIME_VARIABLE } from '../constants/ActionTypes';

export default function setRuntimeVariable({ name, value }) {
  return {
    type: SET_RUNTIME_VARIABLE,
    payload: {
      name,
      value,
    },
  };
}
