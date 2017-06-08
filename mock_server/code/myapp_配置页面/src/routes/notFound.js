import React from 'react';
import NotFound from '../pages/notFound';

const title = '页面不存在';

export default {

  path: '*',

  action() {
    return {
      title,
      status: 404,
      component: <NotFound title={title} />,
    };
  },

};
