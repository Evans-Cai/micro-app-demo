const { defineConfig } = require('@vue/cli-service');
const { resolve } = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: 3001,
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  },
  configureWebpack: {
    // 配置别名
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'), // 设置~指向src
      },
    }
  }
})
