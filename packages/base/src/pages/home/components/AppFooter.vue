<template>
  <footer class="foot">
    <div class="content flex-box justify-between">
      <div class="col h-center" @click="onHome">
        <img :src="title" alt="">
      </div>
    </div>
  </footer>
</template>
<script>
  import { mapGetters } from 'vuex';
  import { requireFile } from '@/utils/vite.js';
  export default {
    name: 'AppFooter',
    data() {
      return {
        title: requireFile('@/assets/image/home/mtmBottom2X.png')
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
  .foot {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    padding: 2vh 5vw;
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
      img {
        height: 20px;
        vertical-align: middle;
      }
    }
    .left {
      font-size: 32px;
      color: rgba(255, 255, 255, 0.9);
      font-weight: bold;
    }
    .right {
      font-size: 32px;
      font-weight: bold;
      justify-content: flex-end;
      color: rgba(255, 255, 255, 0.9);
      .name {
        font-weight: 600;
        margin-right: 15px;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 14vw;
        white-space: nowrap;
      }
    }
  }
</style>
