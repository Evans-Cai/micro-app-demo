import {
  BINTRAY_TYPE,
  CONNECT_ACK,
  CONTACT,
  BUS,
  DISCONNECT,
  FROM,
  HEART_BEAT_INTERVAL,
  MS,
  MP,
  MULTIPLE,
  NONE,
  PING,
  RECEIVER_MESSAGE,
  RECONNECT_INTERVAL,
  RESERVATION,
  WS_IP, BUS_DOCTOR_STATUS, BUS_QUEUE
} from '@/websocket/utils/config.js';
import vuexStore from '@/store/index.js';
import WsProtoMessage from './message/WsProtoMessage.js';
import WinNotification from './utils/WinNotification.js';
export default class VueWebSocket {
  constructor() {
    this.ws = null;
    this.binaryType = BINTRAY_TYPE;
    this.url = WS_IP;
    this.heartbeatTimeout = HEART_BEAT_INTERVAL;
    this.reconnectInterval = RECONNECT_INTERVAL;
    //
    this.WinNotification = new WinNotification();
    //
    this.actionTime = null; // 当前记录的时间
    //
    this.pingIntervalTimer = null; // 这是心跳的定时器
    this.connectIntervalTimer = null; // 这是握手的定时器
    //
    this.isconnected = false; // 这是握手状态 false 否 true 是
    //
    this.setIsConnected(false);
    // 播放语音
    this.vudio = document.createElement('VIDEO');
    this.vudio.src = RECEIVER_MESSAGE;
    // userId
    this.userId = vuexStore.getters['user/userId'];
    // init 初始化
    this.connect();
  }
  getMedia() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      console.error('enumerateDevices() not supported.');
      return;
    }
    // List cameras and microphones.
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      devices.forEach((device) => {
        console.log(device);
        console.log(device.kind + ': ' + device.label + ' id = ' + device.deviceId);
      });
    }).catch((err) => {
      console.error(err.name + ': ' + err.message);
    })
    // Notification
    const Notification = window.Notification || Notification;
    Notification.requestPermission().then(r => {
      console.log(r)
    })
  }
  // 设置当前状态
  setIsConnected(bool) {
    this.isconnected = bool; // 这是握手状态 false 否 true 是
    vuexStore.commit('websocket/IS_CONNECTED', this.isconnected);
  }
  // 初始化连接 重连时也会调用
  connect() {
    // 创建链接
    this.ws = new WebSocket(this.url);
    // 配置发送格式
    this.ws.binaryType = this.binaryType;
    // onopen 方法
    this.ws.onopen = (event) => {
      this.lastInteractionTime(new Date().getTime());
      console.log('ws open', event);
      //
      this.setIsConnected(true)
      // 发送connect指令 开始建立链接信息
      this.sendConnectMessage();
      // 定时器 尝试握手
      clearInterval(this.connectIntervalTimer);
      this.connectIntervalTimer = setInterval(() => {
        this.sendConnectMessage();
      }, this.heartbeatTimeout);
      //
    };
    // onmessage
    this.ws.onmessage = (event) => {
      this.lastInteractionTime(new Date().getTime());
      console.log('ws onmessage', event);
      //
      this.handleProcessMessage(event);
    };
    // onclose 关闭
    this.ws.onclose = (event) => {
      console.log('ws onclose', event);
      if (this.isconnected) {
        //
        this.setIsConnected(false)
        //
        clearInterval(this.pingIntervalTimer);
        //
        // Notification.warning({
        //   title: '警告',
        //   message: '链接已断开...',
        //   duration: 1000,
        //   offset: 100
        // });
        this.reconnect(event);
      }
    };
    // onerror 过后
    this.ws.onerror = (event) => {
      console.log('connect error', event);
    };
  }
  // 关闭socket
  close() {
    this.setIsConnected(false)
    //
    clearInterval(this.pingIntervalTimer);
    clearInterval(this.connectIntervalTimer);
    this.ws.close();
    console.log('成功断开链接')
  }
  // 重连
  reconnect() {
    setTimeout(() => {
      this.connect();
    }, this.reconnectInterval);
    // Notification.warning({
    //   title: '警告',
    //   message: '网络重连中，请稍等...',
    //   duration: 1000,
    //   offset: 100
    // });
  }
  // 记录时间
  lastInteractionTime(actionTime) {
    try {
      this.actionTime = actionTime;
      console.log(this.actionTime);
    } catch (e) {
      console.error(e);
    }
  }
  // 心跳
  ping() {
    const wsaeprototype = new WsProtoMessage();
    wsaeprototype.setSignal(PING);
    wsaeprototype.setSubSignal(NONE);
    wsaeprototype.setMessageId(1);
    wsaeprototype.setContent('heartCheck');
    this.send(wsaeprototype.toJson());
  }
  //
  notificationMessage(option) {
    this.WinNotification.dispatch(option);
  }
  /**
   * 信令
   * 消息来了 subSignal数据类型
   * @param { object } event 消息体事件内容
   **/
  handleProcessMessage(event) {
    let wsaeprototype = new WsProtoMessage();
    if ([null, ''].includes(event.data)) {
      console.log('空数据' + event.data);
      return;
    }
    wsaeprototype = JSON.parse(event.data);
    // 根据类型处理数据
    switch (wsaeprototype.signal) {
      case CONNECT_ACK:
        // 握手成功 清除定时器
        clearInterval(this.connectIntervalTimer);
        window.clearInterval(this.connectIntervalTimer);
        // 设置连接状态
        this.setIsConnected(true)
        // 握手成功 初始化心跳函数
        clearInterval(this.pingIntervalTimer);
        this.ping();
        // 定时开启心跳
        this.pingIntervalTimer = setInterval(() => {
          this.ping();
        }, this.heartbeatTimeout);
        break;
      case CONTACT:
        // 接收到消息
        this.processContactMessage(wsaeprototype);
        break;
      case PING:
        // 心跳 关闭重连定时器
        clearInterval(this.connectIntervalTimer);
        break;
      case RESERVATION:
        // 有地的预约患者加入
        break;
      case MULTIPLE:
        // 多人会诊中有新的患者预约加入
        break;
      case DISCONNECT:
        // 退出诊室
        break;
      case BUS:
        this.processContactWork(wsaeprototype);
        break
      default:
        console.log('默认');
        break;
    }
  }
  //
  processContactWork(message) {
    // const content = JSON.parse(message.content);
    switch (message.subSignal) {
      case BUS_QUEUE:
        vuexStore.commit('app/QUEUE_STATUS');
        // 刷新在岗状态
        break
      case BUS_DOCTOR_STATUS:
        vuexStore.commit('app/DOCTOR_STATUS');
        // 刷新在岗状态
        break
      default:
        break
    }
  }
  /**
   * 子信令
   * 消息来了 subSignal数据类型
   * @param { object } message 消息体内容
   **/
  processContactMessage(message) {
    const content = JSON.parse(message.content);
    //
    switch (message.subSignal) {
      case 'NONE':
        // 默认
        break;
      case 'MP':
        console.log(content);
        vuexStore.dispatch('websocket/pushMessageHistory', content).then(r => console.log(r));
        break;
      case 'MS':
        // 推送回来的消息 先通过push-message 接收存储
        vuexStore.dispatch('websocket/pushMessage', {
          ...content,
          self: vuexStore.getters['user/userId'] === content.senderId
        }).then(r => r)
        break;
      case 'SYS':
        // 系统消息 提示用户
        break;
      case 'MC':
        vuexStore.dispatch('websocket/receiptMessage', {
          ...content.content
        }).then(r => r)
        // 消息发送成功回执
        break;
      default:
        // 其他
        break;
    }
  }
  // 建立链接信息 发送指令，告诉服务器{当前用户}进行了握手
  sendConnectMessage() {
    const wsaeprototype = new WsProtoMessage();
    wsaeprototype.setSubSignal(NONE);
    wsaeprototype.setSignal(CONNECT_ACK);
    wsaeprototype.setFrom(FROM);
    wsaeprototype.content = {
      userToken: this.userId,
      userDeviceToken: '',
      terminal: 'ws', // 链接方式
      platform: 'web' // 设备
    };
    this.ws.send(wsaeprototype.toJson());
  }
  // 断开链接
  sendDisConnectMessage() {
    const wsaeprototype = new WsProtoMessage();
    wsaeprototype.setSignal(DISCONNECT);
    wsaeprototype.setSubSignal(NONE);
    wsaeprototype.setFrom(FROM);
    wsaeprototype.content = {
      clearSession: 1
    };
    this.send(wsaeprototype.toJson());
  }
  /**
   * 推送消息
   * @param { string } subSignal 子信令
   * @param { string } protoMessage 消息体内容
   **/
  sendMessage(subSignal, protoMessage) {
    const sub = { 'mp': MP, 'ms': MS, 'none': NONE, 'multiple': MULTIPLE };
    return this.sendPublishMessage(sub[subSignal], protoMessage);
  }
  /**
   * @param { string } subSignal 子信令
   * @param { string } protoMessage 消息体内容
   **/
  sendPublishMessage(subSignal, protoMessage) {
    const content = JSON.parse(protoMessage);
    const wsaeprototype = new WsProtoMessage();
    wsaeprototype.setSignal(CONTACT);
    wsaeprototype.setSubSignal(subSignal);
    wsaeprototype.setFrom(FROM);
    wsaeprototype.setContent(content);
    this.send(wsaeprototype.toJson());
    return {
      subSignal,
      protoMessage: { ...content, self: vuexStore.getters['user/userId'] === content.senderId }
    }
  }
  // 发送消息
  send(data) {
    this.ws.send(data);
    return true
  }
}
