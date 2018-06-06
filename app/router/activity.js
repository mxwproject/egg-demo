'use strict';

module.exports = app => {
  const { router, controller } = app;
  app.router.get('/eapi/activity',app.middleware.verifyPurview({ purview: 4 }), controller.activity.list);  // 活动列表
  app.router.post('/eapi/activity', app.middleware.verifyPurview({ purview: 4 }), controller.activity.create); // 新建活动
  app.router.post('/eapi/activity/status', app.middleware.verifyPurview({ purview: 4 }), controller.activity.status);  // 修改活动状态
  app.router.get('/eapi/activity/message', app.middleware.verifyPurview({ purview: 4 }), controller.activity.message);  // 留言列表
  app.router.post('/eapi/activity/message/status', app.middleware.verifyPurview({ purview: 4 }), controller.activity.messageStatus); // 审核留言状态
};