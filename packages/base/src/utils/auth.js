// import Cookies from 'js-cookie'
import { USER_INFO, USER_TOKEN, USER_PATIENT_ID } from '@/utils/config.js';
import { sm4Decrypt, sm4Encrypt } from '@/utils/jssmcrypto.js';

const TokenKey = USER_TOKEN;
const UserInfo = USER_INFO;
export function getToken() {
  return sessionStorage.getItem(TokenKey)
}
export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token)
}
export function removeToken() {
  removeUserInfo()
  return sessionStorage.removeItem(TokenKey)
}
//
export function setUserInfo(info) {
  sessionStorage.setItem(UserInfo, sm4Encrypt(JSON.stringify(info)));
  return sm4Decrypt(sessionStorage.getItem(UserInfo));
}
export function getUserInfo() {
  return sm4Decrypt(sessionStorage.getItem(UserInfo));
}
export function removeUserInfo() {
  return sessionStorage.removeItem(UserInfo);
}
export function setPatientId(id) {
  return sessionStorage.setItem(USER_PATIENT_ID, id);
}
export function getPatientId() {
  return sessionStorage.getItem(USER_PATIENT_ID);
}
