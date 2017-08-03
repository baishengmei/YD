import React from 'react';
import CreatProjName from '../components/SearchRules/CreateProjName.js';

export default {

  path: '/createprojectname',

  async action() {
    return {
      title: '创建项目组',
      component: <CreatProjName />,
    };
  },

};
