import React from 'react';
import Layout from '../components/Layout';
import home from './home';
import adManagement from './adManagement';
import notFound from './notFound';
import searchRules from './searchRules.js';
import showDetailRules from './showDetailRules.js';
import creatProjName from './creatProjName';

let prevRouteName = '';

export default {

  path: '/',

  // Keep in mind, routes are evaluated in order
  children: [
    {
      path: '/',
      action: () => ({
        status: 301,
        redirect: '/home',
      })
    },
    home,
    searchRules,
    showDetailRules,
    creatProjName,
    // adManagement,
    notFound
  ],

  async action({ store, next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    if (route.redirect) {
      return route;
    }
    //console.log(route, "object，其中title为首页--MockServerr")

    // Provide default values for title, description etc.
    route.title = `${route.title || '无标题页'} - MockServer`;
    route.description = route.description || 'MockServer中规则创建页面';

    return {
      ...route,
      component: <Layout>{route.component}</Layout>
    };
  },

};
