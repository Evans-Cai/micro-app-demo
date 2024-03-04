import wx from 'weixin-js-sdk';

export function OpenTVideo(roomid = '', usrid = '') {
  console.warn('请用真机测试', roomid, usrid);
  if (typeof window.htmlbundle !== 'undefined') {
    var myjson = {
      roomid: roomid,
      usrid: usrid
    };
    window.htmlbundle.sendEvent('EVENT_OPENTVIDEO', JSON.stringify(myjson));
  }
}
//
export function openTrtcVideo(json = {}) {
  console.warn('请用真机测试', json);
  // 是微信小程序的 web-view
  const userAgent = window.navigator.userAgent;
  if (userAgent.indexOf('MicroMessenger') !== -1) {
    // 新增方式如果是微信小程序web-view就执行小程序postMessage
    wx.miniProgram.navigateBack({ delta: 1 });
    wx.miniProgram.postMessage({ data: json });
    return
  } else {
    // 不是微信小程序的 web-view
  }
  //
  if (json.roomId) {
    if (typeof window.htmlbundle !== 'undefined') {
      const myJson = JSON.stringify(json);
      window.htmlbundle.openTrtcVideo(myJson);
    }
  }
}
//
export function openTesting() {
  if (typeof window.htmlbundle !== 'undefined') {
    window.htmlbundle.openTesting();
  }
}
//
export function closeClient() {
  if (typeof window.htmlbundle !== 'undefined') {
    window.htmlbundle.onHangUpClose();
  }
}
