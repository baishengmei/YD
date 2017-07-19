import { getIdGenerator } from '../core/serverUtils';

const idGenerator = getIdGenerator();

// 给 req 加 _accessId，
// _accessId 为了联系 node response 和 java response
const setAccessId = (req, res, next) => {
  req._accessId = idGenerator(); // eslint-disable-line no-underscore-dangle, no-param-reassign
  next();
};

export default setAccessId;
