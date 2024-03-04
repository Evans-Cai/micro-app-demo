import request from '@/utils/request.js';
import { getUserInfo } from '@/utils/auth.js';
/**
 * 自动注册
 * /sso/login/platform
 * **/
export function autoLogin(data) {
  return request({
    url: '/sso/login/platform',
    method: 'POST',
    data: data
  })
}
/**
 * 登录用户
 * **/
export function login(data) {
  return request({
    url: '/sso/login/org',
    // url: '/sso/login/pass',
    method: 'POST',
    data
  })
}
/**
 * 获取登录用户基本信息
 * **/
export function getInfo(token) {
  return request({
    url: '/user/profile',
    // url: '/user/info',
    method: 'GET'
  })
}
/**
 * 退出
 * **/
export function logout() {
  const info = JSON.parse(getUserInfo());
  return request({
    url: '/sso/logout',
    method: 'POST',
    data: { accessToken: info.accessToken, refreshToken: info.refreshToken }
  })
}
/**
 * @name 用户修改密码
 * @url /user/resetUserPassword
 * @param pass.originalPassWord 原始密码
 * @param pass.resetPassWord 新密码
 * */
export function resetUserPassword(pass) {
  return request({
    url: '/user/resetUserPassword',
    method: 'POST',
    data: { ...pass }
  })
}
/**
 * @url user/resetPassword/verifyPhoneCode
 * @name 用户找回密码
 * @param pass.userName 用户名
 * @param pass.mobile 手机号
 * @param pass.password 新密码
 * @param pass.code 手机验证码
 * */
export function forgetPass(pass) {
  return request({
    url: '/user/forgetPass',
    method: 'POST',
    data: { ...pass }
  })
}
/**
 * @url user/resetPassword/verifyPhoneCode
 * @name 用户修改密码
 * @param pass.originalPassWord 原始密码
 * @param pass.resetPassWord 新密码
 * */
export function verifyPhoneCode(pass) {
  return request({
    url: '/user/resetPassword/verifyPhoneCode',
    method: 'POST',
    data: { ...pass }
  })
}
/**
 * @name 用户修改个人信息
 * @param data
 * **/
export function updateUser(data) {
  return request({
    url: '/user/updateUser',
    method: 'POST',
    data: { ...data, ...{ realName: data.name } }
  })
}
/**
 * @name 用户修改医生个人信息
 * @param { string } data.introduction // 非必填
 * @param { string } data.skill // 非必须
 * **/
export function editorDoctorProfile(data) {
  return request({
    url: '/clinic/doctor/profile',
    method: 'POST',
    data: data
  })
}
/**
 * @name 用户修改头像
 * @param url
 * **/
export function updateUserAvatar(url) {
  return request({
    url: '/user/updateUserAvatar',
    method: 'GET',
    params: { avatar: url }
  })
}
/**
 * @name 获取医生信息
 * **/
export function doctorInfo() {
  return request({
    url: '/clinic/doctor/info',
    method: 'POST',
    params: {}
  })
}
/**
 * @name 手机号绑定
 * **/
export function mobileBind(data) {
  return request({
    url: '/user/mobile/bind',
    method: 'POST',
    data: data
  })
}
/**
 * @name 短信验证码
 * @param { object } data {bizType: string, phone: number}
 * **/
export function sendSmsCode(data) {
  return request({
    url: '/sso/sendSmsCode',
    method: 'POST',
    data: data
  })
}
