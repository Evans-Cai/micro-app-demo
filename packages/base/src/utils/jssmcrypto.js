import { sm2, sm4 } from 'sm-crypto';

const cipherMode = 1 // 1 - C1C3C2，0 - C1C2C3，默认为1
const sm4Key = '3a2x8g5j2lddjezh4ap5r3g1vxostavq';
let sm2PublicKey = '04fe7aaaa533c4661076159f7a50d8cfdf8dd816d0ef8a7c3e681d5322079b474d269a1f1a5217802114f595fdfee2cf18504836df50d2a091be8c12583adace1d';
let sm2PrivateKey = 'a16611a211de4befeb627bdd63e6ea9cd2d954758461b3f3512971bc24d43767';
/*
* 生成sm2密钥
* */
export function generateKeyPairHex() {
  const { publicKey, privateKey } = sm2.generateKeyPairHex();
  sm2PublicKey = publicKey;
  sm2PrivateKey = privateKey;
  sessionStorage.setItem('SM_2_PUBLIC_KEY', publicKey);
  sessionStorage.setItem('SM_2_PRIVATE_KEY', privateKey);
}
/**
 * sm2加密
 * */
export function sm2Encrypt(str) {
  return sm2.doEncrypt(str, sm2PublicKey, cipherMode); // 加密结果
}
/**
 * sm2解密
 * */
export function sm2Decrypt(encryptData) {
  return sm2.doDecrypt(encryptData, sm2PrivateKey, cipherMode); // 解密结果
}
/**
 * sm4加密
 * */
export function sm4Encrypt(str) {
  // console.debug('sm4Decrypt', str);
  return sm4.encrypt(str, sm4Key); // 加密，默认输出 16 进制字符串，默认使用 pkcs#7 填充（传 pkcs#5 也会走 pkcs#7 填充）
}
/**
 * sm4解密
 * */
export function sm4Decrypt(encryptData) {
  // console.debug('sm4Decrypt', encryptData);
  return sm4.decrypt(encryptData, sm4Key) // 解密，默认输出 utf8 字符串，默认使用 pkcs#7 填充（传 pkcs#5 也会走 pkcs#7 填充）
}
