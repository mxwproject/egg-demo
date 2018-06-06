'use strict';

module.exports = options => {
  return async function verifyStatus(ctx, next) {
    if (ctx.req.user.status === 1) {
			ctx.body.code = 100;
			ctx.body.msg = '未启用';
		}
    await next();
  };
};