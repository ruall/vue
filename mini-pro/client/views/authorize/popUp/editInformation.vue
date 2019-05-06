<template>
  <div class='mongolianLayer'>
    <div class="box">
      <div class="title clearfix">
        <span>微信小程序</span>
        <span class="shutDown" @click="shutDown"></span>
      </div>
      <div class="inputContent clearfix">
        <div class='contentLeft'>
          <div class="name MB30">
            <span class="waring">*</span>
            <span>小程序</span>
          </div>
          <div class="domainName MB30">
            <span>域名</span>
          </div>
          <div class="APPID MB30">
            <span class="waring">*</span>
            <span>微信小程序唯一标识(APPId)</span>
          </div>
          <div class="APPPassword MB30">
            <span class="waring">*</span>
            <span>微信小程序密钥</span>
          </div>
          <div class="payName MB30">
            <span>微信支付商户号</span>
          </div>
          <div class="payPassword MB30">
            <span>微信商户支付密钥</span>
          </div>
          <div class="name MB30">
            <span>微信商户证书</span>
          </div>
        </div>
        <div class="contentRight">
          <form id="uploads" enctype="multipart/form-data">
            <div class="MB30">
              <input type="text" readonly="readonly" placeholder="小程序名称" v-model="authList.name" />
            </div>
            <div class="MB30 pr">
              <input type="text" readonly="readonly" id="domainName" v-model="authList.url" />
              <span class="copy" @click="copy">复制</span>
            </div>
            <div class="MB30">
              <input type="text" readonly="readonly" v-model="authList.appId" />
            </div>
            <div class="MB30">
              <input type="text" name="appSecret" v-model="authList.appSecret" />
            </div>
            <div class="MB30">
              <input type="text" name="partner" v-model="authList.partner" />
            </div>
            <div class="MB30">
              <input type="text" name="partnerKey" v-model="authList.partnerKey" />
            </div>
            <div>
              <input type="file" id="upFile" class="o0" @change="upload" name="certFile" />
              <button type="button" class="file button">选择文件</button>
              <span class="fileText" v-if='authList.certPath'>{{authList.certPath}}</span>
              <span class="fileText" v-else>{{text}}</span>
            </div>
          </form>
        </div>
        <div class="buttonBox">
          <button class="button" @click="shutDown">取消</button>
          <button class="button save" @click="save">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import app from '../../../fetch/api.js';
import $ from 'jquery';

export default {
  data () {
    return {
      authList: [],
      text: '未选择任何文件'
    }
  },
  mounted () {
    this.getInfo();
  },
  methods: {
    save () {
      const data = $('#uploads').serialize();
      $.ajax({
        url: app.BaseUrl + '/info/updateInfo',
        type: 'POST',
        data: data,
        xhrFields: {
          withCredentials: true
        },
        datatype: 'json',
        success: (res) => {
          console.log(res);
        }
      })
    },
    upload () {
      let fileDom = document.getElementById('upFile');
      if (fileDom.value.indexOf('.p12') <= -1) {
        this.$message.error('请选择p12文件');
        return;
      }
      let file = fileDom.files[0];
      this.authList.certPath = file.name;
    },
    getInfo () {
      app.getfetch('/info/getInfo').then(res => {
        const re = res.data;
        const data = re.data;
        this.authList = data;
      }).catch(() => {
        this.$message.error('网络异常请稍后重试');
      })
    },
    shutDown () {
      const tool = false;
      this.$emit('shutDown', tool);
    },
    copy () {
      const domainName = document.getElementById('domainName');
      domainName.select();// 选择对象
      document.execCommand('Copy'); // 执行浏览器复制命令
      this.$alert('已复制好，可贴粘。')
    }
  }
}
</script>
<style lang="less" scoped>
@sprites: "/client/assets/images/sprites.png";
#domainName {
  padding-right: 30px;
  overflow: hidden; /*超出的部分隐藏起来。*/
  white-space: nowrap; /*不显示的地方用省略号...代替*/
  text-overflow: ellipsis; /* 支持 IE */
}
.mongolianLayer {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
  .box {
    width: 600px;
    height: 580px;
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
    .shutDown {
      margin-top:15px;
      float: right;
      width: 14px;
      height: 14px;
      cursor: pointer;
      background: url(@sprites) no-repeat -450px -104px;
      &:hover {
        background: url(@sprites) no-repeat -484px -104px;
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
    .o0 {
      opacity: 0;
    }
    .contentLeft {
      display: inline-block;
      width: calc(~'50% - 15px');
      text-align: right;
      margin-right: 15px;
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
      width: calc(~'50% - 15px');
      float: right;
      margin-left: 15px;
      input {
        vertical-align: middle;
        height: 30px;
        line-height: 30px;
        width: 240px;
        border: 1px solid #dcdfe6;
        border-radius: 2px;
        background-color: #fff;
        box-sizing: border-box;
        padding-left: 10px;
      }
      input[type='file'] {
        width: 80px;
        position: absolute;
      }
      .copy {
        position: absolute;
        right: 56px;
        top: 4px;
        color: #1890ff;
        cursor: pointer;
      }
      .file {
        color: #909399;
        background: -webkit-linear-gradient(
          #fff,
          #e6e9f0
        ); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(#fff, #e6e9f0); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(#fff, #e6e9f0);
        /* Firefox 3.6 - 15 */
        background: linear-gradient(#fff, #e6e9f0); /* 标准的语法 */
        border: 1px solid #dcdfe6;
        box-shadow: 0 0 2px 0 #ccc;
      }
      .fileText {
        width: 50px;
        font-size: 12px;
        color: #909399;
        margin-left: 10px;
      }
    }
    .button {
      margin-top: 10px;
      width: 80px;
      height: 30px;
      line-height: 30px;
      box-sizing: border-box;
      cursor: pointer;
    }
    .buttonBox {
      text-align: center;
      margin-top: 10px;
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
