import { requireFile } from '@/utils/vite.js';

export const USER_INFO = 'USER_INFO';
export const USER_TOKEN = 'USER_TOKEN';
export const USER_PATIENT_ID = 'USER_PATIENT_ID';
// 设置cookie 失效日期
export const cookieExpires = 7;
export const COPYRIGHT = 'Copyright ©fromfuture.cn 版权所有 | 沪ICP备<a href="http://icp.chinaz.com/home/info?host=fromfuture.cn" target="_blank">19046365号</a>';
// 环境变量
export const ENVIRONMENT = import.meta.env;
// APP_LOCAL_IP
export const APP_LOCAL_IP = ENVIRONMENT['VITE_APP_LOCAL_IP'];
/** 上传的文件的base url **/
export const FILE_BASE_URl = ENVIRONMENT['VITE_APP_FILE_BASE_API'];
/** 静态资源路径 */
export const FILE_STATIC_BASE_URL = ENVIRONMENT['VITE_APP_FILE_STATIC_BASE_URL'];
export const defaultAvatar = `${FILE_BASE_URl}/image/user/default.png`;
//
export const TITLE = '医加医互联网医院';
export const TITLE_TYPE = '机构端';
export const LOGIN_LOGO = requireFile('@/assets/image/logo/logo.png');
export const MAX_LOGO = requireFile('@/assets/image/logo/max_logo.png');
export const MIN_LOGO = requireFile('@/assets/image/logo/min_logo.png');
// 知情同意书
export const URL_ZQTYS = 'https://mtm.fromfuture.cn/gzcommunitytv/InformedConsent.html';
//
export const FILE_BASE_API = ENVIRONMENT['VITE_APP_FILE_BASE_API'];
export const defaultAvatarUri = requireFile('@/assets/image/avatar/3ea6beec64369c2642b92c6726f1e.png');
export const defaultDoctorUri = requireFile('@/assets/image/doctorInfo/default_doctor.png');
