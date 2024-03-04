import Cookies from 'js-cookie';

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  size: Cookies.get('size') || 'medium',
  route: {
    to: null,
    from: null
  },
  loading: false,
  queueStatus: 0,
  showHeader: true,
  appThemes: {
    headColor: '#31466B',
    theme: 'dark',
    transactionColor: '#20304B'
  },
  //
  hasLaunch: {}
}
const getters = {
  size: state => state.size,
  device: state => state.device,
  appThemes: state => state.appThemes,
  showHeader: state => state.showHeader
}
const mutations = {
  SET_APP_THEMES: (state, payload) => {
    state.appThemes = { ...state.appThemes, ...payload };
  },
  SET_APP_HEADER: (state, payload = true) => {
    state.showHeader = payload;
  },
  QUEUE_STATUS: (state) => {
    state.queueStatus += 1;
  },
  SET_HAS_LAUNCH: (state, payload) => {
    state.hasLaunch = payload;
  }
}
const actions = {
  appThemes({ commit }, payload) {
    commit('SET_APP_THEMES', payload);
  },
  setShowHeader({ commit }, payload) {
    commit('SET_APP_HEADER', payload);
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
