/*
 * @Description: user 数据格式校验
 * @Author: 王振
 * @Date: 2021-07-09 10:51:01
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-09 10:51:16
 */

const validate = require('./_validate');

// 校验规则
const SCHEMA = {
  type: 'object',
  properties: {
    userName: {
      type: 'string',
      maxLength: 255,
      minLength: 2,
    },
    password: {
      type: 'string',
      maxLength: 255,
      minLength: 3,
    },
    newPassword: {
      type: 'string',
      maxLength: 255,
      minLength: 3,
    },
    nickName: {
      type: 'string',
      maxLength: 255,
    },
    picture: {
      type: 'string',
      maxLength: 255,
    },
    gender: {
      type: 'number',
      minimum: 1,
      maximum: 3,
    },
  },
};

/**
 * 校验用户数据格式
 * @param {Object} data 用户数据
 */
function userValidate(data = {}) {
  return validate(SCHEMA, data);
}

module.exports = userValidate;
