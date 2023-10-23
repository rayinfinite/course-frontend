// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 登录:OK POST /api/v1/account/login */
export async function login(body: API.LoginParam, options?: { [key: string]: any }) {
  return request<API.ResultLoginInfo>('/api/v1/account/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 忘记密码/修改密码:OK POST /api/v1/account/modify/password */
export async function modifyPassword(
  body: API.ModifyPasswordReq,
  options?: { [key: string]: any },
) {
  return request<API.ResultString>('/api/v1/account/modify/password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改个人信息:OK POST /api/v1/account/modify/userInfo */
export async function modifyUserInfo(
  body: API.ModifyUserInfoReq,
  options?: { [key: string]: any },
) {
  return request<API.ResultUserInfo>('/api/v1/account/modify/userInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册:OK POST /api/v1/account/register */
export async function register(body: API.RegisterReq, options?: { [key: string]: any }) {
  return request<API.ResultObject>('/api/v1/account/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户信息 GET /api/v1/account/userInfo */
export async function getUserInfo(options?: { [key: string]: any }) {
  return request<API.ResultUserInfo>('/api/v1/account/userInfo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录:暂时不用 GET /loginOut */
export async function loginOut(options?: { [key: string]: any }) {
  return request<API.ResultUserInfo>('/loginOut', {
    method: 'GET',
    ...(options || {}),
  });
}
