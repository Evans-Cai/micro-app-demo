/**/
import request from '@/utils/request.js';
// /reservation/qr/add
export function reservationQrAdd(data) {
  return request.request({
    url: '/clinic/reservation/qr/add',
    method: 'GET',
    params: data
  })
}
// /reservation/qr/getQrState 查询二维码状态
export function reservationQrGetQrState(data) {
  return request.request({
    url: '/clinic/reservation/qr/getQrState',
    method: 'GET',
    params: data
  })
}
// /reservation/qr/updateQrState 修改二维码状态
export function reservationQrUpdateQrState(data) {
  return request.request({
    url: '/clinic/reservation/qr/updateQrState',
    method: 'GET',
    params: data
  })
}
// /reservation/prepare 提交问诊
export function reservationPrepare(data) {
  return request.request({
    url: '/clinic/reservation/prepare',
    method: 'POST',
    data: data
  })
}
// /reservation/getReservationWait 排队情况
export function reservationReservationWait(data) {
  return request.request({
    url: '/clinic/reservation/getReservationWait',
    method: 'GET',
    params: data
  })
}
/**
 * @name 问诊详情
 * url /clinic/reservation/info
 * */
export function reservationInfo(data) {
  return request.request({
    url: '/clinic/reservation/detail',
    method: 'POST',
    data: data
  })
}
/**
 * @name 问诊详情
 * url /clinic/reservation/info
 * */
export function reservationCancel(data) {
  return request.request({
    url: '/clinic/reservation/cancel',
    method: 'POST',
    data: data
  })
}
