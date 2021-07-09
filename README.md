# koa2-template

### 介绍
[koa2-template](https://github.com/1260323835/koa2-template)是一个后端服务的解决方案，他基于[koa-generator](https://github.com/i5ting/koa-generator)实现，但是koa-gengrator搭建的项目只有最基本的服务，如果我们使用它的话，还需要添加自己的配置，每次新建项目都要重复劳动，所以我就想着把我自己在实际工作中所搭建的项目模版开源出来，供大家参考学习，希望能对大家有所帮助。

### 软件架构
本项目已经为你生成了一个基本的后端开发框架，下面是整个项目的目录结构。

```bash
├── .husky                     # Git Hook 工具
├── bin                        # 启动目录
│   │── www                    # 启动文件配置
├── src                        # 源代码
│   ├── cache                  # 连接方法
│   ├── conf                   # 全局常量配置
│   ├── controller             # 控制层
│   ├── db                     # 数据库
│   ├── middlewares            # 中间件
│   ├── model                  # 响应模型
│   ├── public                 # 静态资源
│   ├── routes                 # 路由
│   ├── services               # 服务层
│   ├── utils                  # 工具函数
│   ├── validator              # 校验
│   ├── views                  # 前端模版文件-只做服务端忽略
│   ├── app.js                 # 入口文件
├── test                       # 测试
├── .cz-config.js              # 集成 Commitizen 实现规范提交配置文件
├── .editorconfig              # 编辑相关配置
├── .eslintignore              # eslint忽略文件
├── .eslintrc.js               # eslint 配置
├── .prettierrc                # Prettier 配置
├── commitlint.config.js       # 集成 commitlint 验证提交规范
├── package.json               # package.json 依赖
```

### 安装教程

#### 前序准备

你需要在本地安装 [node](http://nodejs.org/) ，Koa 依赖 **node v7.6.0** 或 ES2015及更高版本和 async 方法支持。

#### 安装依赖 

```bash
npm install
```

#### 启动本地开发环境（自带热启动）

```bash
npm run dev
```

#### 构建生产环境 

```bash
npm run prd
```

### 运行单元测试

```bash
npm run test
```

### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request  

### License

[MIT License](https://github.com/1260323835/koa2-template/blob/main/LICENSE)