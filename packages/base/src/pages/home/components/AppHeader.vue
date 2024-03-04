<template>
  <header class="head">
    <div class="content flex-box justify-between">
      <div class="col left flex-box align-center">
      </div>
      <div class="col h-center" @click="onHome">
        <img class="img" :src="title" alt=""/>
      </div>
      <div class="col right flex-box">
        <div class="user">
          <svg-icon size="28" type="mdi" :path="mdiCardAccountDetailsOutline"/>
          <span class="name">{{ patientName }}</span>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
  import { mapGetters } from 'vuex';
  import { requireFile } from '@/utils/vite.js';
  import { mdiCardAccountDetailsOutline } from '@mdi/js';

  export default {
    name: 'AppHeader',
    data() {
      return {
        mdiCardAccountDetailsOutline: mdiCardAccountDetailsOutline,
        title: requireFile('@/assets/image/home/mtm2X.png')
      };
    },
    computed: {
      ...mapGetters({
        info: 'user/info',
        token: 'user/token',
        patientInfo: 'user/patientInfo'
      }),
      patientName() {
        return this.patientInfo.name;
      }
    },
    methods: {
      onHome() {
        this.$router.push({ path: '/home' })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .head {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    padding: 2vh 6vw;
    .content {
      height: 100%;
      display: flex;
      align-items: center;
    }
    .h-center {
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      .img {
        height: 30px;
        vertical-align: middle;
      }
    }
    .left {
      font-size: 28px;
      color: rgba(255, 255, 255, 0.9);
      font-weight: bold;
      .name {
        font-weight: 600;
        margin-right: 60px;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 14vw;
        white-space: nowrap;
        display: flex;
        align-items: center;
      }
    }
    .right {
      font-size: 28px;
      font-weight: bold;
      color: rgba(255, 255, 255, 0.9);
      justify-content: flex-end;
      .user {
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
      .name {
        max-width: 100px;
        font-weight: 600;
        margin-right: 0;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        line-height: 1;
        margin-left: 10px;
      }
    }
  }
</style>
