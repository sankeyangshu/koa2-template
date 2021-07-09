/*
 * @Description: 时间相关的工具函数
 * @Author: 王振
 * @Date: 2021-07-09 10:49:29
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-09 10:49:43
 */

const { format } = require('date-fns');

/**
 * @description: 格式化时间
 * @param {string} str 时间字符串
 */
function timeFormat(str) {
  return format(new Date(str), 'yyyy-MM-dd HH:mm:ss');
}

module.exports = {
  timeFormat,
};
