const dateRe = /^\d{4}-\d{2}-\d{2}$/;
const isValidDate = dateStr => dateRe.test(dateStr) && !isNaN(Date.parse(dateStr));

const tryCatch = (fn, that = undefined) => async (req, res, next) => {
  try {
    const {
      status = 200,
      content: {
        errcode = 0,
        errmsg = '',
        data
      }
    } = await fn.call(that, req, res, next);

    res.status(status).send({
      errcode,
      errmsg,
      data
    });
  } catch (err) {
    next(err);
  }
};

const notFoundRes = {
  status: 404,
  content: {
    errcode: 404,
    errmsg: '访问的资源不存在!',
  }
};

const invalidParamsRes = {
  content: {
    errcode: 403,
    errmsg: '请求参数不正确！',
  }
};

export {
  tryCatch,
  isValidDate,
  notFoundRes,
  invalidParamsRes,
};
