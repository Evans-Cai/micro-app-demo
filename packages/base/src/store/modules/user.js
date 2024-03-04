import { autoLogin, getInfo, login, logout } from '@/api/user.js';
import { getPatientId, getToken, removeToken, removeUserInfo, setPatientId, setToken, setUserInfo } from '@/utils/auth.js';
import { FILE_BASE_API, defaultAvatarUri } from '@/utils/config.js';
import { userPatient } from '@/api/patient.js';
import { addressList } from '@/api/dispensing.js';

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  info: {
    'userId': '',
    'sex': '',
    'sexStr': '',
    'realName': '',
    'phone': '',
    'mobile': '',
    'avatar': '',
    'avatarUrl': '',
    'avatarUri': '',
    'birthDate': '',
    'area': '',
    'certificatesType': '',
    'certificateNo': '',
    'verified': ''
  },
  patientId: getPatientId(),
  patientInfo: {
    'age': '',
    'defaultMedical': 1,
    'idCard': '',
    'medicareCardNo': '',
    'mobile': '',
    'name': '',
    'patientCardNo': '',
    'sex': '',
    'departCode': ''
  },
  addressInfo: {
    'resourceId': '',
    'name': '',
    'userId': '',
    'mobile': '',
    'area': '',
    'addRess': '',
    'isDefault': 0,
    'createTime': '',
    'province': '',
    'provinceCode': '',
    'city': '',
    'cityCode': '',
    'district': '',
    'districtCode': ''
  },
  addressList: [],
  customField: '' // 自定义字段
}
const getters = {
  userId: state => state.info.userId,
  token: state => state.token,
  avatar: state => state.avatar,
  info: state => state.info,
  name: state => state.name,
  introduction: state => state.introduction,
  roles: state => state.roles,
  patientId: state => state.patientId,
  patientInfo: state => state.patientInfo,
  addressInfo: state => state.addressInfo,
  addressList: state => state.addressList,
  customField: state => state.customField
}
// 同步
const mutations = {
  // 选中地址 {包含默认地址} 默认地址
  SET_ADDRESS_INFO(state, payload) {
    state.addressInfo = payload;
  },
  SET_ADDRESS_LIST(state, payload) {
    state.addressList = payload;
  },
  SET_USER_INFO(state, payload) {
    state.info = payload;
  },
  SET_PATIENT_ID(state, payload) {
    state.patientId = payload;
  },
  SET_PATIENT_INFO(state, payload) {
    state.patientInfo = { ...state.patientInfo, ...payload };
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_CUSTOM_FIELD: (state, customField) => {
    state.customField = customField
  },
  SET_INFO: (state, info) => {
    state.info = { ...state.info, ...info }
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}
const actions = {
  // 外部自动登录
  async automatic({ commit, dispatch }, payload) {
    try {
      console.log('automatic => payload', payload);
      const { patientId, token, robotPatientGuid } = payload;
      console.log(patientId, token);
      if (token && patientId) {
        commit('SET_TOKEN', token);
        setToken(token);
        //
        commit('SET_PATIENT_ID', patientId);
        setPatientId(patientId);
        // 设置特殊字段
        commit('SET_CUSTOM_FIELD', robotPatientGuid);
        //
        await dispatch('getPatientInfo', patientId);
        return true
      } else {
        return Promise.reject('message:缺少patientId, token');
      }
    } catch (e) {
      console.log(e);
      return Promise.reject(e)
    }
  },
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      const { username, password } = userInfo;
      const userData = { userName: username.trim(), userPassword: password };
      login({ ...userData }).then(response => {
        if ([200].includes(response.code)) {
          const { accessToken, refreshToken, user } = response.result;
          commit('SET_TOKEN', accessToken);
          setToken(accessToken);
          //
          const userInfo = { ...response.result, accessToken, refreshToken, ...user };
          commit('SET_INFO', userInfo);
          setUserInfo(userInfo);
          resolve(response);
        } else {
          resolve(response)
        }
      }).catch(reject)
    })
  },
  // auto login
  autoLogin({ commit, state, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      autoLogin(payload).then((response) => {
        const { accessToken } = response.result;
        commit('SET_TOKEN', accessToken);
        setToken(accessToken);
        commit('SET_INFO', { ...response.result });
        setUserInfo({ ...response.result });
        resolve(response);
      }).catch(reject)
    })
  },
  //
  getPatientInfo({ commit, state, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      userPatient({ patientCode: payload }).then(response => {
        commit('SET_PATIENT_INFO', response.result);
        resolve(response.result);
      }).catch(reject);
    })
  },
  // get user info
  getInfo({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const info = {
          ...response.result,
          sexStr: response.result.sex === '0' ? '男' : '女',
          introduction: '',
          name: response.result.realName,
          roles: ['patient']
        };
        if (!info) {
          reject('Verification failed, please Login again.')
        }
        //
        info.avatarUrl = info.avatar; // 无http的后缀地址
        info.avatarUri = info.avatar ? `${FILE_BASE_API}${info.avatar}` : defaultAvatarUri;
        info.avatar = info.avatarUri;
        /**
         * @params introduction 用户的简介
         * @params name 用户名
         * @params avatar 头像
         * @params roles 权限
         * */
          // roles must be a non-empty array
        const { roles, avatar } = info;
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        commit('SET_ROLES', roles)
        commit('SET_AVATAR', avatar)
        commit('SET_INFO', info)
        //
        setUserInfo(info);
        //
        resolve(info)
      }).catch(reject)
    })
  },
  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        localStorage.removeItem('INFO');
        // reset visited views and cached views
        dispatch('websocket/disConnect', null, { root: true })
        resolve(true)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      removeUserInfo()
      resolve()
    })
  },
  // address
  selectAddressList({ commit, state }) {
    return new Promise((resolve, reject) => {
      const data = {
        resourceId: '',
        pageNum: 1,
        pageSize: 10
      }
      addressList(data).then(({ result }) => {
        const { list } = result;
        const { resourceId } = state.addressInfo;
        //
        const _list = list.map((e) => ({ ...e, _phone: e.mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2') }))
        console.log('77777==>', _list);
        commit('SET_ADDRESS_LIST', _list);
        // 假设info的id在list里存在就判定为有效值
        const tp = _list.some(e => e.resourceId === resourceId);
        //
        let item = {};
        if (Array.isArray(_list) && _list.length > 0) {
          item = _list[0]
        }
        if (!tp) {
          commit('SET_ADDRESS_INFO', item);
        }
        resolve(_list)
      }).catch(reject);
    })
  }
}
const store = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
export default store
