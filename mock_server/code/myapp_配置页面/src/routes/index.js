import React from 'react';
import Layout from '../components/Layout';
import home from './home';
import adManagement from './adManagement';
import notFound from './notFound';
import AdManagementList from '../containers/AdManagementList';
import { resetAdListQueryCondition } from '../actions/AdManagementList';

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
    adManagement,
    notFound
  ],

  async action({ store, next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    if (route.redirect) {
      return route;
    }

    // Provide default values for title, description etc.
    route.title = `${route.title || '无标题页'} - MockServer`;
    route.description = route.description || '';

    const curRouteName = route.component.type.displayName;

    if (prevRouteName !== '' && prevRouteName !== curRouteName && curRouteName === AdManagementList.displayName) {
      route.beforeEnter = [
        () => {
          store.dispatch(resetAdListQueryCondition());
        }
      ].concat(route.beforeEnter || []);
    }
    prevRouteName = curRouteName;

    return {
      ...route,
      component: <Layout>{route.component}</Layout>
    };
  },

};
