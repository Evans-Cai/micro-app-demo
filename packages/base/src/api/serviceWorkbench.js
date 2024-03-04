import request from '@/utils/request.js';
// 就诊人列表
export function reqPatientList(params) {
  return request({
    url: '/clinic/jkgl/selectPatientList',
    method: 'GET',
    params: params
  })
}
