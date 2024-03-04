import request from '@/utils/request.js';
/**
 * @name 医生团队列表
 * */
export function healthyGroup(data) {
  return request({
    url: '/clinic/hospitalgroup/pageList',
    method: 'GET',
    params: data
  })
}
