'use script';

const Service = require('egg').Service;

class Mysql extends Service {
  get(table, options) {
    return this.app.mysql.get(table, options);
  }
}

module.exports = Mysql;