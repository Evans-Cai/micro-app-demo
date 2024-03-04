import request from '@/utils/request.js';
// 查询病历 /consultation/user/page
export function getDescription(data) {
  return request({
    url: '/clinic/reservation/getDescription',
    method: 'GET',
    params: data
  })
}
