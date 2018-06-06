'use strict';

const Controller = require('egg').Controller;

class ActivityController extends Controller {
  async create() {
    const { ctx, app } = this;
    try {
      await app.mysql.insert('front_biz_advertisement', {
        bizId: ctx.request.body.bizId || '',
        bizType: ctx.request.body.bizType || '',
        cityId: ctx.request.body.cityId || '',
        region: ctx.request.body.region || '',
        sortNum: ctx.request.body.sortNum || '',
        createTime: Math.round(new Date().getTime() / 1000),
      });
      ctx.body.code = 1;
    } catch (err) {
      console.log(err);
      return
    };
  }

  async list() {
    const { ctx, app } = this;
    const options = {
      limit: 10,
      offset: 0
    };
    if (ctx.query.pageSize) {
      options.limit = ctx.query.pageSize;
    }
    if (ctx.query.pageNo) {
      options.offset = ctx.query.pageSize * ctx.query.pageNo;
    }
    const advertising = await app.mysql.select('front_biz_advertisement', options);
    ctx.body.code = 1;
    ctx.body.data = advertising;
  }
}

module.exports = ActivityController;