<template>
  <div class="MsgConsultationItem">
    <div class="ixt-head">
      <span class="left">
        {{ extras.sex }}&ensp;{{ extras.age }}
      </span>
      <span class="right">{{ extras.type }}</span>
    </div>
    <div class="ixt-content">
      <div class="tab-box">
        <span class="cell label-1">病情描述</span>
        <span class="cell">{{ extras.description }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MsgConsultationItem',
    props: {
      extras: {
        type: Object,
        default: () => ({
          problem: '',
          diagnosis: ''
        })
      }
    },
    methods: {}
  }
</script>
<style scoped lang="scss">
  .MsgConsultationItem {
    border: 1px solid var(--van-primary-color);
    border-radius: 8px;
    max-width: 270px;
    overflow: hidden;
    .ixt-head {
      padding: 5px 10px;
      color: #fff;
      background: var(--van-primary-color);
      border-bottom: 1px solid rgba(255, 255, 255, 0.5);
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-weight: bold;
      }
    }
    .ixt-content {
      padding: 5px 10px;
      background-color: var(--van-white);
      color: var(--van-gray-8);
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      .tab-box {
        display: table;
        table-layout: fixed;
        width: 100%;
        .btn {
          text-align: center;
          height: 30px;
          width: 120px;
          border-radius: 4px;
          background-color: transparent;
          border: 1px solid #E5E5E5;
          color: white;
        }
        .cell {
          display: table-cell;
          &.btn-cell {
            text-align: center;
          }
          &.label {
            width: 45px;
          }
          &.label-1 {
            width: 75px;
            font-weight: bold;
          }
        }
      }
    }
  }
</style>
