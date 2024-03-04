<template>
  <var-pull-refresh v-model="refreshing" @refresh="onRefresh" class="message-wrapper" ref="messageWrapper">
    <var-list v-model:loading="loading" :offset="500" :finished="finished" :finished-text="finishedText"
              @load="onLoadMore">
      <!--内容...-->
      <ul class="message-box">
        <li :key="index" class="message-item" v-for="(item, index) in messageList"
            :id="'meg_' + item.content.messageId">
          <div class="time">
            <span v-show="isShowTime(index)">{{ item.formatTime }}</span>
          </div>
          <!--0-->
          <chat-cell :class="{ self: item.flow ==='out' }"
                     v-if="['0'].includes(item.content.type)" class="main" :item="item">
            <div class="file-text" v-if="['0'].includes(item.content.type)">
              <span v-text="item.content.content"></span>
            </div>
          </chat-cell>
          <!--1-->
          <chat-cell :class="{ self: item.flow ==='out' }" class="main"
                     v-else-if="['1'].includes(item.content.type)" :item="item">
            <!-- 1 代表图片-->
            <div class="file-image">
              <var-image class="img-box" :src="item.content.fileUrl">
                <template v-slot:error>
                  <img style="height: 100%;width: 100%" :src="defaultDoctorUri" alt=""/>
                </template>
              </var-image>
            </div>
          </chat-cell>
          <!--2-->
          <chat-cell :class="{ self: item.flow ==='out' }" class="main"
                     v-else-if="['2'].includes(item.content.type)" :item="item">
            <!-- 2 代表音频 -->
            <div class="file-av">
              <audio style="display: none" controls="controls" :src="item.content.fileUrl"></audio>
              <div @click="playAudio(item.content.fileUrl)" class="file-av-audio">
                <span>点击播放音频</span>
                <svg-icon class="audio-svg" type="mdi" :path="mdilVolumeHigh"></svg-icon>
              </div>
            </div>
          </chat-cell>
          <!--3-->
          <chat-cell :class="{ self: item.flow ==='out' }" class="main"
                     v-else-if="['3'].includes(item.content.type)" :item="item">
            <!-- 3 代表视频 -->
            <div class="file-av file-av-video-box" @click="playVideo(item.content)">
              <video :ref="item.content.messageId" :src="item.content.fileUrl" style="height: 100%; width: 100%;"/>
            </div>
          </chat-cell>
          <!--4-->
          <chat-cell :class="{ self: item.flow ==='out' }" class="main"
                     v-else-if="['4'].includes(item.content.type)" :item="item">
            <!-- 4 代表（图文|视频）问诊-->
            <msg-consultation-item :extras="analysisExtras(item.content.extras)"/>
          </chat-cell>
          <!--5-->
          <chat-cell :class="{ self: item.flow ==='out' }" class="main"
                     v-else-if="['5'].includes(item.content.type)" :item="item">
            <!-- 5 代表病历 -->
            <msg-medical-record-item :extras="analysisExtras(item.content.extras)"/>
          </chat-cell>
          <!--'7', '8', '9'-->
          <div :class="{ self: item.flow ==='out' }" class="main"
               v-else-if="['7', '8', '9', '10', '11'].includes(item.content.type)">
            <div class="time">{{ `${item.content.content}` }}</div>
          </div>
          <!--15-->
          <div :class="{ self: item.flow ==='out' }" class="main"
               v-else-if="['15'].includes(item.content.type) && !['0', 0].includes(item.content.content)">
            <div class="time">{{ `当前有${item.content.content}人正在视频` }}</div>
          </div>
          <!--不知道的答案-->
          <div :class="{ self: item.flow ==='out' }" class="main" v-else>
            <div class="time">{{ `${item.content.content}` }}</div>
          </div>
        </li>
        <!--  -->
        <template v-if="showEvaluation">
          <li v-show="!clinicState">
            <!--问诊评价-->
            <div class="message-evaluation">
              <div class="info">问诊已结束，对服务满意请给医生五星评价哦</div>
              <div class="state">
                <span @click="toCommentEdit" v-if="interrogationEvaluationStatus" class="comment-btn no">去评论
                </span>
                <span v-else class="comment-btn yes">已评论</span>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </var-list>
  </var-pull-refresh>
</template>
<script>
  import { showToast } from 'vant';
  import { mapGetters } from 'vuex';
  // import BenzAMRRecorder from 'benz-amr-recorder';
  import { defaultAvatarUri, defaultDoctorUri } from '@/utils/config.js';
  //
  import ChatCell from './ChatCell.vue';
  import MsgMedicalRecordItem from './MsgMedicalRecordItem.vue';
  import MsgConsultationItem from './MsgConsultationItem.vue';
  //
  import { mdilVolumeHigh } from '@mdi/light-js';

  export default {
    name: 'ChatMessage',
    components: {
      MsgConsultationItem,
      MsgMedicalRecordItem,
      ChatCell
    },
    props: {
      showEvaluation: {
        type: Boolean,
        default: false
      },
      finishedText: {
        type: String,
        default: ' '
      },
      rateStatus: {
        type: String,
        default: '0'
      }
    },
    data() {
      return {
        mdilVolumeHigh: mdilVolumeHigh,
        defaultDoctorUri: defaultDoctorUri,
        loading: false,
        finished: true,
        refreshing: false,
        page: {
          index: 1,
          size: 20,
          total: 0
        },
        data: [],
        defaultAvatarUri: defaultAvatarUri,
        table: 'chat_message'
      };
    },
    computed: {
      //
      ...mapGetters({
        info: 'user/info',
        currentConversation: 'websocket/currentConversation',
        //
        selectedMessageList: 'websocket/selectedMessageList',
        messageListTotal: 'websocket/messageListTotal',
        selectedMessageLen: 'websocket/selectedMessageLen',
        selectedId: 'websocket/selectedId',
        lastMessageId: 'websocket/lastMessageId'
      }),
      //
      messageList() {
        return this.selectedMessageList.map(item => {
          return {
            ...item,
            formatTime: this.$moment(item.content.createTime).format('YYYY-MM-DD HH:mm')
          };
        })
      },
      //
      clinicState() {
        return ['1', '0', 1, 0].includes(this.currentConversation.state)
      },
      // 是否评价过
      interrogationEvaluationStatus() {
        // 0 未评价 1 已评价
        return ['0', 0].includes(this.rateStatus);
      }
    },
    watch: {
      selectedMessageList(val, old) {
        console.log(val, this.$refs['messageWrapper']);
        if (this.lastMessageId) {
          console.log(val);
        } else {
          console.log(val, this.$refs['messageWrapper']);
          this.$nextTick(() => {
            this.$refs['messageWrapper'].$el.scrollTo({
              top: 99999999,
              behavior: 'smooth'
            })
          })
        }
      }
    },
    methods: {
      // 编辑评价
      toCommentEdit() {
        this.$router.push({
          path: '/mobile/appraise/commentEdit',
          query: {
            patientId: this.currentConversation.patientId,
            doctorId: this.currentConversation.otherId,
            clinicId: this.currentConversation.clinicId
          }
        });
      },
      //
      onLoadMore() {
      },
      //
      async onRefresh() {
        console.debug('加载聊天信息');
        if (this.selectedMessageList.length >= this.messageListTotal) {
          showToast({ type: 'text', message: '没有更多历史消息了', duration: 2000 });
          this.refreshing = false;
          return
        }
        this.$emit('refresh');
        this.page.index += 1;
        const { total } = await this.$store.dispatch('websocket/asyncChatMessageHistory', this.page);
        this.page.total = total;
        console.log(total);
        setTimeout(_ => {
          this.refreshing = false;
        }, 300);
      },
      //
      async playAudio(url) {
        console.log(url);
        if (url.indexOf('.mp3') > -1) {
          const au = new Audio(url);
          au.play().then(e => {
            showToast({ type: 'text', message: '正在播放', duration: 1000 });
            console.warn('播放成功');
          }).catch(e => {
            console.error(e);
          });
          // return;
        }
        // const amr = new BenzAMRRecorder();
        // amr.initWithUrl(url).then(() => {
        //   showToast({ type: 'text', message: '正在播放', duration: 2000 });
        //   console.warn('播放成功');
        //   amr.play();
        // });
        // amr.onEnded(() => {
        //   console.warn('播放完毕');
        // });
      },
      //
      playVideo(item) {
        console.log(item, this.$refs[item.messageId]);
        console.log(item.content);
        this.$refs[item.messageId][0].play().then(e => {
          console.log(e)
        })
      },
      //
      analysisExtras(val) {
        if (val && val.indexOf('{') > -1) {
          return JSON.parse(val);
        }
        return val;
      },
      //
      isShowTime(index) {
        if (index > 0) {
          const newTime = this.$moment(this.selectedMessageList[index].content.createTime).format('YYYY-MM-DD HH:mm');
          const oldTime = this.$moment(this.selectedMessageList[index - 1].content.createTime).format('YYYY-MM-DD HH:mm');
          return newTime !== oldTime;
        }
        return true;
      }
    }
  };
</script>
<style lang="scss" scoped>
  .message-wrapper {
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    .var-list__finished-text {
      display: none;
    }
    .message-box {
      width: 100%;
      height: auto;
      padding: 1px 0;
      position: relative;
    }
    .message-item {
      padding: 0 13px;
      margin: 15px 0;
      list-style: none;
      &.load {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 36px;
        padding: 10px 0;
        text-align: center;
        margin: 0;
        &.loading {
          background-color: #fff;
        }
        .more {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: #909399;
          i {
            font-size: 18px;
            color: #C0C4CC;
            margin-right: 10px;
          }
        }
      }
    }
    .message {
      margin-bottom: 15px;
    }
    .time {
      width: 100%;
      font-size: 12px;
      margin: 10px auto;
      text-align: center;
      color: #666;
      span {
        display: inline-block;
        padding: 4px 6px;
        color: #fff;
        border-radius: 8px;
        background-color: #999;
      }
    }
    .main {
      &.center {
        text-align: center;
      }
      .avatar {
        float: left;
        margin-right: 10px;
        border-radius: 8px;
        border: 1px solid #C0C4CC;
        background-color: #C0C4CC;
        object-fit: cover;
      }
      .file-text, .file-image, .file-av {
        background-color: #fff;
        color: var(--van-primary-color);
        border-radius: 8px;
        border: 1px solid var(--van-primary-color);
      }
      //
      .file-text {
        padding: 6px 10px;
        text-align: justify;
      }
      .file-image {
        .img-box {
          max-width: 100%;
          height: 150px;
          border-radius: 8px;
          display: inherit;
          .image-slot {
            width: 200px;
            height: 150px;
            border-radius: 8px;
            border: 1px solid var(--van-primary-color);
          }
        }
      }
      .file-av {
        .file-av-audio {
          padding: 6px 10px;
          cursor: pointer;
          .audio-svg {
            margin-left: 5px;
            font-size: 14px;
          }
        }
      }
      .file-av-video-box {
        position: relative;
        height: 150px;
        .file-av-video {
          height: 100%;
          width: 100%;
          &.pos {
            cursor: pointer;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            display: flex;
            background: rgba(0, 0, 0, 0.5);
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            .icon-ai {
              font-size: 40px;
              color: white;
            }
          }
        }
      }
      //
      &.self {
        text-align: right;
        .avatar {
          float: right;
          margin: 0 0 0 10px;
        }
        .content {
          &:before {
            right: -12px;
            vertical-align: middle;
            border-right-color: transparent;
            border-left-color: var(--van-primary-color);
            color: white;
          }
          .file-text, .file-image, .file-av {
            background-color: var(--van-primary-color);
            color: #fff;
            border-radius: 8px;
            border: 1px solid var(--van-primary-color);
          }
        }
      }
    }
  }
  .message-evaluation {
    margin: 20px 30px;
    padding: 10px;
    background-color: #FFFFFF;
    border: 1px solid var(--van-primary-color);
    border-radius: 8px;
    font-size: 16px;
    .info {
      text-align: justify;
      color: #333333;
      font-size: 16px;
      margin-bottom: 20px;
    }
    .state {
      text-align: right;
      color: var(--van-primary-color);
      .no {
        text-decoration: underline;
      }
    }
  }
</style>
