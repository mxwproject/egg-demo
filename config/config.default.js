'use strict';

const nodeServerConf = require('../../nodeServer.json');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1522143671925_1046';

  // add your config here
  // config.middleware = ['body', 'checkToken', 'verifyStatus'];
  config.middleware = ['body'];
  config.memcache = {
    url: nodeServerConf.memcached.host + ':' + nodeServerConf.memcached.port,
  };
  config.mysql = {
    client: {
      host: nodeServerConf.mysql.galaxy.host,
      port: '3306',
      user: nodeServerConf.mysql.galaxy.user,
      password: nodeServerConf.mysql.galaxy.password,
      database: nodeServerConf.mysql.galaxy.database,
    },
  };
  config.security = {
    csrf: {
      enable: false,
    },
  };
  return config;
};
