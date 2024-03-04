<template>
  <!-- 右侧弹出 -->
  <van-popup v-model:show="showModel" position="right"
             :style="{ width: '40%', height: '100%' }"
             @open="onOpen" @close="onClose">
    <van-address-list class="van-address-list-custom"
                      v-model="chosenAddressId"
                      :list="list"
                      :disabled-list="disabledList"
                      disabled-text=""
                      default-tag-text="默认"
                      @add="onAdd"
                      @edit="onEdit"
                      @select="onSelect"
                      :right-icon="''"
                      :show-add-button="false"
    />
  </van-popup>
</template>
<script>
  import { showToast } from 'vant';

  export default {
    name: 'SelectAddress',
    emits: ['update:show', 'select'],
    props: {
      show: {
        type: Boolean,
        default: false
      },
      resourceId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        chosenAddressId: '',
        list: [],
        disabledList: [],
        showModel: false
      }
    },
    watch: {
      show(val) {
        console.debug(val);
        this.showModel = val;
        if (val) {
          this.initData();
        }
      }
    },
    methods: {
      async initData() {
        const list = await this.$store.dispatch('user/selectAddressList');
        console.log(list);
        this.list = list.map(e => ({
          props: e,
          id: e.resourceId,
          name: e.name,
          tel: e.mobile,
          address: e.area + ' ' + e.addRess,
          isDefault: e.isDefault !== 0
        }));
        this.$nextTick(() => {
          console.debug('resourceId', this.resourceId);
          this.chosenAddressId = this.resourceId;
        })
      },
      //
      onClose() {
        this.$emit('update:show', false);
      },
      onOpen() {
        this.$emit('update:show', true);
      },
      onAdd() {
        showToast('新增地址');
      },
      onEdit(item, index) {
        showToast('编辑地址:' + index);
      },
      onSelect(item, index) {
        console.log('选择地址', item, index);
        this.$emit('select', item, index);
      }
    }
  }
</script>
<style scoped lang="scss">
  .van-address-list-custom {
    background-color: #20304b;
    height: auto;
    min-height: 100%;
    ::v-deep(.van-address-item) {
      background-color: #31466b;
      .van-cell {
        background: #31466b;
        color: #fff !important;
        .van-radio__label {
          color: #fff !important;
        }
        .van-address-item__address {
          color: #fff !important;
        }
      }
    }
  }
</style>
