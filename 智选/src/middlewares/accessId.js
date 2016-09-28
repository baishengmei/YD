import { getIdGenerator } from '../core/serverUtils';

var idGenerator = getIdGenerator();

// 给 req 加 _accessId，
// _accessId 为了联系 node response 和 java response
const setAccessId = (req, res, next) => {
  req._accessId = idGenerator();
  next();
};

export default setAccessId;
