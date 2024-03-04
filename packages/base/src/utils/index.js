/**
 * Created by PanJiaChen on 16/11/18.
 */
import { APP_LOCAL_IP, FILE_BASE_URl } from '@/utils/config.js';
import { getPatientId, getToken } from '@/utils/auth.js';
import { compressToBase64 } from 'lz-string';

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  return format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
}
export function timeForMat(count) {
  // 拼接时间
  const time1 = new Date()
  time1.setTime(time1.getTime() - (24 * 60 * 60 * 1000))
  // const Y1 = time1.getFullYear()
  // const M1 = ((time1.getMonth() + 1) > 10 ? (time1.getMonth() + 1) : '0' + (time1.getMonth() + 1))
  // const D1 = (time1.getDate() > 10 ? time1.getDate() : '0' + time1.getDate())
  // const timer1 = Y1 + '-' + M1 + '-' + D1 // 当前时间
  const time2 = new Date()
  time2.setTime(time2.getTime() - (24 * 60 * 60 * 1000 * count))
  const Y2 = time2.getFullYear()
  const M2 = ((time2.getMonth() + 1) > 9 ? (time2.getMonth() + 1) : '0' + (time2.getMonth() + 1))
  const D2 = (time2.getDate() > 9 ? time2.getDate() : '0' + time2.getDate())
  // let timer2 = Y2 + '-' + M2 + '-' + D2 // 之前的7天或者30天
  // return {
  // // t1: timer1,
  // // t2: timer2
  // }
  return Y2 + '-' + M2 + '-' + D2 + ' 00:00:00';
}
/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()
  const diff = (now - d) / 1000
  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}
export function secondsFormat_zh(s) {
  const day = Math.floor(s / (24 * 3600)); // Math.floor()向下取整
  const hour = Math.floor((s - day * 24 * 3600) / 3600);
  const minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
  const second = s - day * 24 * 3600 - hour * 3600 - minute * 60;
  return day + '天' + hour + '时' + minute + '分' + second + '秒';
}
export function secondsFormat(s) {
  function cp(val) {
    if (parseInt(val) < 10) {
      return '0' + val;
    }
    return val
  }
  // var day = Math.floor(s / (24 * 3600)); // Math.floor()向下取整
  const day = 0;
  const hour = Math.floor(((s - day * 24 * 3600) / 3600));
  const minute = Math.floor((s - day * 24 * 3600 - hour * 3600) / 60);
  const second = s - day * 24 * 3600 - hour * 3600 - minute * 60;
  return cp(hour) + ':' + cp(minute) + ':' + cp(second);
}
/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}
/**
 * @returns {number} output value
 * @param str
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (let i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) {
      s++
    } else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}
/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}
/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}
/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"')
    .replace(/\+/g, ' ') +
    '"}'
  )
}
/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}
/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}
/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}
/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}
/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate = false) {
  let timeout, args, context, timestamp, result
  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp
    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }
  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }
    return result
  }
}
/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}
/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}
/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}
/**
 * Check if an element has a class
 * @param ele
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}
/**
 * Add class to element
 * @param ele
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}
/**
 * Remove class from element
 * @param ele
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}
/**
 * 平滑滚动
 *
 * **/
export function animateScroll(element, speed) {
  const rect = element.getBoundingClientRect();
  // 获取元素相对窗口的top值，此处应加上窗口本身的偏移
  const top = window.pageYOffset + rect.top;
  let currentTop = 0;
  let requestId;
  // 采用requestAnimationFrame，平滑动画
  function step(timestamp) {
    currentTop += speed;
    if (currentTop <= top) {
      window.scrollTo(0, currentTop);
      requestId = window.requestAnimationFrame(step);
    } else {
      window.cancelAnimationFrame(requestId);
    }
  }
  window.requestAnimationFrame(step);
}
/**
 * @name 处理image 路径问题
 * */
export function staticUri(url) {
  if (url) {
    return url.indexOf('http') > -1 ? url : `${FILE_BASE_URl}${url}`;
  }
  return ''
}
/**
 * @param {string|number} phone
 * @returns {Boolean}
 * 是否是电话
 * */
export function isTel(phone) {
  const reg = /^1[0-9]{10,10}$/;
  return reg.test(phone);
}
/**
 * @param {string|number} phone
 * @returns {string}
 * 脱敏手机号码
 * */
export function desensitization(phone) {
  const reg = phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') // 隐藏手机号
  return reg;
}
/**
 * @param {string}
 * @returns {string}
 * 获取16位随机码
 * */
export function getRandom(num = 16) {
  var amm = ['!', '@', '#', '$', '%', '&', '*', '(', ')', '_', 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var tmp = Math.floor(Math.random() * num);
  var s = tmp;
  s = s + amm[tmp];
  for (let i = 0; i < Math.floor(num / 2) - 1; i++) {
    tmp = Math.floor(Math.random() * 26);
    s = s + String.fromCharCode(65 + tmp);
  }
  for (let i = 0; i < (num - Math.floor(num / 2) - 1); i++) {
    tmp = Math.floor(Math.random() * 26);
    s = s + String.fromCharCode(97 + tmp);
  }
  return s;
}
/**
 * @name 处理image 路径问题
 * */
export function generateQrUri(stringify = {}, redirect = '') {
  const _redirect = redirect;
  const _stringify = JSON.stringify(stringify);
  const a = `${APP_LOCAL_IP}/#/mobile/async?token=${getToken()}&patientId=${getPatientId()}&redirect=${encodeURIComponent(_redirect)}&stringify=${encodeURIComponent(_stringify)}`;
  console.debug(a);
  return a;
}
/**
 *
 * */
export function insetQrcodeUrl(token = '', query = {}) {
  const path = '/mobile/chat';
  const stringify = JSON.stringify(query);
  return `${APP_LOCAL_IP}/#/mobile/async?token=${token}&redirect=${encodeURIComponent(path)}&stringify=${encodeURIComponent(stringify)}`;
}
/**
 *
 * */
export function generateQrcodeUrl(token = '', redirect = '', query = {}) {
  // console.log('原始字符串', JSON.stringify({ token: token, redirect: redirect, stringify: query }).length);
  // console.log('URL字符串', encodeURIComponent(JSON.stringify({ token: token, redirect: redirect, stringify: query })).length);
  // console.log('AES字符串', AESEncrypt(JSON.stringify({ token: token, redirect: redirect, stringify: query })).length);
  const encryptData = compressToBase64(JSON.stringify({ token: token, redirect: redirect, stringify: query }));
  console.log('压缩算法字符串', encryptData.length, encryptData);
  return `${APP_LOCAL_IP}/#/mobile/async?encryptData=${encodeURIComponent(encryptData)}`;
  // return `${APP_LOCAL_IP}/#/mobile/async?token=${token}&redirect=${encodeURIComponent(path)}&stringify=${encodeURIComponent(stringify)}`;
}
