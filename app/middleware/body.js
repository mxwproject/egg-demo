'use strict';

module.exports = options => {
  return async function body(ctx, next) {
    ctx.body = {
        code: -1,
        msg: '',
        data: '',
    };
    await next();
  };
};