import {
  FETCH_ADCAMPAIGN_LIST_FOR_FE,
  FETCH_ADGROUP_LIST_FOR_FE,
  FETCH_ADCONTENT_LIST_FOR_FE,
} from '../../constants/ActionTypes';
import {
  AdCampaignGroupStatusList,
  AdContentStatusList,
  AdDeliveryObjectList,
} from '../../constants/MenuTypes';
import {
  queryAdCampaignListReducer,
  queryAdGroupListReducer,
  queryAdContentListReducer,
} from '../delegates/adManagement';
import {
  tryCatch,
  notFoundRes,
} from '../helper';

const dateRe = /^\d{4}-\d{2}-\d{2}$/;
const numberRe = /^\d+$/;

const queryAdEntityList = async (req) => {
  const {
    _accessId: accessId,
    query: {
      type,
      adCampaignId,
      adGroupId,
      startDate,
      endDate,
      keyword,
      status,
      object,
      pageSize,
      pageNo,
    } = {},
    session: {
      user
    }
  } = req;

  let valid = dateRe.test(startDate)
    && dateRe.test(endDate)
    && (adCampaignId ? numberRe.test(adCampaignId) : true)
    && (adGroupId ? numberRe.test(adGroupId) : true)
    && numberRe.test(pageSize)
    && numberRe.test(pageNo)
    && AdDeliveryObjectList.some(x => x.value === object);
  if (valid) {
    switch (type) {
      case FETCH_ADCAMPAIGN_LIST_FOR_FE:
      case FETCH_ADGROUP_LIST_FOR_FE:
        valid = AdCampaignGroupStatusList.some(x => x.value === status);
        break;
      case FETCH_ADCONTENT_LIST_FOR_FE:
        valid = AdContentStatusList.some(x => x.value === status);
        break;
      default:
        valid = false;
    }
  }
  if (!valid) {
    return {
      content: {
        errcode: 403,
        errmsg: '请求参数不正确！',
      }
    };
  }

  const params = {
    accessId,
    user,
    timeout: 10000,
    data: {
      startDate,
      endDate,
      keyword,
      status,
      object,
      pageSize,
      pageNo,
    }
  };

  switch (type) {
    case FETCH_ADCAMPAIGN_LIST_FOR_FE: {
      const ret = await queryAdCampaignListReducer(params);
      return {
        content: {
          data: ret
        }
      };
    }
    case FETCH_ADGROUP_LIST_FOR_FE: {
      if (adCampaignId) {
        params.data.adCampaignId = adCampaignId;
      }
      const ret = await queryAdGroupListReducer(params);
      return {
        content: {
          data: ret
        }
      };
    }
    case FETCH_ADCONTENT_LIST_FOR_FE: {
      if (adGroupId) {
        params.data.adGroupId = adGroupId;
      } else if (adCampaignId) {
        params.data.adCampaignId = adCampaignId;
      }
      const ret = await queryAdContentListReducer(params);
      return {
        content: {
          data: ret
        }
      };
    }
    default:
      // will never be executed
      return notFoundRes;
  }
};

export default tryCatch(queryAdEntityList);
