import request from '@/utils/request.js';
/**
 * 问诊日志保存
 * /clinic/saveConsultationLog
 * @param {string} data.clinicId  订单ID
 * @param {String|Number} data.type 接诊类型(1.机器人 2.医生)
 * @param {string} data.title  标题
 * */
export function saveConsultationLog(data) {
  return request.request({
    url: '/clinic/saveConsultationLog',
    method: 'POST',
    data: data
  })
}
