'use strict';

module.exports = options => {
  return async function verifyStatus(ctx, next) {
    if (!ctx.req.user.purview) {
			ctx.body.msg = '未开通权限';
			return
    };
    const userPurview = ctx.req.user.purview.split(',');
    if (userPurview.indexOf(options.purview.toString()) === -1) {
			ctx.body.msg = '未开通权限';
			return
    };
    await next();
  };
};