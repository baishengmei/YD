import list from './list';
import newAd from './new';

export default {

  path: '/adManagement',
  children: [
    ...list,
    ...newAd,
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    if (route.redirect) {
      return route;
    }

    // Provide default values for title, description etc.
    route.title = `${route.title} - 首页--MockServer--保存`;
    route.description = route.description || '';

    return route;
  },

};
