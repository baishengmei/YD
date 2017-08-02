import React from 'react';
import ShowDetailRules from '../components/SearchRules/showDetailRules.js';

export default {

  path: '/showdetailrules',
  // path: new RegExp("^\/showdetailrules.*$"),

  async action() {
    return {
      title: '详细规则',
      component: <ShowDetailRules />,
    };
  },

};
