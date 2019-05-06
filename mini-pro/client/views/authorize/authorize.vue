<template>
  <div id="authorize">
    <!-- 这是授权页面
      <p><router-link to="/app">进入制作小程序页面</router-link></p> -->
    <editInformation v-if="editShow" @shutDown='shutDown'></editInformation>
    <review v-if="reviewShow" @reviewShutDown="reviewShutDown"></review>
    <openALI v-if="alipayShow" @openAlipay="openAlipay" ></openALI>
    <div class="boxTop">
      <div class="boxTopManage"></div>
      <button class="designBotton">
        <!-- <a class="pen" :href="'/app/'+miniappId">小程序设计</a> -->
        <router-link class="pen" :to="'/app'">小程序设计</router-link>
      </button>
    </div>
    <div class="bigBox">
      <authTop @reviewShutDown="reviewShutDown" @shutDown='shutDown' :authlist="authlist" v-if='authShow'></authTop>
     <authBottom @openAlipay="openAlipay" :authlist="authlist" v-if='authShow' ></authBottom>
    </div>
  </div>
</template>
<script>
import app from '../../fetch/api.js';
import editInformation from './popUP/editInformation';
import review from './popUP/review';
import openALI from './popUp/openALI';
import authTop from './authComponents/authTop';
import authBottom from './authComponents/authBottom';
import { mapState, mapMutations } from 'vuex';

export default {
  components: {
    authTop,
    authBottom,
    editInformation,
    review,
    openALI
  },
  data () {
    return {
      editShow: false,
      reviewShow: false,
      alipayShow: false,
      authShow: false,
      authlist: [],
      miniappId: null
    };
  },
  computed: {
    ...mapState({showstate: state => state})
  },
  created () {
    const self = this;
    this.miniappId = this.$route.params.id;
    this.showstate.miniappId = this.miniappId;
    app.getfetch('/info/index').then(res => {
      if (res.data.success) {
        const data = res.data.data;
        self.authlist = data;
        self.authShow = true;
      }
    }).catch(() => { self.$message.error('网络异常请稍后重试') })
    this.updateLoadingStatus({showloading: false, texts: ''})
  },
  methods: {
    ...mapMutations(['updateLoadingStatus']),
    openAlipay (openAlipay) {
      this.alipayShow = openAlipay;
    },
    shutDown (shutDown) {
      this.editShow = shutDown;
    },
    reviewShutDown (reviewShow) {
      this.reviewShow = reviewShow;
    }
  }
};
</script>
<style lang="less" scoped>
@sprites:'/client/assets/images/sprites.png';
.boxTop {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  font-family: '黑体';
  justify-content: space-between;
  .boxTopManage {
    width: 104px;
    height: 18px;
    margin-top: 27px;
    background: url(@sprites) no-repeat 0 0;
  }
  .designBotton {
    width: 140px;
    height: 40px;
    line-height: 40px;
    margin-top: 20px;
    margin-bottom: 30px;
    text-align: center;
    display: inline-block;
    background: #1890ff;
    border-radius: 4px;
    border: none;
    position: relative;
    .pen {
      width:100%;
      text-align: right;
      color: #fff;
      display: inline-block;height: 100%;
      background: url('/client/assets/images/pen.png') no-repeat 25px 13px;
    padding: 0px 25px;
    box-sizing: border-box;
    }
  }
}
.bigBox {
  width: 1200px;
  height: 1000px;
  border-width: 1px;
  margin: 0 auto;
  color: #606266;
}
</style>

