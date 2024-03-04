<template>
  <div class="chat-cell" :class="{'self': item.flow ==='out'}">
    <van-image :size="36" :src="item.content.avatarUri" class="avatar" shape="square">
      <template v-slot:error>
        <img style="width: 100%;height: 100%" :src="defaultAvatarUri" alt="error"/>
      </template>
    </van-image>
    <div>
      <div class="name">{{ item.content.name || '--' }}</div>
      <div class="content">
        <slot/>
      </div>
    </div>
  </div>
</template>
<script>
  import { defaultAvatarUri } from '@/utils/config.js';

  export default {
    name: 'ChatCell',
    props: {
      direction: {
        type: String,
        default: ''
      },
      item: {
        type: [Object],
        default: () => {
        }
      }
    },
    data() {
      return {
        defaultAvatarUri: defaultAvatarUri
      }
    }
  }
</script>
<style lang="scss" scoped>
  .chat-cell {
    .name {
      font-size: 14px;
      padding: 5px 0;
      color: #666;
    }
    .avatar {
      height: 38px;
      width: 38px;
      float: left !important;
      margin: 0 10px 0 0;
    }
    .content {
      display: inline-block;
      position: relative;
      max-width: 61.8%;
      min-height: 36px;
      line-height: 24px;
      box-sizing: border-box;
      font-size: 14px;
      text-align: left;
      word-break: break-all;
      border-radius: 16px;
      &:before {
        content: " ";
        position: absolute;
        top: 5px;
        right: 100%;
        border: 6px solid transparent;
        border-right-color: var(--van-primary-color);
      }
    }
    &.self {
      text-align: right;
      .avatar {
        height: 38px;
        width: 38px;
        float: right !important;
        margin: 0 0 0 10px !important;
      }
      .content {
        &:before {
          right: -12px;
          vertical-align: middle;
          border-right-color: transparent;
          border-left-color: var(--van-primary-color);
          color: white;
        }
      }
    }
  }
</style>
