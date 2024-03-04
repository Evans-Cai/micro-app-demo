<template>
  <header class="fixed-header" :style="{background: appThemes.headColor}">
    <div class="column lft">
    </div>
    <div class="column txt" @click="toTop">{{ title }}</div>
    <div class="column rlt">
      <!--<button class="btn" @click="onHome">
        <svg-icon size="30" type="mdi" :path="mdiHomeExportOutline"/>
      </button>-->
    </div>
  </header>
</template>
<script>
  import { closeToast, showToast } from 'vant';
  import { mapGetters } from 'vuex';

  export default {
    name: 'FixedHeader',
    // components: { SvgIcon },
    props: {
      title: {
        type: [String, Number],
        default: ''
      }
    },
    data() {
      return {
        // mdiHomeExportOutline: mdiHomeExportOutline
      }
    },
    computed: {
      ...mapGetters({
        'appThemes': 'app/appThemes'
      })
    },
    methods: {
      toTop() {
        // window.scrollTo(0, 0, {
        //   behavior: 'smooth'
        // });
        document.documentElement.scrollIntoView({
          behavior: 'smooth'
        });
      },
      onHome() {
        // onFinishClose
        if (typeof window.nativeMethod !== 'undefined') {
          showToast({ type: 'loading', message: '退出中', duration: 2000 });
          window.nativeMethod.onFinishClose();
          closeToast();
        } else {
          showToast({ type: 'text', message: '退出异常', duration: 2000 });
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .fixed-header {
    background: #31466B;
    color: #fff;
    height: 55px;
    width: 100vw;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 999;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    .column {
      flex: 1;
    }
    .lft {
      text-align: left;
      line-height: 1;
    }
    .rlt {
      text-align: right;
      line-height: 1;
    }
    .btn {
      padding: 3px 5px;
      appearance: none;
      border: 0;
      background: transparent;
    }
    .txt {
      height: inherit;
      line-height: 55px;
      font-size: 22px;
      font-weight: bold;
      color: inherit;
    }
  }
</style>
