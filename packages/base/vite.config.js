import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
//
import { VarletImportResolver } from '@varlet/import-resolver';
import { VantResolver } from '@vant/auto-import-resolver';
// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log(env);
  return defineConfig({
    base: '',
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => /^micro-app/.test(tag),
          },
        },
      }),
      Components({
        resolvers: [VantResolver(), VarletImportResolver()]
      }),
      AutoImport({
        resolvers: [VarletImportResolver({ autoImport: true })]
      })
    ],
    define: {
      'process.env': process.env
    },
    server: {
      port: 3000,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
        'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept'
      },
      // 反向代理配置
      proxy: { // 配置多个代理
        '/api': {
          target: env['VITE_APP_BASE_API'], // 例子:http://192.168.1.177:8080 或测试服务器https://xxxx.com
          changeOrigin: true, // /设置访问目标地址允许跨域
          rewrite: (p) => p.replace(/^\/api/, '')
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
        @import "src/styles/variables.module.scss";
        $STATIC_BASE_API: "${env.VITE_APP_FILE_STATIC_BASE_URL}";`
        }
      }
    },
    // 配置别名
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'), // 设置@指向src
      },
    }
  })
}
