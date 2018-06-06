'use strict';

const Controller = require('egg').Controller;

class ActivityController extends Controller {
  async create() {
    const { ctx, app } = this;
    if (ctx.request.body.type != 1) {
      return ctx.body.msg = '参数不正确';
    }
    await app.mysql.insert('front_activity', {
      title: ctx.request.body.title || '',
      type: ctx.request.body.type || '',
      remark: ctx.request.body.remark || '',
      create_time: Math.round(new Date().getTime() / 1000),
      status: 2,
    });
    ctx.body.code = 1;
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
    const activities = await app.mysql.select('front_activity', options);
    ctx.body.code = 1;
    ctx.body.data = activities;
  }

  async status() {
    const { ctx, app } = this;
    if (ctx.request.body.status != 1 && ctx.request.body.status != 2) {
      return ctx.body.msg = '参数不正确';
    }
    if (!ctx.request.body.id) {
      return ctx.body.msg = '参数不正确';
    }
    const { id, status } = ctx.request.body;
    const activity = await app.mysql.get('front_activity', { id: id });    
    if (!Object.keys(activity).length) {
      return ctx.body.msg = '参数不正确';
    }
    await app.mysql.update('front_activity', {
      status: status,
      update_time: Math.round(new Date().getTime() / 1000)
    }, {
      where: {
        id: id
      }
    });
    ctx.body.code = 1;
  }

  async message() {
    const { ctx, app } = this;
    const options = {
      where: {},
      limit: 10,
      offset: 0,
    };
    if (ctx.query.pageSize) {
      options.limit = ctx.query.pageSize;
    }
    if (ctx.query.pageNo) {
        options.offset = ctx.query.pageSize * ctx.query.pageNo;
    }
    if (ctx.query.status || ctx.query.status === '0') {
        options.where.status = ctx.query.status;
    }
    if (ctx.query.activityId) {
        options.where.activity_id = ctx.query.activityId;
    }
    const messages = await app.mysql.select('front_activity_message', options);
    ctx.body.code = 1;
    ctx.body.data = messages;
  }

  async messageStatus() {
    const { ctx, app } = this;
    if (ctx.request.body.status != 1 && ctx.request.body.status != 2) {
      return ctx.body.msg = '参数不正确';
    }
    if (!ctx.request.body.id) {
      return ctx.body.msg = '参数不正确';
    }
    const { id, status } = ctx.request.body;
    const message = await app.mysql.get('front_activity_message', { id: id });
    if (!Object.keys(message).length) {
      return ctx.body.msg = '参数不正确';
    }
    if (message.status != 0) {
      return ctx.body.msg = '已审核';
    }
    await app.mysql.update('front_activity_message',{ 
      status: status,
      update_time: Math.round(new Date().getTime() / 1000),
      check_time: Math.round(new Date().getTime() / 1000),
    }, {
      where: {
        id: id
      }
    });
    ctx.body.code = 1;
  }
}

module.exports = ActivityController;