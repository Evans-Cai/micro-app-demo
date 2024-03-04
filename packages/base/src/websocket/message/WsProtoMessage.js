/**
 * websocket json 主协议
 * {
 *  "signal": "connect",
 *  "sub_signal": "conect_ack",
 *  "message_id": 0,
 *  "content": ""
 * }
 **/
import { FROM } from '../utils/config.js';

export default class WsProtoMessage {
  constructor() {
    this.signal = null;
    this.subSignal = null;
    this.from = null;
  }
  setMessageId(messageId) {
    this.messageId = messageId;
  }
  setSignal(signal) {
    this.signal = signal;
  }
  setFrom(from) {
    this.from = from;
  }
  setSubSignal(subSignal) {
    this.subSignal = subSignal;
  }
  setContent(content) {
    this.content = content;
  }
  toJson() {
    const message = {
      signal: this.signal,
      subSignal: this.subSignal == null ? 'NONE' : this.subSignal,
      messageId: this.messageId == null ? 0 : this.messageId,
      from: FROM,
      content: this.content
    }
    return JSON.stringify(message);
  }
}
