import { saveConsultationLog } from '@/api/logs.js';

const store = {
  namespaced: true,
  state: {
    logs: []
  },
  getters: {
    errorLogs: state => state.logs
  },
  mutations: {
    ADD_ERROR_LOG: (state, log) => {
      state.logs.push(log)
    },
    CLEAR_ERROR_LOG: (state) => {
      state.logs.splice(0)
    }
  },
  actions: {
    addErrorLog({ commit }, log) {
      commit('ADD_ERROR_LOG', log)
    },
    //
    async syncAddErrorLog({ commit }, payload) {
      try {
       const response = await saveConsultationLog({ ...payload, type: '1' });
       console.log(response);
      } finally {
        console.debug('syncAddErrorLog');
      }
    },
    //
    clearErrorLog({ commit }) {
      commit('CLEAR_ERROR_LOG')
    }
  }
}
export default store
