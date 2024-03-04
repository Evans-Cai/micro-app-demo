<template>
  <div>
    <canvas ref="canvas" :aria-label="value"></canvas>
  </div>
</template>
<script>
  import QRCode from 'qrcode';

  export default {
    name: 'VueQrcode',
    props: {
      value: {
        type: String,
        default: ''
      },
      options: {
        type: Object,
        default: () => ({
          width: 150,
          height: 150,
          color: { dark: '#333', light: '#fff' }
        })
      }
    },
    watch: {
      value() {
        this.initQrcode();
      }
    },
    mounted() {
      this.initQrcode();
    },
    methods: {
      initQrcode() {
        this.$nextTick(() => {
          QRCode.toCanvas(this.$refs.canvas, this.value, {
            height: this.options.height,
            width: this.options.width
          }, (error) => {
            if (error) console.error(error);
            console.log('QR code generated');
            // this.$refs.canvas.width = this.options.width;
            // this.$refs.canvas.height = this.options.height;
            // this.$refs.canvas.style.width = this.options.width + 'px';
            // this.$refs.canvas.style.height = this.options.height + 'px';
          })
        })
      },
      // 导出QR Code为Base64字符串
      exportQrCodeAsBase64() {
        const base64Data = this.$refs.canvas.toDataURL();
        console.log(base64Data);
        return base64Data;
      }
    }
  };
</script>
