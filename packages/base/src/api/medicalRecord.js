import request from '@/utils/request.js';
/**
 * @url /medicalRecord/doctor/page
 * @param {object} data = { patientId: string, pageNum: number, pageSize: number }
 * **/
export function medicalRecordDoctorPage(data) {
  return request({
    url: '/clinic/medicalRecord/user/page',
    method: 'GET',
    params: data
  })
}
/**
 * @url /clinic/consultation/doctor/page 查看病历
 * **/
export function userMedicalRecordGet(params) {
  return request({
    url: '/clinic/doctor/medicalRecord/get',
    method: 'GET',
    params: params
  })
}
// 查看病历详情
export function userMedicalRecord(params) {
  return request({
    url: '/clinic/user/medicalRecord/get',
    method: 'GET',
    params: params
  })
}
// 问诊记录列表
export function consultationList(params) {
  return request({
    url: '/clinic/consultation/user/page',
    method: 'GET',
    params: params
  })
}
