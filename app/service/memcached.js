'use script';

const Service = require('egg').Service;

class Memcached extends Service {
  set(key, value, lifetime) {
    return this.app.memcached.setAsync(key, value, lifetime);
  }
  get(key) {
    return this.app.memcached.getAsync(key);
  }
}

module.exports = Memcached;