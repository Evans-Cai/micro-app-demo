<template>
  <div class="login-container">
    <div class="login-form-box">
      <var-form autocomplete="on" class="login-form" validate-trigger="onSubmit" @submit="handleLogin">
        <div class="title-container">
          <div class="flex-box align-center justify-center">
            <div><h3 class="title">{{ logoTitle }}</h3></div>
          </div>
        </div>
        <var-space direction="column" :size="[14, 0]">
          <!--账号-->
          <var-input autocomplete="off" class="input-user username" name="username" placeholder="请输入用户名"
                     ref="username" tabindex="1" type="text"
                     left-icon="manager"
                     v-model="loginForm.username">
          </var-input>
          <!--密码-->
          <var-input autocomplete="off" class="input-user" name="password" placeholder="请输入密码"
                     ref="password" tabindex="2" type="password"
                     left-icon="lock"
                     v-model="loginForm.password">
          </var-input>
          <!---->
        </var-space>
        <!---->
        <var-space>
          <var-button block :loading="loading" loading-text="加载中..." native-type="submit" type="primary">
            登录
          </var-button>
          <!---->
          <div class="foo-warning-item">
            <div class="foo-warning">
              <div>1.请使用最新谷歌浏览器登录</div>
              <div>2.登录成功时，请尽量关闭电脑自带的杀毒软件（原因：避免在线聊天的时候不会有声音提示）</div>
            </div>
          </div>
        </var-space>
      </var-form>
    </div>
  </div>
</template>
<script>
  import { showToast } from 'vant';
  import { validUsername } from '@/utils/validate.js';
  import { ENVIRONMENT, LOGIN_LOGO, TITLE, TITLE_TYPE } from '@/utils/config.js';

  export default {
    name: 'LoginPage',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('用户名'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('密码不得小于六位数！'))
        } else {
          callback()
        }
      }
      const validateAgreement = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请勾选同意书！！'))
        } else {
          callback()
        }
      }
      return {
        logoTitle: TITLE,
        logoType: TITLE_TYPE,
        logo: LOGIN_LOGO,
        loginForm: {
          username: '', // yx02
          password: '', // Aa1234567
          agreement: false
        },
        agreement: false,
        loginRules: {
          username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          password: [{ required: true, trigger: 'blur', validator: validatePassword }],
          agreement: [{ required: false, trigger: 'change', validator: validateAgreement }]
        },
        passwordType: 'password',
        capsTooltip: false,
        loading: false,
        showDialog: false,
        redirect: undefined,
        otherQuery: {}
      }
    },
    watch: {
      agreement(val) {
        this.loginForm.agreement = val;
        // this.$refs['loginForm'].validateField('agreement')
      },
      $route: {
        handler: function(route) {
          const query = route.query
          if (query) {
            this.redirect = query.redirect
            this.otherQuery = this.getOtherQuery(query)
          }
        },
        immediate: true
      }
    },
    created() {
      // window.addEventListener('storage', this.afterQRScan)
    },
    mounted() {
      if (this.loginForm.username === '') {
        this.$refs.username.focus()
      } else if (this.loginForm.password === '') {
        this.$refs.password.focus()
      }
      this.developmentSetup();
    },
    unmounted() {
      // window.removeEventListener('storage', this.afterQRScan)
    },
    methods: {
      developmentSetup() {
        if (ENVIRONMENT.MODE === 'development') {
          this.loginForm.username = '15618928271';
          this.loginForm.password = 'Aa1234567';
          sessionStorage.setItem('USER_PATIENT_ID', '365222809742934017');
          this.$store.commit('user/SET_PATIENT_ID', sessionStorage.getItem('USER_PATIENT_ID'));
        }
      },
      //
      handleLogin(values) {
        console.log('submit', values);
        this.loading = true;
        this.$store.dispatch('user/login', this.loginForm).then((res) => {
          if (res.code === 200) {
            console.log(res, this.redirect, this.otherQuery);
            //
            this.$router.push({ path: this.redirect || '/', query: this.otherQuery });
          } else {
            showToast({ type: 'text', message: res.message, duration: 2000 });
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      getOtherQuery(query) {
        return Object.keys(query).reduce((acc, cur) => {
          if (cur !== 'redirect') {
            acc[cur] = query[cur]
          }
          return acc
        }, {})
      }
    }
  }
</script>
<style lang="scss" scoped>
  $size: 50px;
  $bg: #283443;
  $cursor: #fff;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  $img: $STATIC_BASE_API + '/assets/image/banner/login_bg.jpg';
  .login-form-box {
    width: 500px;
    height: auto;
    background: rgba(255, 255, 255, 0.79);
    border-radius: 16px;
    position: relative;
  }
  .login-container {
    min-height: 100%;
    height: 100vh;
    width: 100vw;
    color: #333;
    background-size: cover;
    background-image: url($img);
    background-repeat: no-repeat;
    background-position: center center;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    ::v-deep(.agreement-content) {
      padding: 10px 0;
      .icon-box {
        cursor: pointer;
        line-height: 1;
        padding: 5px;
        &.on {
          i {
            transition: .2s all;
            color: #21B1FC;
          }
        }
        i {
          transition: .2s all;
          font-size: 24px;
        }
      }
      .text {
        font-size: 18px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 21px;
        margin-left: 5px;
        &::selection {
          background: transparent;
        }
        .link {
          font-size: 15px;
          color: rgba(33, 177, 252, 1);
          cursor: pointer;
          &::selection {
            background: transparent;
          }
        }
      }
    }
    .login-form {
      padding: 0 20px;
      border-radius: 12px;
      overflow: hidden;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .title-container {
      position: relative;
      margin: 45px 0;
      .title-logo-img {
        height: 90px;
        width: 90px;
      }
      .title {
        font-size: 27px;
        font-weight: 600;
        color: rgba(2, 140, 214, 1);
        line-height: 1;
        margin: 0;
        padding-left: 12px;
      }
      .from {
        color: #323232;
        text-align: center;
        .btn {
          padding: 3px;
          margin: 0;
          border-radius: 8px;
          font-weight: bold;
          color: #21b1fc;
          background-color: transparent;
          border: 1px solid transparent;
          outline: transparent;
          span {
            font-size: 20px;
            line-height: 1;
          }
        }
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }
    .foo-warning-item {
      font-size: 0;
      background-color: transparent;
      margin: 0;
      margin-bottom: 20px;
      padding: 10px 0;
      .foo-warning {
        font-size: 12px;
        line-height: 1.6;
        text-align: justify;
      }
    }
    @media only screen and (max-width: 470px) {
      .thirdparty-button {
        display: none;
      }
    }
  }
</style>
