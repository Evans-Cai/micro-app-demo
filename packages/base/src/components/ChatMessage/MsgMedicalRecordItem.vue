<template>
  <div class="MsgMedicalRecordItem">
    <div class="ixt-head">
      <div class="span">病历</div>
      <div class="ixt-doc">
        <van-button type="primary" size="small" round @click="checkDispose(extras)" plain>
          查看病历
        </van-button>
      </div>
    </div>
    <div class="ixt-content">
      <table class="table">
        <tr>
          <th class="title">主诉</th>
          <td>{{ extras.problem }}</td>
        </tr>
        <tr>
          <th class="title">诊断</th>
          <td>
            <div class="overflow-ellipsis_1" v-for="(item, index) in diagnosisList" :key="index">
              {{ item }}
            </div>
          </td>
        </tr>
        <tr v-show="drugList.length > 0">
          <th class="title">药品</th>
          <td>
            <div class="overflow-ellipsis_1" v-for="(item, index) in drugList" :key="index">
              {{ item }}
            </div>
          </td>
        </tr>
      </table>
      <div class="foot-box" v-show="!hasMobile">
        <router-link to="/web/dispensing/list">
          <van-button type="primary" size="small" round>前往购药</van-button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'MsgMedicalRecordItem',
    props: {
      extras: {
        type: Object,
        default: () => ({
          problem: '',
          diagnosis: ''
        })
      }
    },
    computed: {
      diagnosisList() {
        if (this.extras.diagnosisList && Array.isArray(this.extras.diagnosisList)) {
          return this.extras.diagnosisList
        }
        return []
      },
      drugList() {
        if (this.extras.drugList && Array.isArray(this.extras.drugList)) {
          return this.extras.drugList
        }
        return []
      },
      hasMobile() {
        return this.$route.path.indexOf('/mobile/') > -1
      }
    },
    methods: {
      //
      checkDispose(val) {
        const medicalRecordNo = val.id;
        console.log('22222', medicalRecordNo)
        this.$router.push({
          path: '/web/MedicalRecord/diagnosis',
          query: {
            id: medicalRecordNo
          }
        });
      }
    }
  }
</script>
<style scoped lang="scss">
  .MsgMedicalRecordItem {
    border: 1px solid var(--van-primary-color);
    border-radius: 8px;
    color: #333;
    max-width: 270px;
    overflow: hidden;
    .ixt-head {
      padding: 5px 10px;
      background-color: var(--van-primary-color);
      color: var(--van-white);;
      border-bottom: 1px solid rgba(255, 255, 255, 0.5);
      display: flex;
      align-items: center;
      justify-content: space-between;
      .span {
        font-weight: bold;
      }
      .ixt-doc {
        text-align: right;
        .btn {
          width: 8vw;
          display: inline-flex;
          margin: 0;
          text-align: center;
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          border-radius: 19px;
          background-color: #F0F0F0;
          border: 1px solid white;
          color: var(--van-primary-color);
          outline: none;
          transition: .2s all ease-in-out;
        }
      }
    }
    .ixt-content {
      padding: 5px 10px;
      background-color: var(--van-white);
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      .table {
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;
        .title {
          width: 40px;
          vertical-align: text-top;
        }
      }
      .tab-box {
        display: table;
        table-layout: fixed;
        margin: 0 0 10px 0;
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
      .foot-box {
        line-height: 1;
        vertical-align: middle;
        text-align: right;
      }
    }
  }
</style>
