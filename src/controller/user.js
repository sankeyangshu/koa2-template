/*
 * @Description: 用户-控制层 user-controller
 * @Author: 王振
 * @Date: 2021-07-09 10:44:38
 * @LastEditors: 王振
 * @LastEditTime: 2021-07-09 10:45:46
 */

const { getUserInfo, createUser, updateUser } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo,
  changeInfoFailInfo,
  changePasswordFailInfo,
} = require('../model/ErrorInfo');
const { SECRET } = require('../conf/constant');
const doCrypto = require('../utils/cryp');
const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify);

/**
 * 用户名是否存在
 * @param {string} userName 用户名
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    // 已存在
    return new SuccessModel(userInfo);
  } else {
    // 不存在
    return new ErrorModel(registerUserNameNotExistInfo);
  }
}

/**
 * 用户注册
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function register({ userName, password }) {
  const userInfo = await getUserInfo(userName);
  // 判断用户名是否存在
  if (userInfo) {
    // 用户名已存在
    return new ErrorModel(registerUserNameExistInfo);
  }

  // 用户注册
  try {
    // 注册成功
    await createUser({
      userName,
      password: doCrypto(password),
    });
    return new SuccessModel();
  } catch (ex) {
    // 注册失败
    console.error(ex.message, ex.stack);
    return new ErrorModel(registerFailInfo);
  }
}

/**
 * 用户登录
 * @param {Object} ctx koa2 ctx上下文
 * @param {string} userName 用户名
 * @param {string} password 密码
 */
async function login(ctx, userName, password) {
  // 获取用户信息
  const userInfo = await getUserInfo(userName, doCrypto(password));
  if (!userInfo) {
    // 登录失败
    return new ErrorModel(loginFailInfo);
  }

  // 登录成功,使用jwt加密用户信息，返回token
  const token = jwt.sign(userInfo, SECRET, { expiresIn: '4h' });
  const data = { token, userInfo };
  return new SuccessModel(data);
}

/**
 * 修改个人信息
 * @param {Object} ctx ctx上下文
 * @param {string} nickName 昵称
 * @param {string} city 城市
 * @param {string} picture 头像
 */
async function changeInfo(ctx, { nickName, picture }) {
  // 解析token，获取用户信息
  const token = ctx.header.authorization;
  const payload = await verify(token.split(' ')[1], SECRET);
  const { userName } = payload;
  if (!nickName) {
    nickName = userName;
  }
  const result = await updateUser(
    {
      newNickName: nickName,
      newPicture: picture,
    },
    { userName }
  );
  if (result) {
    // 执行成功
    return new SuccessModel();
  }
  // 失败
  return new ErrorModel(changeInfoFailInfo);
}

/**
 * 修改个人密码
 * @param {object} ctx 上下文
 * @param {string} password 旧密码
 * @param {string} newPassword 新密码
 */
async function changePassword(ctx, { password, newPassword }) {
  // 解析token，获取用户信息
  const token = ctx.header.authorization;
  const payload = await verify(token.split(' ')[1], SECRET);
  const { userName } = payload;
  const result = await updateUser(
    { newPassword: doCrypto(newPassword) },
    {
      userName,
      password: doCrypto(password),
    }
  );
  if (result) {
    // 修改成功
    return new SuccessModel();
  }

  // 修改失败
  return new ErrorModel(changePasswordFailInfo);
}

module.exports = {
  isExist,
  register,
  login,
  changeInfo,
  changePassword,
};
