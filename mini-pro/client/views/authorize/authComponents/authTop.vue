<template>
  <div class='box' v-cloak>
    <div v-if="topShow==1">
      <div class="boxHead">
        <span class="intoIcon"></span>
        <span>绑定微信小程序</span>
      </div>
      <div class="boxBody">
        <div class="boxBodyLeft">
          <div class="boxBodyHave">
            <span class="boxBodyHaveInTo">已有小程序账号</span>
          </div>
          <ul class="boxBodyHaveAuto">
            <li class="haveAuto">
              <span class="haveAutoColor">一键授权</span>小程序管理权限</li>
            <li class="haveAuto">
              <span class="haveAutoColor">授权后</span>可提交审核、发布小程序</li>
            <li class="haveAuto">完美对接微信平台、
              <span class="haveAutoColor">快速更新</span>小程序内容</li>
          </ul>
          <div class="boxBodyHaveButton">
            <a :href="goAuthorUrl" class="buttonGo">去授权</a>
            <router-link class="buttonNo" :to="'/app' ">暂不授权</router-link>
          </div>
        </div>
        <div class="boxBodyMiddle"></div>
        <div class="boxBodyMiddleWire">
          <div class="boxBodyRight">
            <div class="boxBodyRightNoHave">
              <span class="boxBodyNoHave">未有小程序账号</span>
            </div>
            <ul class="rightNoHaveWrite">
              <li>手动下载并上传小程序代码</li>
              <li>自动登录微信后台提交审核与发布</li>
              <li>每次修改需要手动更新</li>
            </ul>
            <div class="boxBodyRightCircle"></div>
            <a href="https://mp.weixin.qq.com/" target="_blank" class="goToBook">去注册</a>
          </div>
        </div>
      </div>
    </div>
    <div v-if='topShow==2' v-cloak>
      <div class="boxBodyShang">
        <div class="boxBodyLeftUp">
          <div class="leftUpTop">
            <span class="leftUpTopIcon"></span>
            <span class="leftUpTopwenZi">绑定信息</span>
          </div>
          <div class="leftUpBody">
            <ul class="leftUpBodyWrite">
              <li>
                <span class="writeOverstriking">授权方APPID：</span>{{auth.appid}}</li>
              <li>
                <span class="writeOverstriking">小程序名称：</span>{{auth.nick_name}}</li>
              <li>
                <span class="writeOverstriking">认证情况：</span>{{auth.verify_type_info}}</li>
            </ul>
          </div>
          <button class="checkDetail" @click="editShow">编辑信息</button>
        </div>
        <div class="boxBodyRightUp">
          <div class="rightUpTop">
            <span class="rightUpTopIcon"></span>
            <span class="rightUpTopwenZi">审核&发布</span>
          </div>
          <div class="rightUpBody">
            <ul class="rightUpBodyWrite">
              <li>
                <span class="writeOverstriking">最新的审核ID：</span>
                <span>{{audit.lastId}}</span>
              </li>
              <li>
                <span class="writeOverstriking">审核状态：</span>
                <span>{{audit.message}}</span>
              </li>
            </ul>
            <div v-if="audit.message!=='审核中'">
              <!-- <button class="bottonVerify" @click="check">审核</button> -->
              <button class="bottonPublic" @click="release">发布</button>
            </div>
            <div v-else>
              <div class="prompt">
                正在审核中...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import app from '../../../fetch/api.js';
import $ from 'jquery';
import { mapState } from 'vuex';

export default {
  props: ['authlist'],
  data () {
    return {
      goAuthorUrl: 'javascript:void(0)',
      auth: {},
      audit: {},
      topShow: 0,
      text: ''
    }
  },
  computed: {
    ...mapState({showstate: state => state})
  },
  mounted () {
    this.auth = this.authlist.auth;
    this.audit = this.authlist.audit;
    if (Object.keys(this.auth).length > 0) {
      this.topShow = 2;
    } else {
      this.topShow = 1;
    }
    this.goAuthor();
  },
  methods: {
    goAuthor () {
      app.getfetch('/open/goAuthor').then(res => {
        this.goAuthorUrl = res.data;
      })
    },
    release () {
      $.ajax({
        url: app.BaseUrl + `/open/submitAudit1?miniappId=${this.showstate.miniappId}`,
        type: 'GET',
        dataType: 'json',
        xhrFields: {
          withCredentials: true
        },
        success: res => {
          if (res.success) {
            this.$message({
              message: '发布成功',
              type: 'success'
            });
            window.location.reload();
          } else {
            this.$message.error('发布失败');
          }
        }
      })
    },
    // check () {
    //   const tool = true;
    //   this.$emit('reviewShutDown', tool);
    // },
    editShow () {
      const tool = true;
      this.$emit('shutDown', tool);
    }
  }
}
</script>

<style lang="less" scoped>
@sprites: "/client/assets/images/sprites.png";
.box {
  .boxHead {
    height: 50px;
    line-height: 50px;
    padding-left: 30px;
    border: 1px solid #909399;
    border-bottom: none;
    .intoIcon {
      width: 22px;
      height: 22px;
      display: inline-block;
      background:url(@sprites) no-repeat -99px -271px;
      margin-bottom: -4px;
    }
    .intoMiProgram {
      color: #000;
    }
  }
  .boxBody {
    height: 310px;
    border: 1px solid #909399;
    font-size: 14px;
    position: relative;
    .boxBodyLeft {
      .boxBodyHave {
        width: 190px;
        height: 42px;
        line-height: 29px;
        margin: 40px 0 0 206px;
        background:url(@sprites) no-repeat -292px -257px;
        .boxBodyHaveInTo {
          color: #fff;
          margin-left: 43px;
        }
      }
      .boxBodyHaveAuto {
        margin: 40px 0 0 80px;
        list-style-type: disc;
        line-height: 20px;
        .haveAuto {
          line-height: 30px;
          .haveAutoDot {
            color: #909399;
            padding-top: 50px;
            margin-right: 10px;
          }
          .haveAutoColor {
            color: #1890ff;
          }
        }
      }
      .boxBodyHaveButton {
        margin-left: 206px;
        margin-top: 40px;
        .buttonGo,
        .buttonNo {
          text-align: center;
          background: #1890ff;
          display: inline-block;
          border: 1px solid #1890ff;
          width: 80px;
          height: 30px;
          line-height: 30px;
          color: #fff;
          border-radius: 3px;
          cursor: pointer;
        }
        .buttonNo {
          background: #fff;
          border: 1px solid #909399;
          color: #606066;
          margin-left: 20px;
          cursor: pointer;
        }
      }
    }
    .boxBodyMiddle {
      width: 144px;
      height: 50px;
      background: #909399;
      background: url(/client/assets/images/sprites.png) no-repeat -705px -257px;
      position: absolute;
      top: 148px;
      left: 382px;
    }
  }
  .boxBodyMiddleWire {
    width: 1px;
    height: 220px;
    background: #dcdfe6;
    position: absolute;
    top: 40px;
    left: 597px;
    .boxBodyRight {
      width: 502px;
      height: 203px;
      position: absolute;
      left: 80px;
      top: 0px;
      .boxBodyRightNoHave {
        width: 190px;
        height: 42px;
        line-height: 29px;
        margin-top: 0;
        margin-left: 93px;
        background:url(@sprites) no-repeat -500px -257px;
        .boxBodyNoHave {
          color: #fff;
          margin-left: 43px;
        }
      }
      .rightNoHaveWrite {
        list-style-type: disc;
        margin-top: 40px;
        margin-left: 12px;
        li {
          line-height: 30px;
          font-size: 14px;
          color: #606266;
        }
      }
      .boxBodyRightCircle {
        width: 125px;
        height: 120px;
        position: absolute;
        top: 60px;
        right: 105px;
        background:url(@sprites) no-repeat -527px -352px;
      }
      .goToBook {
        width: 80px;
        height: 30px;
        line-height: 30px;
        margin-left: 152px;
        margin-top: 39px;
        border: none;
        display: inline-block;
        color: #fff;
        text-align: center;
        background: #1890ff;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
  .boxBodyShang {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .boxBodyLeftUp {
      width: 590px;
      height: 360px;
      border: 1px solid rgb(220, 223, 230);
      position: relative;
      .leftUpTop {
        height: 50px;
        border-bottom: 1px solid rgb(220, 223, 230);
        .leftUpTopIcon {
          width: 21px;
          height: 23px;
          display: inline-block;
          background:url(@sprites) no-repeat -212px -270px;
          margin-right: 15px;
          margin-left: 18px;
          margin-bottom: -4px;
        }
        .leftUpTopwenZi {
          line-height: 50px;
        }
      }
      .leftUpBody {
        padding-left: 25px;
        .leftUpBodyWrite {
          margin-left: 15px;
          list-style-type: disc;
          margin-top: 35px;
          line-height: 44px;
          .writeOverstriking {
            font-weight: 900;
          }
        }
      }
      .checkDetail {
        width: 100px;
        height: 30px;
        border: none;
        background: #1890ff;
        border-radius: 4px;
        color: #fff;
        text-align: center;
        position: absolute;
        left: 246px;
        top: 292px;
        cursor: pointer;
      }
    }
    .boxBodyRightUp {
      width: 590px;
      height: 360px;
      border: 1px solid rgb(220, 223, 230);
      position: relative;
      .rightUpTop {
        height: 50px;
        border-bottom: 1px solid rgb(220, 223, 230);
        .rightUpTopIcon {
          width: 20px;
          height: 20px;
          display: inline-block;
          background:url(@sprites) no-repeat -250px -272px;
          margin-right: 15px;
          margin-left: 18px;
          margin-bottom: -4px;
        }
        .rightUpTopwenZi {
          line-height: 50px;
        }
      }
      .rightUpBody {
        padding: 35px 0 0 40px;
        line-height: 44px;

        .rightUpBodyWrite {
          list-style-type: disc;
          .writeOverstriking {
            font-weight: 900;
          }
        }
        .bottonVerify,
        .bottonPublic {
          width: 80px;
          height: 30px;
          display: inline-block;
          border: none;
          border-radius: 4px;
          color: #fff;
          background: #1890ff;
          position: absolute;
          left: 205px;
          top: 290px;
        }
        .bottonPublic {
          color: #606066;
          background: none;
          border: 1px solid rgb(220, 223, 230);
          left: 302px;
          top: 290px;
        }
      }
    }
    .prompt {
      width: 100%;
      text-align: center;
      margin-top: 30px;
    }
  }
}
</style>
