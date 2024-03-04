import { insetQrcodeUrl, staticUri } from '@/utils/index.js';
import { showDialog, showToast } from 'vant';
import { openTrtcVideo } from '@/utils/native.js';
import store from '@/store/index.js';

let status = 0;
export function wsOpenVideoClient(state, model = true) {
  console.error(state);
  const qrcodeUrl = insetQrcodeUrl(store.getters['user/token'], {
    'clinicId': state.currentConversation.clinicId,
    'patientId': state.currentConversation.patientId,
    'state': state.currentConversation.state
  });
  //
  if (model) {
    showDialog({
      title: '提示',
      message: '医生向您发起视频，是否接收？',
      showCancelButton: true
    }).then(() => {
      store.dispatch('websocket/getRtcSign').then((res) => {
        openTrtcVideo({
          ...state.extras,
          ...res,
          qrcodeUrl: qrcodeUrl, qrcode: state.qrcode || '',
          certImg: staticUri(state.doctorInfo.certImg)
        });
      });
    }).catch(() => {
      console.error('用户取消操作');
    });
  } else {
    //
    if (state.clinicId) {
      store.dispatch('errorLog/syncAddErrorLog', {
        clinicId: state.clinicId,
        title: '5.患者唤起机器人视频'
      })
    }
    //
    store.dispatch('websocket/getRtcSign').then((res) => {
      if (status === 0) {
        openTrtcVideo({
          ...state.extras,
          ...res,
          qrcodeUrl: qrcodeUrl,
          qrcode: state.qrcode || '',
          certImg: staticUri(state.doctorInfo.certImg)
        });
        status = 1;
      }
    }).catch((err) => {
      showToast({ type: 'text', message: err, duration: 2000 });
    });
  }
}
