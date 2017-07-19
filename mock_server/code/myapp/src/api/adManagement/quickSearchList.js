import {
  quickSearchListReducer
} from '../delegates/adManagement';
import {
  tryCatch,
} from '../helper';

const quickSearchList = async (req) => {
  const {
    _accessId: accessId,
    query: {
      keyword
    },
    session: {
      user
    }
  } = req;

  const ret = await quickSearchListReducer({
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

export default tryCatch(quickSearchList);
