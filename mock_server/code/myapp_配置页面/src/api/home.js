import {
  HOME_FETCH_SUMMARY_DATA_FOR_FE,
  HOME_FETCH_DETAIL_DATA_FOR_FE
} from '../constants/ActionTypes';
import {
  allReducer,
  detailReducer
} from './delegates/home';
import {
  tryCatch,
  isValidDate,
  notFoundRes,
  invalidParamsRes,
} from './helper';

const reducerKeys = {
  all: `${HOME_FETCH_SUMMARY_DATA_FOR_FE},${HOME_FETCH_DETAIL_DATA_FOR_FE}`,
  detail: HOME_FETCH_DETAIL_DATA_FOR_FE
};

const Reducers = {
  [reducerKeys.all]: allReducer,
  [reducerKeys.detail]: detailReducer
};

const home = async (req) => {
  const {
    _accessId: accessId,
    query: {
      type,
      dateRange: dateRangeStr = '',
      pageSize = 10,
      pageNo = 1
    },
    session: {
      user
    }
  } = req;

  switch (type) {
    case reducerKeys.all:
    case reducerKeys.detail: {
      const dateRange = dateRangeStr.split(',');
      const valid = dateRange.length === 2
        && dateRange[0] <= dateRange[1]
        && isValidDate(dateRange[0])
        && isValidDate(dateRange[1]);

      if (!valid) {
        return invalidParamsRes;
      }

      const ret = await (Reducers[type])({
        accessId,
        user,
        timeout: 5000,
        data: {
          dateRange,
          pageSize,
          pageNo
        }
      });

      return {
        content: {
          data: ret
        }
      };
    }
    default:
      return notFoundRes;
  }
};

export default tryCatch(home);
