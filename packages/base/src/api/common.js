import request from '@/utils/request.js'
// 上传图片
export function openUploadImgFile(file) {
  return request({
    url: '/open/uploadImgFile',
    method: 'POST',
    headers: {'Content-Type': 'multipart/form-data'},
    timeout: 1000 * 60 * 5,
    ...file
  })
}
