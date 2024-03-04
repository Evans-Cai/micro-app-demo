import JSEncrypt from 'jsencrypt';
//
import CryptoJS from 'crypto-js';
const key = CryptoJS.enc.Utf8.parse('1qaz2wsx3edc4rfv');
const iv = CryptoJS.enc.Utf8.parse('zaq1xsw2cde3vfr4');
// Encrypt
export function AESEncrypt(data) {
  let source = data.toString();
  if (typeof data === 'object') {
    source = JSON.stringify(data);
  }
  console.debug(source);
  console.debug('====================http请求参数====>', source);
  return CryptoJS.AES.encrypt(source, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString();
}
// Decrypt
export function AESDecrypt(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString(CryptoJS.enc.Utf8);
  console.debug('====================解码参数====>', JSON.parse(bytes));
  return JSON.parse(bytes)
}
/**
 * 解密
 */
export function DESDecrypt(cryptoData) {
  // key 根据自己的需求修改
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const ciphertext = CryptoJS.enc.Hex.parse(cryptoData);
  return CryptoJS.DES.decrypt({ ciphertext: ciphertext }, keyHex,
    { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8);
}
/**
 * 加密
 * message  必须是string(字符串)类型
 */
export function DESEncrypt(ciphertext) {
  // key 根据自己的需求修改
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  return CryptoJS.DES.encrypt(ciphertext, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).ciphertext.toString()
}
/**
 * res 加密
 * */
export function RSADecrypt(ciphertext) {
  // 注册方法
  const pubKey = `MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJuBr0RN6MahbQNlwGIvOrBEHbZRdhZOtjTHDWYv73B19c3upEUu/ietOXy4+oMOyXnQkR14tMtcPRkh4l0dIW8CAwEAAQ==`;// ES6 模板字符串 引用 rsa 公钥
  const encryptStr = new JSEncrypt();
  encryptStr.setPublicKey(pubKey); // 设置 加密公钥
  // 进行加密
  return encryptStr.encrypt(ciphertext.toString());
}
/**
 * res 解密
 * */
export function RSAEncrypt(ciphertext) {
}
