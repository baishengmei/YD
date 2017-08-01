import React from 'react';
import SearchRules from '../components/SearchRules/SearchRules.js';

export default {

  path: '/searchrules',

  async action() {
    return {
      title: '查询规则',
      component: <SearchRules />,
    };
  },

};
