<template>
  <div class="homepage">
    <img src="../assets/logo.png" alt="Vue logo" />
    <h1>主应用 - Vite + Vue@3.x</h1>
    <p>
      Recommended IDE setup:
      <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
      +
      <a
          href="https://marketplace.visualstudio.com/items?itemName=octref.vetur"
          target="_blank"
      >
        Vetur
      </a>
      or
      <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
      (if using
      <code>&lt;script setup&gt;</code>)
    </p>

    <p>See <code>README.md</code> for more information.</p>

    <p>
      <a href="https://vitejs.dev/guide/features.html" target="_blank">
        Vite Docs
      </a>
      |
      <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
    </p>

    <button type="button" @click="count++">count is: {{ count }}</button>
    <p>
      Edit
      <code>pages/Hellopage.vue</code> to test hot module replacement.
    </p>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  const count = ref(0);
</script>

<style scoped>
  h1 {
    font-size: 24px;
  }
  a {
    color: #42b983;
  }

  label {
    margin: 0 0.5em;
    font-weight: bold;
  }

  code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
  }
  .homepage {
    text-align: center;
  }
</style>
