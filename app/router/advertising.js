'use strict';

module.exports = app => {
  const { router, controller } = app;
  app.router.get('/eapi/advertising', controller.advertising.list);  
  app.router.post('/eapi/advertising', controller.advertising.create);  
};