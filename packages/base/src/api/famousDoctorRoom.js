import request from '@/utils/request.js';
// /clinic/hospital/list
export function hospitalList() {
  return request({ url: '/clinic/hospital/list', method: 'GET' });
}
// /clinic/schedule
export function scheduleList(data) {
  return request({ url: '/clinic/schedule', method: 'GET', params: data });
}
// /clinic/schedule detail
export function scheduleTimeList(data) {
  return request({ url: '/clinic/schedule/detail', method: 'GET', params: data });
}
//
export function orderStatusById(data) {
  return request({ url: '/open/order/statusById', method: 'POST', data: data });
}
//
export function getReservationQrCode(data) {
  return request({ url: '/clinic/reservation/getReservationQrCode', method: 'POST', data: data });
}
// /clinic/schedule  1待支付 2已支付 3 已完成 4已退款 5已取消
export function orderInfo(data) {
  return request({ url: '/open/order/orderInfo', method: 'GET', params: data });
}
// 名医堂医生列表
export function selectDoctorAndDeptList(data) {
  return request({ url: '/clinic/selectDoctorAndDeptList', method: 'GET', params: data });
}
