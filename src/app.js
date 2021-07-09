/*
 * @Description: 项目入口文件
 * @Author: 王振
 * @Date: 2021-07-09 09:47:53
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-09 10:52:51
 */
const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const jwtKoa = require('koa-jwt');
const cors = require('koa2-cors'); // 跨域

// 获取密匙
const { SECRET, No_Verification } = require('./conf/constant');

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(
  views(__dirname + '/views', {
    extension: 'ejs',
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// 跨域问题处理
app.use(cors());

// 中间件对401错误进行检查,koa-jwt插件就可以对token进行验证，验证就是检查秘钥是否相等，相等就可以接着进行请求。
app.use(async (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        code: 401,
        msg: err.message,
      };
    } else {
      throw err;
    }
  });
});

// jwt权限验证
app.use(
  jwtKoa({
    secret: SECRET,
  }).unless({
    path: No_Verification, // 自定义那些目录忽略jwt验证
  })
);

// 路由自动加载
const InitManger = require('./utils/init');
InitManger.InitCore(app);

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
