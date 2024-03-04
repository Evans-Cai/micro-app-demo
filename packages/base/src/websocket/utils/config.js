import { ENVIRONMENT } from '@/utils/config.js';
import { requireFile } from '@/utils/vite.js';
/**
 * protocol
 * ip
 * post
 * **/
export const WS_IP = ENVIRONMENT['VITE_APP_WS_IP'];
export const HEART_BEAT_INTERVAL = 45 * 1000;
export const RECONNECT_INTERVAL = 30 * 1000;
export const BINTRAY_TYPE = 'blob';
// signal
/**
 * PING 心跳
 * CONNECT_ACK 握手
 * CONTACT 发送消息
 * DISCONNECT 断开连接
 * PUSH 推送
 * ONLINE 拉取在线状态
 * **/
export const PUBLISH = 'PUBLISH';
// export const CONNECT = 'CONNECT'; // 链接
export const DISCONNECT = 'DISCONNECT'; // 断开连接
export const CONNECT_ACK = 'CONNECT_ACK'; // 握手
export const CONTACT = 'CONTACT'; // 消息
export const PUB_ACK = 'PUB_ACK';
export const PING = 'PING'; // 心跳
export const BUS = 'BUS'; // 事务
export const NONE = 'NONE'; // 默认
// export const ONLINE = 'ONLINE'; // 拉取在线状态
export const RESERVATION = 'RESERVATION';
// subsignal
export const MULTIPLE = 'MULTIPLE'; // 多人会诊 新的会诊加入
export const BUS_QUEUE = 'QUEUE'; // 会诊刷新排队人员
export const BUS_DOCTOR_STATUS = 'STATUS'; // 会诊刷新排队人员
export const FRP = 'FRP';
export const FP = 'FP';
export const UPUI = 'UPUI';
export const GPGI = 'GPGI';
export const GPGM = 'GPGM';
export const GAM = 'GAM';
export const GC = 'GC';
export const GMI = 'GMI';
export const GKM = 'GKM';
export const GQ = 'GQ';
export const GD = 'GD';
export const MP = 'MP'; //
export const MS = 'MS'; // message send
export const MN = 'MN'; // 拉取消息
export const MR = 'MR';
export const RMN = 'RMN';
export const GQNUT = 'GQNUT';
export const US = 'US';
export const FAR = 'FAR';
export const FRN = 'FRN';
export const FHR = 'FHR';
export const FN = 'FN';
export const MMI = 'MMI';
// from
export const FROM = '0';
// audio
export const RECEIVER_MESSAGE = requireFile('@/assets/voice/ding.mp3');
export const KEY_VUE_USER_ID = 'VUE_USER_ID';
export const ERROR_CODE = 400;
export const SUCCESS_CODE = 200;
// audio
// export const TO_ROOM_MESSAGE = requireFile('@/assets/voice/in-room.mp3');
// default
// export const SOCKET_DEFAULT_AUDIO = requireFile('@/assets/voice/default.mp3');
