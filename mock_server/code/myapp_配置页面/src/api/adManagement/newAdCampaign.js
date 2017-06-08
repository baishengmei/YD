import {
  newAdCampaignReducer,
} from '../delegates/adManagement';
import {
  tryCatch,
  isValidDate,
  invalidParamsRes,
} from '../helper';
import {
  AdDeliveryObjectList,
  NewAdCampaignItems,
} from '../../constants/MenuTypes';
import {
  isValidBudget,
} from '../../core/utils';


const newAdCampaign = async (req) => {
  const {
    _accessId: accessId,
    body: {
      object,
      adCampaignName,
      budgetType,
      budget,
      clientType,
      startDateType,
      startDate,
      endDateType,
      endDate,
      runTimeRangeType,
      runTimeRange,
      regionType,
    },
    session: {
      user,
    }
  } = req;

  console.log('post data', req.body);

  let valid = object !== AdDeliveryObjectList[0].value
    && AdDeliveryObjectList.some(x => x.value === object)
    && typeof adCampaignName === 'string'
    && adCampaignName.length > 0
    && adCampaignName.length <= 25
    && (budgetType === NewAdCampaignItems.budget[0].value || isValidBudget(budget))
    && NewAdCampaignItems.clientType.some(ct => ct.value === clientType)
    && (startDateType === NewAdCampaignItems.startDate[0] || isValidDate(startDate))
    && (endDateType === NewAdCampaignItems.endDate[0] || isValidDate(endDate))
    && (startDate && endDate ? startDate <= endDate : true)
    && (runTimeRangeType === NewAdCampaignItems.runTimeRange[0].value
      || (typeof runTimeRange === 'string'
        && !/[^01-]/.test(runTimeRange)
        && runTimeRange.includes('0')
        // 7 个串，每个长度 24
        && runTimeRange.split('-').filter(x => x.length === 24).length === 7
      )
    );

  if (regionType !== NewAdCampaignItems.region[0].value) {
    // ...
    valid = false;
  }
  if (!valid) {
    return invalidParamsRes;
  }

  await newAdCampaignReducer({
    accessId,
    user,
    data: {
      object,
      adCampaignName,
      budgetType,
      clientType,
      startDateType,
      endDateType,
      runTimeRange,
      regionType,
    },
  });

  return {
    content: {}
  };
};

export default tryCatch(newAdCampaign);
