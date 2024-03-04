import request from '@/utils/request.js';
/**
 * @name 历史消息
 */
export function getImMsg(data) {
  return request.request({
    url: '/clinic/msg/list',
    method: 'GET',
    params: data
  })
}

// 结束就诊 /clinic/consultation/finish/doctor ?reservationId 结束就诊
export function userRtcSign() {
  return request({
    url: '/user/rtc/sign',
    method: 'GET'
  });
}
