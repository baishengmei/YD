import React from 'react';
import MockContent from '../components/MockContent/MockContent.js';

export default {

  path: '/home',

  async action() {
    return {
      title: '首页',
      component: <MockContent />,
    };
  },

};
