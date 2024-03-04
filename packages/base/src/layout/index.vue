<template>
  <div class="app-section-box" :style="{'background-color': appThemes.transactionColor}"
       :class="{'back': showFamousDoctorRoomBack}">
    <!---->
    <fixed-header class="container-header-box" :title="title" v-if="hasHeader"/>
    <!---->
    <main class="container-main-box" :class="{'section-height': hasHeader}">
      <router-view v-slot="{ Component }">
        <Transition name="fade-all">
          <component :is="Component" :key="$route.fullPath"/>
        </Transition>
      </router-view>
    </main>
    <!---->
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import FixedHeader from './FixedHeader.vue';
  import { TITLE } from '@/utils/config.js';

  export default {
    name: 'LayoutPage',
    components: { FixedHeader },
    computed: {
      ...mapGetters({
        showHeader: 'app/showHeader',
        appThemes: 'app/appThemes'
      }),
      showFamousDoctorRoomBack() {
        return this.$route.path.indexOf('famousDoctorRoom/') > -1;
      },
      key() {
        return this.$route.path
      },
      hasHeader() {
        console.log(this.$route);
        // 如果是首页
        if (['/home'].includes(this.$route.path)) {
          return false;
        }
        // 如果是手机端
        if (this.$route.path.indexOf('/mobile/') > -1) {
          return false;
        }
        return this.showHeader
      },
      //
      title() {
        return this.$route.meta.title || TITLE
      }
    },
    async created() {
      // 默认启动了 websocket
      await this.$store.dispatch('user/getInfo');
      await this.$store.dispatch('websocket/initData');
    }
  }
</script>
<style lang="scss" scoped>
  $img: $STATIC_BASE_API + '/assets/image/famousDoctorRoom/back2x.jpg';
  .app-section-box {
    height: 100%;
    width: 100%;
    position: relative;
    min-height: 100vh;
    &.back {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      background-image: url($img);
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center right;
      z-index: 0;
    }
  }
  .doctor-box-wrapper {
    height: 100%;
    min-height: inherit;
    width: 100vw;
  }
  .container-main-box {
    min-height: 100vh;
    &.section-height {
      min-height: calc(100vh - 55px);
    }
  }
</style>
