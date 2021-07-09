/*
 * @Description: 路由自动加载文件
 * @Author: 王振
 * @Date: 2021-07-09 10:13:15
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-09 10:13:29
 */

const requireDirectory = require('require-directory');
const Router = require('koa-router');

class InitManger {
  static InitCore(app) {
    // 入口方法
    InitManger.app = app;
    InitManger.InitLoadRouters();
  }

  static InitLoadRouters() {
    // 参数：第一个参数固定参数module，第二个参数要加载的模块的文件路径，第三个参数：每次加载一个参数执行的函数
    // 在node.js中process.cwd()方法可以获取项目的根路径
    const Url = `${process.cwd()}/src/routes`;
    const modules = requireDirectory(module, Url, { visit: whenModuleLoad });

    function whenModuleLoad(obj) {
      if (obj instanceof Router) {
        InitManger.app.use(obj.routes());
      }
    }
  }
}

module.exports = InitManger;
