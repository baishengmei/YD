import {
  financeBudgetReducer,
  updateSponsorBudgetReducer,
} from '../delegates/adManagement';
import {
  tryCatch,
} from '../helper';
import {
  isValidBudget,
} from '../../core/utils';

const getFinanceBudget = tryCatch(async (req) => {
  const {
    _accessId: accessId,
    session: {
      user
    }
  } = req;

  const ret = await financeBudgetReducer({
    accessId,
    user,
  });
  return {
    content: {
      data: ret
    }
  };
});

const updateSponsorBudget = tryCatch(async (req) => {
  const {
    _accessId: accessId,
    session: {
      user
    },
    body: {
      dailyBudget
    },
  } = req;

  if (!isValidBudget(dailyBudget)) {
    return {
      content: {
        errcode: 403,
        errmsg: '预算值域不符合要求！',
      }
    };
  }

  await updateSponsorBudgetReducer({
    accessId,
    user,
    dailyBudget,
  });

  return {
    content: {}
  };
});

export {
  getFinanceBudget,
  updateSponsorBudget,
};
