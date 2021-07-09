/*
 * @Description: json schema 验证中间件
 * @Author: 王振
 * @Date: 2021-07-09 10:38:32
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-09 10:39:05
 */

const { ErrorModel } = require('../model/ResModel');
const { jsonSchemaFileInfo } = require('../model/ErrorInfo');

/**
 * 生成 json schema 验证的中间件
 * @param {function} validateFn 验证函数
 */
function genValidator(validateFn) {
  // 定义中间件函数
  async function validator(ctx, next) {
    // 校验
    const data = ctx.request.body;
    const error = validateFn(data);
    if (error) {
      console.log(error);
      // 验证失败
      ctx.body = new ErrorModel(jsonSchemaFileInfo);
      return;
    }
    // 验证成功，继续
    await next();
  }
  // 返回中间件
  return validator;
}

module.exports = {
  genValidator,
};
