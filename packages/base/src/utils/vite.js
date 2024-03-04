// export const requireFile = (url) => {
//   // console.log(import.meta.url, import(url));
//   // console.log(new URL('../assets/' + url.replace('@/assets/', ''), import.meta.url).href);
//   return require('../assets/' + url.replace('@/assets/', '')) //  new URL('../assets/' + url.replace('@/assets/', ''), import.meta.url).href;
// }
// export const requireFile = (url) => require('../assets/' + url.replace('@/assets/', ''));
import { FILE_STATIC_BASE_URL } from '@/utils/config.js';

export const requireFile = (url) => FILE_STATIC_BASE_URL + url.replace('@/assets/', '/assets/');
/**
 * 处理引用图片的函数
 * @param {*} path 图片相对路径
 * @param {*} outputDir 打包输出目录，用于生成引用的图片路径
 * @param {*} options url-loader 和 file-loader 的选项，参考文档：https://v5.webpack.docschina.org/loaders/url-loader/#options
 * @returns {String} 图片引用地址（相对路径）
 */
/* export function requireFile(path, outputDir, options = {}) {
  try {
    console.log(require)
    const imagePath = require(path).default;
    // 通过 url-loader 处理图片生成的路径，用于在 css 或 js 中引用
    const url = new URL(imagePath, window.location.origin);
    const relativePath = url.pathname.substring(url.pathname.indexOf(outputDir));

    return relativePath + url.search + url.hash;
  } catch (error) {
    console.error(error);
    return '';
  }
}*/
