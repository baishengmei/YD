import {
  FETCH_QUICKSEARCH_LIST,
  FETCH_QUICKSEARCH_LIST_SUCCESS,
  FETCH_QUICKSEARCH_LIST_FAIL,
} from '../../../../constants/ActionTypes'

const initialState = {
  status: 'initial',
  root: {
    id: 'root',
    name: '所有广告内容',
    role: 'root',
    children: []
  },
};

const qsList = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_QUICKSEARCH_LIST:
      return {
        ...state,
        status: 'loading',
      }
    case FETCH_QUICKSEARCH_LIST_SUCCESS:
      return {
        status: 'success',
        root: {
          ...state.root,
          children: payload
        },
      }
    case FETCH_QUICKSEARCH_LIST_FAIL:
      return {
        ...state,
        status: 'loading'
      }
    default:
      return state
  }
}

export default qsList
