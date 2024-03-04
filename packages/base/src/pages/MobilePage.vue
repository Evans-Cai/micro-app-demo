<template>
  <div>
    <micro-app
        v-bind="appConfig"
        @created="handleCreated"
        @beforemount="handleBeforemount"
        @mounted="handleMounted"
        @unmount="handleUnmount"
        @error="handleError"
        @datachange="handleDataChange">
    </micro-app>
  </div>
</template>
<script setup>
  import config from '@/config.js';

  const appConfig = {
    name: config.mobile.name,
    url: config.mobile.url,
    baseroute: config.mobile.baseroute,
  };
  const handleCreated = () => {
    console.log(`${appConfig.name}被创建`);
  };
  const handleBeforemount = () => {
    console.log(`${appConfig.name}即将被渲染`);
  };
  const handleMounted = () => {
    console.log(`${appConfig.name}已经渲染完成`);
  };
  const handleUnmount = () => {
    console.log(`${appConfig.name}已经被卸载`);
  };
  const handleError = () => {
    console.log(`${appConfig.name}渲染出错`);
  };
  const handleDataChange = (e) => {
    console.log(`来自子应用${appConfig.name},`, e?.detail.data);
  };
</script>
<style scoped></style>
