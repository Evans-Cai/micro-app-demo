import { doctorDetail } from '@/api/patient.js';
import { reqPatientList } from '@/api/serviceWorkbench.js';
import VueWebSocket from '@/websocket/index.js';
import Uuid from '@/utils/Uuid.js';
// api chatMsgGet
import { getImMsg, userRtcSign } from '@/api/chat.js';
import { defaultAvatar } from '@/utils/config.js';
import { staticUri } from '@/utils/index.js';
import { reservationInfo } from '@/api/reservation.js';
import router from '@/router/index.js';
//
import { wsOpenVideoClient } from '@/store/utils/wsOpenVideo.js';

const state = {
  // 输入的搜索值
  searchText: '',
  // 得知当前选择的是哪个对话
  selectedId: null,
  vueSocket: null,
  //
  lastMessageId: null,
  // 当前选中的人的消息list
  selectedMessageList: [],
  messageListTotal: 0,
  // 握手状态
  isConnected: false,
  extras: {
    roomId: '',
    sdkAppId: '',
    signature: '',
    userList: [], // 视频房间里的人的id
    name: '',
    userId: '',
    avatar: '',
    type: '',
    chatType: 'video'
  },
  // 当前的聊天相关信息
  currentConversation: {
    type: 'C2C', // 会话类型 c2c 单聊
    interrogationType: '',
    interrogationState: true, // true 已结束
    interrogationEvaluationStatus: false, // 是否评价过
    interrogationId: '',
    patientId: '', // 就诊人guid
    clinicId: '', // 会话id
    otherName: '', // 对方的名称
    otherAvatar: '', // 对方的头像
    otherId: '', // 对方的guid
    selfId: '', // 自己的guid
    selfName: '', // 自己的名称
    selfAvatar: '', // 自己的头像
    userList: [],
    state: '',
    roomId: ''
  },
  qrcode: '',
  // 问诊类型 0 图文 1视频 2语音
  consultationType: ''
  // this.$store.dispatch('websocket/setConsultationType', '3');
};
//
const getters = {
  qrcode: state => state.qrcode,
  //
  consultationType: state => state.consultationType,
  //
  currentConversation: (state) => state.currentConversation,
  //
  extras(state) {
    console.log('extrasextrasextrasextrasextras32423423', state);
    return state.extras;
  },
  //
  lastMessageId: (state) => state.lastMessageId || null,
  // 筛选出含有搜索值的聊天列表
  searchedChatList(state) {
    return state.chatList.filter(sessions => sessions.name.includes(state.searchText));
  },
  //
  selectedId: state => state.selectedId,
  // 选中的 select message list
  selectedMessageList: (state, getters) => {
    const list = state.selectedMessageList.map(e => {
      const user = getters.currentConversation.userList.find(e1 => e1.userId === e.content.senderId);
      return {
        ...e,
        content: {
          ...e.content,
          name: user ? user.username : '--',
          avatarUri: user ? user.avatar : defaultAvatar
        }
      };
    });
    console.log(list, getters.currentConversation.userList);
    return list;
  },
  //
  messageListTotal: (state) => state.messageListTotal || 0,
  //
  selectedMessageLen(state) {
    return state.selectedMessageList.length;
  }
};
//
const mutations = {
  // 推送的消息同步
  PUSH_MESSAGE_LIST(state, msg) {
    state.selectedMessageList = state.selectedMessageList.concat(msg);
  },
  // 设置 extras
  SET_EXTRAS: (state, payload) => {
    const roomId = state.currentConversation.roomId ? state.currentConversation.roomId : state.extras.roomId;
    state.extras = { ...state.extras, ...payload, roomId: roomId };
  },
  // 从localStorage 中获取数据
  INIT_DATA: (state) => {
    console.log(state);
    if (state.vueSocket) {
      console.debug('state.vueSocket', state);
      state.vueSocket.close();
    }
    state.vueSocket = new VueWebSocket();
    console.log('111111111', state.vueSocket);
  },
  // 设置默认会话列表
  SET_CHAT_LIST: (state, payload) => {
    state.chatList = payload;
  },
  // 获取搜索值
  SEARCH: (state, payload) => {
    state.searchText = payload;
  },
  // 发送消息到对端
  SEND_MESSAGE: (state, payload) => {
    const data = state.vueSocket.sendMessage(payload.subSignal, JSON.stringify(payload.protoMessage.content));
    const { subSignal, protoMessage } = data;
    console.log(data);
    if (subSignal === 'MS') {
      if (protoMessage) {
        state.selectedMessageList.push(payload.protoMessage);
      }
    }
  },
  // 远程推送的消息同步
  PUSH_MESSAGE: (state, payload) => {
    state.selectedMessageList.push(payload);
  },
  // 关闭websocket
  DISCONNECT: (state) => {
    if (state.vueSocket) {
      console.debug('state.vueSocket', state.vueSocket);
      state.vueSocket.sendDisConnectMessage();
      state.vueSocket.close();
    }
  },
  //
  IS_CONNECTED: (state, payload) => {
    state.isConnected = payload;
  },
  // 设置 选中的clinicId
  SET_SELECT_ID: (state, payload) => {
    state.selectedId = payload;
  },
  //
  LAST_MESSAGE_ID(state, payload) {
    state.lastMessageId = payload;
  },
  // 累加 历史 message消息
  SHIFT_MESSAGE_LIST: (state, payload) => {
    state.selectedMessageList = [...payload, ...state.selectedMessageList];
  },
  // 累加 历史 message消息
  SHIFT_MESSAGE_LIST_TOTAL: (state, payload) => {
    state.messageListTotal = payload;
  },
  // 设置消息体list
  SET_MESSAGE_LIST: (state, payload) => {
    state.selectedMessageList = [...payload];
  },
  //
  SET_RESET_CURRENT_INFO: (state, payload) => {
    state.currentConversation = {
      type: 'C2C', // 会话类型 c2c 单聊
      interrogationType: '',
      interrogationState: true,
      interrogationEvaluationStatus: false, // 是否评价过
      interrogationId: '',
      patientId: '', // 就诊人guid
      clinicId: '', // 会话id
      otherName: '', // 对方的名称
      otherAvatar: '', // 对方的头像
      otherId: '', // 对方的guid
      selfId: '', // 自己的guid
      selfName: '', // 自己的名称
      selfAvatar: '', // 自己的头像
      chatType: '', // 0 单聊 1群聊
      groupId: '', //  组
      userList: [],
      state: '',
      roomId: ''
    };
  },
  //
  SET_CURRENT_INFO: (state, info) => {
    if (!info) {
      console.warn('异常操作！，不能设置‘currentConversation’');
      return;
    }
    state.currentConversation = {
      type: 'C2C', // 会话类型 c2c 单聊
      interrogationType: info.conditionType, // 问诊类型
      interrogationState: info.state.toString() === '2', // 是否结束
      interrogationEvaluationStatus: false, // 是否评价过
      interrogationId: info.clinicId, // 问诊id
      clinicId: info.clinicId, // 会话id
      patientId: info.patientId || '', // 就诊人的id
      doctorId: info.doctorId || '', // 医生的id
      otherId: info.doctorId, // 对方的id
      otherName: info.doctorName, // 对方的名称
      otherAvatar: staticUri(info.doctorAvatar) || defaultAvatar, // 对方的头像
      selfId: info.userId, // 自己的id
      selfName: info.patientName, // 自己的名称
      selfAvatar: defaultAvatar, // 自己的头像
      chatType: '0', // 0 单聊 1群聊
      groupId: '', //  组
      userList: [
        { userId: info.doctorId, username: info.doctorName, avatar: staticUri(info.doctorAvatar) },
        { userId: info.userId, username: info.patientName, avatar: defaultAvatar }
      ],
      state: info.state,
      roomId: info.roomId || ''
    };
  },
  //
  SET_QRCODE: (state, payload) => {
    state.qrcode = payload;
  },
  //
  SET_CONSULTATION_TYPE: (state, payload) => {
    state.consultationType = payload;
  }
};
//
const actions = {
  // 初始话构造 websocket
  initData: ({ commit }) => {
    commit('INIT_DATA');
  },
  // 关闭websocket 通过id 获取对应的 message
  disConnect({ commit, state, dispatch }, params) {
    commit('DISCONNECT', params);
  },
  // 检索会话的search方法
  search({ commit }, selectedId) {
    setTimeout(() => {
      commit('SEARCH', selectedId);
    }, 100);
  },
  // 查询会诊信息
  async clinicIdInfo({ commit, state, dispatch, rootState }, clinicId) {
    try {
      commit('SET_RESET_CURRENT_INFO');
      const res = await reservationInfo({ reservationId: clinicId });
      commit('SET_SELECT_ID', clinicId);
      commit('SET_CURRENT_INFO', { ...res.result, userId: rootState.user.info.userId, clinicId: clinicId });
      return res.result;
    } catch (e) {
      return Promise.reject(e);
    }
  },
  // 发送出去的消息
  sendMessage({ commit, rootState, state }, payload) {
    return new Promise((resolve, reject) => {
      const defaultData = {
        'messageId': new Date().getTime() + '' + new Uuid().v1_1(6),
        'clinicId': state.currentConversation.clinicId, // 会话ID
        'senderId': state.currentConversation.senderId, // 发送者ID
        'receiverId': state.currentConversation.receiverId, // 接收者ID
        'chatType': '0', // {单聊， 群聊}
        'groupId': state.currentConversation.groupId, // 组ID
        ...payload.protoMessage
      };
      let fileUrl = '';
      if (['1', '2', '3', '6'].includes(String(defaultData.type))) {
        fileUrl = staticUri(defaultData.content);
      }
      console.log('ssssss', rootState);
      const content = {
        content: { ...defaultData, type: defaultData.type.toString(), fileUrl: fileUrl },
        signal: 'CONTACT',
        flow: rootState.user.info.userId === defaultData.receiverId ? 'in' : 'out',
        isPeerRead: true, // 已读未读
        isRevoked: false // 撤回
      };
      commit('SEND_MESSAGE', { subSignal: payload.subSignal, protoMessage: content });
      resolve(defaultData);
    });
  },
  // 接收推送来的消息
  async pushMessage({ commit, state, rootState, dispatch }, msg) {
    try {
      console.log(msg);
      const { type, clinicId, extras } = msg;
      // 补充如果会诊信息不全时，获取会诊信息
      if (!state.currentConversation.patientId) {
        await dispatch('clinicIdInfo', clinicId);
      }
      let _extras = extras;
      if (typeof extras === 'string') {
        _extras = extras.indexOf('{') > -1 ? JSON.parse(extras) : extras;
      }
      console.log('=======================>', state.selectedId, type, extras);
      // 如果是当前选中的会话就消息同步
      if (state.selectedId === clinicId) {
        const path = router.currentRoute.value.path;
        console.log('#######', router, router.currentRoute.value);
        if (!(path.indexOf('/mobile/') > -1)) {
          switch (type) {
            // 7 医生发起视频
            case '7':
              dispatch('openTrtcVideo', clinicId);
              break;
            // 患者远程挂断语音视频
            case '8':
              break;
            // 患者远程挂断语音视频
            case '9':
              commit('SET_EXTRAS', { ..._extras, type: type, chatType: null });
              break;
            // 医生结束就诊
            case '10':
              dispatch('clinicIdInfo', state.selectedId);
              break;
            // 11 医生发起语音
            case '11':
              commit('SET_EXTRAS', { ..._extras, type: type, chatType: 'audio' });
              break;
            // 22 服务包提交的发起视频
            case '22':
              dispatch('openServiceWorkbenchTrtcVideo', clinicId);
              break;
          }
        }
        console.log('????==>', msg);
        const messageList = [msg].map((e) => {
          let fileUrl = e.content;
          if (['1', '2', '3', '6'].includes(String(e.type))) {
            fileUrl = staticUri(e.content);
          }
          return {
            content: { ...e, type: e.type.toString(), fileUrl: fileUrl },
            signal: 'CONTACT',
            flow: rootState.user.info.userId === e.senderId ? 'out' : 'in',
            isPeerRead: true, // 已读未读
            isRevoked: false // 撤回
          };
        });
        commit('PUSH_MESSAGE_LIST', messageList);
        const lastMessageId = state.selectedMessageList.length > 0 ? state.selectedMessageList[state.selectedMessageList.length - 1].messageId : null;
        commit('LAST_MESSAGE_ID', lastMessageId);
      }
    } catch (e) {
      console.error(e);
    }
  },
  // 自己显示回执 多端同步
  receiptMessage({ commit, state, rootState, dispatch }, msg) {
    const { content } = msg;
    if (content) {
      const _content = JSON.parse(content);
      console.debug('receiptMessage : ', _content, state);
      const _state = state.selectedMessageList.find(msg => msg.content.messageId === _content.messageId);
      console.debug('_state', _state, !_state);
      if (!_state) {
        dispatch('pushMessage', {
          ..._content,
          self: rootState.user.info.userId === content.senderId
        });
      }
    }
  },
  // 结束会话 - 结束和患者的聊天
  clearClinicMessage({ commit, state, dispatch }, id) {
    state.vueSocket.clearClinicMessage(id);
  },
  // 重置消息
  resetMessage: ({ commit }) => {
    return new Promise((resolve, reject) => {
      try {
        commit('SET_SELECT_ID', null);
        commit('SET_CHAT_LIST', []);
        commit('SET_MESSAGE_LIST', []);
        resolve({ type: 'susses', message: '重置消息完成', result: true });
      } catch (e) {
        reject({ type: 'error', message: '重置消息失败，请检查代码！', result: false });
      }
    });
  },
  // 拉取历史聊天到本地 message-list
  asyncChatMessageHistory: ({ commit, state, rootState }, page) => {
    return new Promise((resolve, reject) => {
      const params = {
        pageNum: page.index,
        pageSize: page.size,
        clinicId: state.selectedId
      };
      getImMsg(params).then(res => {
        const { list, allRow, currentPage, totalPage } = res.result;
        if (Array.isArray(list)) {
          console.log(rootState);
          const messageList = list.map((e) => {
            let fileUrl = e.content;
            if (['1', '2', '3', '6'].includes(String(e.type))) {
              fileUrl = staticUri(e.content);
            }
            return {
              content: { ...e, type: e.type.toString(), fileUrl: fileUrl },
              signal: 'CONTACT',
              flow: rootState.user.info.userId === e.receiverId ? 'in' : 'out',
              isPeerRead: true, // 已读未读
              isRevoked: false // 撤回
            };
          });
          if (currentPage === 1) {
            commit('SET_MESSAGE_LIST', []);
            commit('LAST_MESSAGE_ID', null);
          } else {
            const lastMessageId = state.selectedMessageList.length > 0 ? state.selectedMessageList[0].content.messageId : null;
            commit('LAST_MESSAGE_ID', lastMessageId);
          }
          commit('SHIFT_MESSAGE_LIST', messageList);
          commit('SHIFT_MESSAGE_LIST_TOTAL', allRow);
          resolve({ list: messageList, total: allRow, totalPage });
        } else {
          reject({ list: [], total: 0, totalPage });
        }
      });
    });
  },
  // 接收 MP 拉取到本地 message-list
  pushMessageHistory: ({ commit, state, dispatch, rootState }, content) => {
    return new Promise((resolve, reject) => {
      const { list, allRow, currentPage } = content;
      if (list) {
        const messageList = list.map((e) => {
          let fileUrl = e.content;
          if (['1', '2', '3', '6'].includes(String(e.type))) {
            fileUrl = staticUri(e.content);
          }
          return {
            content: { ...e, type: e.type.toString(), fileUrl: fileUrl },
            signal: 'CONTACT',
            flow: rootState.user.info.userId === e.senderId ? 'out' : 'in',
            isPeerRead: true, // 已读未读
            isRevoked: false // 撤回
          };
        });
        if (currentPage === 1) {
          commit('SET_MESSAGE_LIST', []);
          commit('LAST_MESSAGE_ID', null);
        } else {
          const lastMessageId = state.selectedMessageList.length > 0 ? state.selectedMessageList[0].messageId : null;
          commit('LAST_MESSAGE_ID', lastMessageId);
        }
        commit('SHIFT_MESSAGE_LIST', messageList);
        commit('SHIFT_MESSAGE_LIST_TOTAL', allRow);
        resolve({ list: messageList, total: allRow });
      } else {
        reject({ list: [], total: 0 });
      }
    });
  },
  // 发送MP拉取到本地 message-list
  websocketChatMessageHistory: ({ commit, state, dispatch }, index) => {
    return new Promise((resolve) => {
      if (!state.selectedId) {
        resolve(false);
        return;
      }
      const contentValue = {
        page: index,
        clinicId: state.selectedId
      };
      if (index === 1) {
        commit('SET_MESSAGE_LIST', []);
      }
      commit('SEND_MESSAGE', { subSignal: 'mp', protoMessage: contentValue });
      resolve(true);
    });
  },
  // 获取签名
  getRtcSign({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      userRtcSign().then(res => {
        const { result } = res;
        commit('SET_EXTRAS', {
          ...payload,
          avatarUri: staticUri(state.extras.avatar),
          userId: result.userId, // 患者userId (当前用户的)
          sdkAppId: result.sdkAppId, // trtc appid
          signature: result.signature, // trtc 签名
          userList: state.currentConversation.userList //
        });
        console.log('=====================>2342343242342', JSON.stringify(state.extras));
        resolve(state.extras);
      }).catch(reject);
    });
  },
  // 开启视频
  async openTrtcVideo({ dispatch, commit, state }, payload) {
    try {
      await dispatch('clinicIdInfo', payload);
      //
      dispatch('errorLog/syncAddErrorLog', {
        clinicId: state.currentConversation.clinicId,
        title: '4.患者收到IM视频要求'
      }, { root: true });
      commit('SET_EXTRAS', { roomId: state.currentConversation.roomId, type: '7', chatType: 'video' });
      const info = await dispatch('doctorInfo', state.currentConversation.otherId); // otherId 是doctorId
      console.log('state.currentConversation', state.currentConversation);
      wsOpenVideoClient(
        {
          ...state,
          currentConversation: state.currentConversation,
          doctorInfo: info,
          clinicId: payload
        },
        state.consultationType !== '3'
      );
    } catch (e) {
      console.error(e);
    }
  },
  // 开启视频
  async openServiceWorkbenchTrtcVideo({ dispatch, commit, state }, payload) {
    try {
      const infoData = await dispatch('serviceWorkbenchInfo', payload);
      //
      dispatch('errorLog/syncAddErrorLog', {
        clinicId: infoData.clinicId,
        title: '4.患者收到IM视频要求'
      }, { root: true });
      commit('SET_EXTRAS', { roomId: infoData.roomId, type: '22', chatType: 'video' });
      const info = await dispatch('doctorInfo', infoData.doctorId); // otherId 是doctorId
      wsOpenVideoClient(
        {
          ...state,
          currentConversation: {
            clinicId: infoData.clinicId,
            doctorId: infoData.doctorId,
            patientId: infoData.patientId,
            state: 1
          },
          doctorInfo: info,
          clinicId: payload
        },
        state.consultationType !== '3'
      );
    } catch (e) {
      console.error(e);
    }
  },
  //
  async serviceWorkbenchInfo({ dispatch, commit, state }, payload) {
    try {
      const response = await reqPatientList();
      const info = response.result.find(e => e.orderGuid === payload);
      return { ...info, clinicId: payload, roomId: 100024 };
    } catch (e) {
      return Promise.reject(e);
    }
  },
  //
  async doctorInfo({ dispatch, commit, state }, payload) {
    try {
      const response = await doctorDetail({ doctorNo: payload, patientId: state.currentConversation.patientId })
      return response.result;
    } catch (e) {
      return Promise.reject(e);
    }
  },
  // 关闭视频
  closeTrtcVideo({ dispatch, state }, payload) {
    console.log(payload);
    dispatch('sendMessage', { subSignal: 'ms', protoMessage: payload });
  },
  //
  setConsultationType({ commit }, payload) {
    commit('SET_CONSULTATION_TYPE', payload);
  }
};
//
const store = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
export default store;
