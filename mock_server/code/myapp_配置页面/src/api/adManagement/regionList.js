import {
  regionListReducer
} from '../delegates/adManagement';
import {
  tryCatch,
} from '../helper';

const regionList = async (req) => {
  const {
    _accessId: accessId,
    query: {
      keyword
    },
    session: {
      user
    }
  } = req;

  const ret = await regionListReducer({
    accessId,
    user,
    timeout: 5000,
    data: {
      keyword
    }
  });
  return {
    content: {
      data: ret
    }
  };
};

export default tryCatch(regionList);
