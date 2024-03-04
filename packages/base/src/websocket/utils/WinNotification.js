import { RECEIVER_MESSAGE } from './config.js';
import { MIN_LOGO } from '@/utils/config.js';
export default class WinNotification {
  constructor(props) {
    console.log(props);
    this.option = {
      title: '',
      content: '',
      icon: MIN_LOGO,
      link: '',
      audio: '',
      silent: true
    };
  }
  dispatch(option = {}) {
    if (window.Notification) {
      const Notification = Notification || window.Notification;
      const { title, content, icon, link, audio, silent } = { ...this.option, ...option };
      //
      const title_ = title || '通知';
      const content_ = content || '';
      const icon_ = icon || MIN_LOGO;
      const link_ = link || '';
      const audio_ = audio || RECEIVER_MESSAGE;
      const silent_ = silent || false;
      //
      // const permission = Notification.permission;
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          const notification = new Notification(title_, {
            body: content_,
            icon: icon_,
            sound: audio_,
            silent: silent_
          });
          notification.onshow = () => {
            const video = document.createElement('VIDEO');
            video.src = audio_;
            video.play().then(res => {
              console.log(res);
            }).catch(e => {
              console.error(e);
            });
          }
          notification.onclick = () => {
            console.log('点击');
            if (link_) {
              location.href = link_;
            }
            // 跳转到当前通知的tab,如果浏览器最小化，会将浏览器显示出来
            window.focus()
            notification.close();
          };
        } else {
          Notification.requestPermission();
          console.warn('没有权限,用户拒绝:Notification');
        }
      }).catch(err => {
        this.audioPlay();
        //
        console.warn('不支持Notification', err);
      });
    } else {
      //
      this.audioPlay();
      console.warn('不支持Notification');
    }
  }
  audioPlay() {
    const video = document.createElement('VIDEO');
    video.src = RECEIVER_MESSAGE;
    video.play();
  }
}
