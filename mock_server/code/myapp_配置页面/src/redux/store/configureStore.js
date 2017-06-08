if (__DEV__) {
  // eslint-disable-next-line global-require
  module.exports = require('./configureStore.dev')
} else {
  // eslint-disable-next-line global-require
  module.exports = require('./configureStore.prod')
}
