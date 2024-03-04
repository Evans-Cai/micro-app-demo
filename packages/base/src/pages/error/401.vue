<template>
  <div class="errPage-container">
    <var-row class="card">
      <var-col :span="12">
        <h1 class="text-jumbo text-ginormous">
          访问错误!
        </h1>
        <h2>您没有访问权限！</h2>
        <h6>对不起，您没有访问权限，请不要进行非法操作！您可以返回主页面</h6>
        <var-button v-if="isDev" type="primary" round @click="back">前往首页</var-button>
      </var-col>
      <var-col :span="12">
        <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </var-col>
    </var-row>
  </div>
</template>
<script>
  import { ENVIRONMENT } from '@/utils/config.js';
  import { requireFile } from '@/utils/vite.js';

  export default {
    name: '401Page',
    data() {
      return {
        errGif: requireFile('@/assets/image/401_images/401.gif')
      }
    },
    computed: {
      isDev() {
        return ENVIRONMENT.MODE === 'development';
      }
    },
    methods: {
      back() {
        this.$router.push({ path: '/login' })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .errPage-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    .card {
      padding: 10px;
      border-radius: 18px;
      background-color: #fff;
    }
    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #666;
    }
    .list-unstyled {
      font-size: 14px;
      li {
        padding-bottom: 5px;
      }
      a {
        color: #008489;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
