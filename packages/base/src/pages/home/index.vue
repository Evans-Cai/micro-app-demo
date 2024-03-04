<template>
  <div class="main-wrapper">
    <app-header/>
    <!---->
    <main class="main">
      <a :ref="'wrapper' + index" :data-index="index" :key="index" class="item-box"
         v-for="(item, index) in menu" href="javascript:void(0);" @click="handleLink(item, index)">
        <var-button v-focusable class="box-card" :class="['wow', item.animated]"
                    data-wow-delay="300ms" :data-wow-duration="item.duration"
                    :style="{'background': item.back}">
          <var-image class="img" :src="item.image" alt="" fit="cover"/>
        </var-button>
      </a>
    </main>
    <!---->
    <app-footer/>
  </div>
</template>
<script>
  import AppHeader from './components/AppHeader.vue';
  import AppFooter from './components/AppFooter.vue';
  import { openTesting } from '@/utils/native.js';
  import { showToast } from 'vant';
  import { requireFile } from '@/utils/vite.js';
  // import WOW from 'wow.js';

  export default {
    name: 'HomeIndex',
    components: {
      AppHeader,
      AppFooter
    },
    data() {
      return {
        wowJs: null,
        show: true,
        menu: [
          {
            label: '我要看病',
            back: 'linear-gradient(180deg,rgba(253,154,69,1) 0%,rgba(252,83,150,1) 100%)',
            icon: 'icon-woyaokanbing',
            image: requireFile('@/assets/image/home/IWantToSeeADoctor2Xx440.jpg'),
            path: '/web/doctor',
            animated: 'bounceInLeft',
            offset: 0,
            duration: '1500ms'
          },
          {
            label: '配药',
            back: 'linear-gradient(180deg,rgba(161,146,254,1) 0%,rgba(63,35,253,1) 100%)',
            icon: 'icon-zhuanzhen',
            image: requireFile('@/assets/image/home/Dispensing2X.jpg'),
            path: '/web/dispensing',
            animated: 'bounceInDown',
            offset: 0,
            duration: '1000ms'
          },
          {
            label: '名医堂',
            back: 'linear-gradient(360deg,rgba(0,96,217,1) 0%,rgba(43,213,254,1) 100%)',
            icon: 'icon-duorenhuizhen',
            image: requireFile('@/assets/image/home/Doctor2X.jpg'),
            path: '/web/famousDoctorRoom/hospital',
            animated: 'bounceInDown',
            offset: 0,
            duration: '1500ms'
          },
          {
            label: '问诊记录',
            style: 'bounceInDown',
            back: 'linear-gradient(180deg,rgba(179,71,159,1) 0%,rgba(100,26,234,1) 100%)',
            icon: 'icon-yuyueguahao',
            image: requireFile('@/assets/image/home/ConsultationRecord2X.jpg'),
            path: '/web/MedicalRecord',
            animated: 'bounceInUp',
            offset: 0,
            duration: '2500ms'
          },
          {
            label: '健康咨询',
            back: 'linear-gradient(180deg,rgba(9,210,198,1) 0%,rgba(51,138,184,1) 100%)',
            icon: 'icon-gerenzhongxin',
            image: requireFile('@/assets/image/home/HealthConsultation2X.jpg'),
            path: '/web/healthy',
            animated: 'bounceInUp',
            offset: 0,
            duration: '2000ms'
          },
          {
            label: '检测',
            back: 'linear-gradient(180deg,rgba(142,201,21,1) 0%,rgba(0,151,142,1) 100%)',
            icon: 'icon-chufangguanli',
            image: requireFile('@/assets/image/home/DoctorDetect2X.jpg'),
            // path: '/patient/medicalRecord',
            path: '',
            animated: 'bounceInUp',
            offset: 0,
            duration: '1500ms'
          }
        ]
      }
    },
    async created() {
      // 默认启动了 websocket
      this.$store.dispatch('app/appThemes', { theme: 'dark' });
      //
      await this.$store.dispatch('user/getInfo');
      await this.$store.dispatch('websocket/initData');
      this.show = true;
    },
    mounted() {
      // this.initWow();
    },
    methods: {
      autoLogin({ patientId, token, refreshToken }) {
        this.$store.dispatch('user/automatic', {
          patientId: patientId,
          token: token,
          refreshToken: refreshToken
        }).then(res => {
          // this.$router.replace({ path: '/home' });
        })
      },
      /*
      initWow() {
        const wow = new WOW({
          // boxClass: 'wow', // animated element css class (default is wow)
          animateClass: 'animated', // animation css class (default is animated)
          offset: 0, // distance to the element when triggering the animation (default is 0)
          mobile: true, // trigger animations on mobile devices (default is true)
          live: false, // act on asynchronously loaded content (default is true)
          callback: (box) => {
            // the callback is fired every time an animation is started
            // the argument that is passed in is the DOM node being animated
            console.log(box, '==============>');
            // this.wowJs.removeBox(box);
          },
          scrollContainer: null, // optional scroll container selector, otherwise use window
          resetAnimation: true
        });
        wow.init();
      },
      //
      resetWow() {
        var wow = new WOW({
          resetAnimation: true
        });
        wow.init();
      },
      */
      //
      handleLink(item, index) {
        console.log(item);
        if (item.path) {
          this.$router.push({ path: item.path });
        } else if (item.label === '检测') {
          openTesting()
        } else {
          showToast({ type: 'text', message: '开发中', duration: 1500 });
        }
      }
    },
    beforeUnmount() {
    }
  }
</script>
<style lang="scss" scoped>
  .main-wrapper {
    width: 100vw;
    height: 100vh;
    position: relative;
    padding: 0 5vw;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(270deg, #0d131e 0%, #102133 25%, #0d131e 50%, #102133 75%, #0d131e 100%);
    &:before {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100vw;
      height: 100vh;
      background-origin: content-box;
      background-repeat: no-repeat;
      background-position: center;
      background-image: linear-gradient(270deg, #0c1325 0%, #102133 50%, #0d1528 100%);
    }
    .main {
      position: relative;
      z-index: 1000;
    }
    .item-box {
      border: none;
      width: 100%;
      background: transparent;
      display: inline-block;
      position: relative;
      float: left;
      padding: 1vw;
      transition: all .2s ease-in-out;
      &:nth-of-type(1) {
        width: 30vw;
        height: auto;
      }
      &:nth-of-type(2) {
        width: 30vw;
        height: auto;
      }
      &:nth-of-type(3) {
        width: 30vw;
        height: auto;
      }
      &:nth-of-type(4) {
        width: 20vw;
        height: auto;
      }
      &:nth-of-type(5) {
        width: 20vw;
        height: auto;
      }
      &:nth-of-type(6) {
        width: 20vw;
        height: auto;
      }
      .box-card {
        padding: 0;
        display: block;
        height: 100%;
        border-radius: 16px;
        text-align: center;
        width: 100%;
        overflow: hidden;
        vertical-align: middle;
        border: 1px solid transparent;
        background: transparent !important;
        .img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          vertical-align: middle;
        }
      }
    }
  }
</style>
