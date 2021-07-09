/*
 * @Description: 测试服务 jest server
 * @Author: 王振
 * @Date: 2021-07-09 10:19:57
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-09 10:20:14
 */

const request = require('supertest');
const server = require('../src/app').callback();

module.exports = request(server);
