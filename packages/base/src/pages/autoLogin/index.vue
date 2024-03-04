<template>
  <div class="container">
    <van-loading size="24px">加载中...</van-loading>
  </div>
</template>
<script>
  import { showToast } from 'vant';
  import { ENVIRONMENT } from '@/utils/config.js';

  export default {
    name: 'AutoLoginIndex',
    data() {
      return {
        loading: true,
        initialization: false,
        number: 0
      }
    },
    created() {
      console.log('111');
    },
    mounted() {
      console.log(this.$route);
      this.linkAutoLogin();
    },
    methods: {
      //
      linkAutoLogin() {
        console.warn('location', location);
        const { patientId, accessToken, robotPatientGuid, refreshToken, redirect = '', hideTitle } = this.$route.query;
        // 开发环境下测试用
        const _hideTitle = !['1', 1].includes(hideTitle);
        this.$store.dispatch('app/setShowHeader', _hideTitle);
        let _patientId = patientId;
        if (ENVIRONMENT.MODE === 'development') {
          _patientId = '291603597724549121';
        }
        //
        const params = {
          robotPatientGuid: robotPatientGuid || '',
          patientId: _patientId || '',
          token: accessToken || '',
          refreshToken: refreshToken || ''
        }
        //
        if (!this.initialization) {
          this.$store.dispatch('user/automatic', params).then(res => {
            const path = redirect || '/home';
            console.log(path);
            setTimeout(() => {
              this.$nextTick(() => {
                this.$router.replace(path);
              })
              this.initialization = true;
            }, 300)
          }).catch(err => {
            console.log(err);
            showToast({ type: 'fail', message: err, wordBreak: 'break-word' });
          })
        } else {
          this.$nextTick(() => {
            this.$router.replace('/home');
          })
          showToast({ type: 'fail', message: '非法登录，请退出重试', wordBreak: 'break-word' });
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .container {
    height: 100vh;
    width: 100vw;
    position: relative;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
