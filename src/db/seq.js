/*
 * @Description: sequelize 实例
 * @Author: 王振
 * @Date: 2021-07-09 10:30:46
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-09 10:31:15
 */

const Sequelize = require('sequelize');
const { MYSQL_CONF } = require('../conf/db');
const { isProd, isTest } = require('../utils/env');

const { host, user, password, database } = MYSQL_CONF;
const conf = {
  host,
  dialect: 'mysql',
  timezone: '+08:00', // 时区，北京时间
};

if (isTest) {
  conf.logging = () => {};
}

// 线上环境，使用连接池
if (isProd) {
  conf.pool = {
    max: 5, // 连接池中最大的连接数量
    min: 0, // 最小
    idle: 10000, // 如果一个连接池 10 s 之内没有被使用，则释放
  };
}

const seq = new Sequelize(database, user, password, conf);

module.exports = seq;
