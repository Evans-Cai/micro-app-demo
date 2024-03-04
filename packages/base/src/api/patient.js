import request from '@/utils/request.js';
// clinic/doctor/search 所有医生列表
export function doctorSearch(params) {
  return request({
    url: '/clinic/doctor/search',
    method: 'GET',
    params: params
  })
}
//
export function doctorDetail(params) {
  return request({
    url: '/clinic/doctor/detail',
    method: 'GET',
    params: params
  })
}
//
export function userAddAttention(params) {
  return request({
    url: '/user/attention',
    method: 'POST',
    data: params
  })
}
//
export function userClearAttention(params) {
  return request({
    url: '/user/attention/cancel',
    method: 'POST',
    data: params
  })
}
// 就诊人信息 根据id
export function userPatient(params) {
  return request({
    url: '/user/patient',
    method: 'GET',
    params: params
  })
}
// 预约资讯意向字典
export function dictConsultation(params) {
  return request({
    url: '/clinic/dict/consultation',
    method: 'GET',
    params: params
  })
}
// 添加患者评价 /consultation/user/page
export function doctorRate(data) {
  return request({
    url: '/clinic/rate',
    method: 'POST',
    data: data
  })
}
// 患者印象 /rate/sense
export function rateSense(data) {
  return request({
    url: '/clinic/rate/sense',
    method: 'GET',
    params: data
  })
}
