/*
 * @Description: 存储配置
 * @Author: 王振
 * @Date: 2021-07-09 10:27:51
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-09 10:29:52
 */

const { isProd } = require('../utils/env');

// 本地Redis配置
let REDIS_CONF = {
  port: 6379,
  host: '127.0.0.1',
};

// 本地MySQL配置 里面的配置均为示例，以实际项目配置为主
let MYSQL_CONF = {
  host: 'localhost',
  user: 'root', //数据库账户
  password: 'root', //数据库密码
  port: '3306',
  database: 'template_db', //数据库名
};

if (isProd) {
  REDIS_CONF = {
    // 线上的 redis 配置
    port: 6379,
    host: '127.0.0.1',
  };

  MYSQL_CONF = {
    // 线上的 mysql 配置 里面的配置均为示例，以实际项目配置为主
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'template_db',
  };
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF,
};
