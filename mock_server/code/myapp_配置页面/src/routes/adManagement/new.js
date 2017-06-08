import React from 'react';
import { AdHierarchy } from '../../constants/MenuTypes';
import NewAd from '../../containers/NewAd';
import {
  getSponsorTabTypeFromAdLevel,
  getAdCampaignTabTypeFromAdLevel,
  getAdGroupTabTypeFromAdLevel,
} from '../../core/utils';

const { adCampaign, adGroup, adContent } = AdHierarchy;

const titles = {
  [adCampaign]: '新建推广系列',
  [adGroup]: '新建推广组',
  [adContent]: '新建创意',
};

const component = <NewAd />;

export default [
  {
    path: new RegExp(`^/(${adCampaign}|${adGroup}|${adContent})/new/?$`),
    async action(ctx, params) {
      const type = params[0];
      return {
        title: titles[type],
        component,
        params: {
          tabType: getSponsorTabTypeFromAdLevel(type),
        },
      };
    }
  },
  {
    path: new RegExp(`^/${adCampaign}/([0-9]+)/(${adGroup}|${adContent})/new/?$`),
    async action(ctx, params) {
      const adCampaignId = parseInt(params[0], 10);
      const type = params[1];
      return {
        title: titles[type],
        component,
        params: {
          tabType: getAdCampaignTabTypeFromAdLevel(type),
          adCampaignId,
        },
      };
    }
  },
  {
    path: new RegExp(`^/${adCampaign}/([0-9]+)/${adGroup}/([0-9]+)/${adContent}/new/?$`),
    async action(ctx, params) {
      const adCampaignId = parseInt(params[0], 10);
      const adGroupId = parseInt(params[1], 10);
      return {
        title: titles[adContent],
        component,
        params: {
          tabType: getAdGroupTabTypeFromAdLevel(adContent),
          adCampaignId,
          adGroupId,
        },
      };
    }
  },
];
