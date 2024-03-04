import request from '@/utils/request.js';

/**
 * @name 药品列表
 * */
export function drugList(data) {
  return request({
    url: '/clinic/prescription/user/page',
    method: 'GET',
    params: data
  })
}
/**
 * @name 订单药品详情
 * */
export function submitOrder(params) {
  return request({
    url: '/clinic/prescription/submitOrder',
    method: 'POST',
    data: params
  })
}
/**
 * @name 订单地址补全
 * @param {number|string} params.resourceId
 * @param {number|string} params.orderTradeNo
 * */
export function completeAddress(params) {
  return request({
    url: '/open/order/completeAddress',
    method: 'POST',
    data: params
  })
}
/**
 * @name 订单拉起支付 {微信扫码}
 * @param {number|string} params.orderTradeNo
 * */
export function orderWebPay(params) {
  return request({
    url: '/open/order/orderWebPay',
    method: 'GET',
    params: params
  })
}
/**
 * @style 废弃
 * @name 订单支付===》生成二维码
 * */
export function insertQrCodePrescription(params) {
  return request({
    url: '/clinic/QrCode/insertQrCodePrescription',
    method: 'POST',
    data: params
  })
}
/**
 * @style 废弃
 * @name 订单支付===》二维码刷新 是否扫码
 * */
export function queryQrcState(params) {
  return request({
    url: '/clinic/QrCode/queryQrcState',
    method: 'POST',
    data: params
  })
}
/**
 * @name 订单支付H5===》加密
 * */
export function decryptData(params) {
  return request({
    url: '/clinic/QrCode/decryptData',
    method: 'POST',
    data: params
  })
}
/**
 * @name 订单支付H5===》订单详情
 * */
export function orderDetails(params) {
  return request({
    url: '/clinic/order/orderDetails',
    method: 'POST',
    data: params
  })
}
/**
 * @name 订单支付H5===》获取订单状态
 * */
export function orderStatus(params) {
  return request({
    url: '/clinic/order/orderStatus',
    method: 'POST',
    data: params
  })
}
/**
 * @name 订单支付H5===》获取订单状态
 * */
export function createOrder(params) {
  return request({
    url: '/open/pc/createOrder',
    method: 'POST',
    data: params
  })
}
/**
 * @name 收获地址列表
 * */
export function addressList(data) {
  return request.request({
    url: '/user/receiver/page',
    method: 'GET',
    params: data
  })
}
/**
 * @name 添加收获地址
 * */
export function addressAdd(data) {
  return request.request({
    url: '/user/receiver/add',
    method: 'POST',
    data: data
  })
}
/**
 * @name 修改收获地址
 * */
export function updateAddress(data) {
  return request.request({
    url: '/user/receiver/update',
    method: 'POST',
    data: data
  })
}
/**
 * @name 删除收获地址
 * */
export function delAddress(data) {
  return request.request({
    url: '/user/receiver/delete',
    method: 'POST',
    data: data
  })
}
/**
 * @name 查看物流详情
 * */
export function logisticsDetails(data) {
  return request.request({
    url: '/open/pc/listDeliveryNode',
    method: 'POST',
    data: data
  })
}
