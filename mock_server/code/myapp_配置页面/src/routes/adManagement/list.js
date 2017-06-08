import React from 'react';
import {
  adListQueryConditionChange,
} from '../../actions/AdManagementList';
import { AdHierarchy } from '../../constants/MenuTypes';
import {
  getSponsorTabTypeFromAdLevel,
  getAdCampaignTabTypeFromAdLevel,
  getAdGroupTabTypeFromAdLevel,
} from '../../core/utils';
import AdManagementList from '../../containers/AdManagementList';

const { adCampaign, adGroup, adContent } = AdHierarchy;

const titles = {
  [adCampaign]: '推广系列',
  [adGroup]: '推广组',
  [adContent]: '创意',
};

const component = <AdManagementList />;

export default [
  {
    path: '/',
    action: () => ({
      status: 302,
      redirect: `/adManagement/${adCampaign}`,
    })
  },
  {
    path: new RegExp(`^/(${adCampaign}|${adGroup}|${adContent})/?$`),
    async action({ store }, params) {
      const type = params[0];
      const tabType = getSponsorTabTypeFromAdLevel(type);
      return {
        title: titles[type],
        component,
        beforeEnter: [
          () => {
            store.dispatch(adListQueryConditionChange(tabType, {}));
          }
        ]
      };
    }
  },
  {
    path: new RegExp(`^/${adCampaign}/([0-9]+)/(${adGroup}|${adContent})/?$`),
    async action({ store }, params) {
      const adCampaignId = parseInt(params[0], 10);
      const type = params[1];
      const tabType = getAdCampaignTabTypeFromAdLevel(type);
      return {
        title: titles[type],
        component,
        beforeEnter: [
          () => {
            store.dispatch(adListQueryConditionChange(tabType, {
              type: 'adCampaignId',
              adCampaignId,
            }));
          }
        ],
      };
    }
  },
  {
    path: new RegExp(`^/${adCampaign}/([0-9]+)/${adGroup}/([0-9]+)/${adContent}/?$`),
    async action({ store }, params) {
      const adCampaignId = parseInt(params[0], 10);
      const adGroupId = parseInt(params[1], 10);
      const tabType = getAdGroupTabTypeFromAdLevel(adContent);
      return {
        title: titles[adContent],
        component,
        beforeEnter: [
          () => {
            store.dispatch(adListQueryConditionChange(tabType, {
              type: 'adGroupId',
              adCampaignId,
              adGroupId,
            }));
          }
        ],
      };
    }
  },
];
