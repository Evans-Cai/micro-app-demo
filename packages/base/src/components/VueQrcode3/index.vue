<template>
  <div class="qrcode" ref="qrcode"></div>
</template>
<script>
  import { requireFile } from '@/utils/vite.js';
  import * as QRCode from 'easyqrcodejs'

  export default {
    name: 'VueQrcode3',
    props: {
      value: {
        type: String,
        default: ''
      },
      width: {
        type: Number,
        default: 160
      },
      height: {
        type: Number,
        default: 160
      },
      options: {
        type: [Object],
        default: () => {
        }
      }
    },
    watch: {
      value() {
        this.$nextTick(() => {
          if (this.Qrcode) {
            this.Qrcode.makeCode(this.value);
          }
        })
      }
    },
    data() {
      return {
        Qrcode: null
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initQrcode();
      })
    },
    methods: {
      initQrcode() {
        const options = {
          text: this.value, // Content
          colorDark: '#000000', // Dark color
          colorLight: '#ffffff', // Light color
          // === Logo
          logo: requireFile('@/assets/image/logo/min_logo.png'), // LOGO
          // logo:"http://127.0.0.1:8020/easy-qrcodejs/demo/logo.png",
          logoWidth: 20,
          logoHeight: 20,
          quietZone: 10,
          quietZoneColor: '#fff',
          logoBackgroundColor: '#ffffff', // Logo backgroud color, Invalid when `logBgTransparent` is true; default is '#ffffff'
          logoBackgroundTransparent: false, // Whether use transparent image, default is false
          timing_V: '#000000',
          correctLevel: QRCode.CorrectLevel.H, // L, M, Q, H
          dotScale: 1,
          ...this.options,
          width: this.width - 20,
          height: this.height - 20
        }
        console.log(options);
        this.Qrcode = new QRCode(this.$refs.qrcode, options);
      }
    }
  }
</script>
