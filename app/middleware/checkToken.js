'use strict';

module.exports = options => {
  return async function checkToken(ctx, next) {
    ctx.body.code = -5;
    const token = ctx.cookies.get('NODESESSID', { encrypt: false, signed: false });
    const userId = ctx.cookies.get('FRONTUSERID', { encrypt: false, signed: false });
    if (!token || !userId) {
      ctx.body.msg = 'session不存在';
      return
    }
    const memToken = await ctx.service.memcached.get('frontToken' + userId);
    if (memToken != token) {
      ctx.body.msg = '无效session' ;
      return
    }
    const user = await ctx.service.mysql.get('front_user', { id: userId });
    if (!user) {
      ctx.body.msg = '用户不存在';
      return
    }
    ctx.req.user = user;
    await next();
  };
}; 