<template>
  <div class='mongolianLayer'>
    <div class="box">
      <div class="title clearfix">
        <span>打包支付宝小程序</span>
        <span class="shutDown" @click="shutDown"></span>
      </div>
      <div class="inputContent clearfix">
        <div class='contentLeft'>
          <div class="MB30">
            <span class="waring">*</span>
            <span>APPID(小程序ID)</span>
          </div>
          <div class="MB88">
            <span class="waring">*</span>
            <span>支付宝公钥</span>
          </div>
          <div class="MB68">
            <span class="waring">*</span>
            <span>应用密钥</span>
          </div>
           <div class="MB50">
            <span class="waring">*</span>
            <span>服务器配置</span>
          </div>
        </div>
        <div class="contentRight">
          <div class="MB30">
            <input type="text" />
          </div>
          <div class="MB30">
            <div contentEditable class="text"></div>
          </div>
          <div class="MB30">
            <div contentEditable class="text"></div>
          </div>
           <div class="MB50 domainName">
            小程序域名配置:&nbsp;&nbsp;(
              <span>kdfgkfd</span>)
          </div>
        </div>
        <div class="openAL">
          我还没注册支付宝小程序&nbsp;&nbsp;
          <a href="https://open.alipay.com/channel/miniIndex.htm">去注册>></a>
        </div>
        <div class="buttonBox">
          <button class="button save" @click="submit">打包</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import app from '../../../fetch/api.js';

export default {
  data () {
    return {
    }
  },
  mounted () {},
  methods: {
    shutDown () {
      const tool = false;
      this.$emit('openAlipay', tool);
    }
  }
}
</script>
<style lang="less" scoped>
@sprites: "/client/assets/images/sprites.png";
.mongolianLayer {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
  .box {
    width: 600px;
    height: 550px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .title {
    height: 40px;
    line-height: 40px;
    padding:0 15px;
    margin-bottom: 30px;
    span {
      font: 16px Microsoft YaHe;
    }
    .shutDown{
      margin-top:15px;
      float: right;
      width:14px;
      height:14px;
      cursor: pointer;
      background:url(@sprites) no-repeat -450px -104px;
      &:hover{
        background:url(@sprites) no-repeat -484px -104px;
      }
    }
    .close {
      cursor: pointer;
      float: right;
      width: 30px;
      height: 30px;
      font: normal lighter 26px Microsoft YaHe;
    }
  }
  .inputContent {
    .MB30 {
      margin-bottom: 30px;
    }
    .MB88 {
      margin-bottom: 88px;
    }
    .MB68 {
      margin-bottom: 68px;
    }
    .MB50 {
      margin-bottom: 50px;
    }
    .o0 {
      opacity: 0;
    }
    .contentLeft {
      display: inline-block;
      width: calc(~'100% - 410px');
      text-align: right;
      span {
        height: 30px;
        line-height: 30px;
      }
      .waring {
        font-size: 14px;
        color: #f23d3d;
        margin-right: 10px;
      }
    }
    .contentRight {
      .pr {
        position: relative;
      }
      width: 410px;
      float: right;
      padding-left: 30px;
      box-sizing: border-box;
      input {
        vertical-align: middle;
        height: 30px;
        line-height: 30px;
        width: 300px;
        border: 1px solid #dcdfe6;
        border-radius: 2px;
        background-color: #fff;
        box-sizing: border-box;
        padding-left: 10px;
      }
      .text{
        height: 80px;
        line-height: 21px;
        width: 300px;
        border: 1px solid #dcdfe6;
        border-radius: 2px;
        background-color: #fff;
        box-sizing: border-box;
        overflow: hidden;
      }
      .domainName{
        font-size:12px;
        color:#606266;
        span{
          color:#1890ff;
        }
      }
    }
    .openAL{
      text-align: center;
      color:#606266;
      a{
        color:#1890ff;
      }
    }
    .button {
      width: 80px;
      height: 30px;
      line-height: 30px;
      box-sizing: border-box;
      cursor: pointer;
    }
    .buttonBox {
      text-align: center;
      margin-top: 40px;
      button {
        border-radius: 2px;
        border: 1px solid #dcdfe6;
        background: #fff;
        color: #909399;
      }
      .save {
        border: 1px solid #1890ff;
        background: #1890ff;
        color: #fff;
      }
    }
  }
}
</style>
