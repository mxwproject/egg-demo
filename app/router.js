'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/activity')(app);
  require('./router/advertising')(app);
};
