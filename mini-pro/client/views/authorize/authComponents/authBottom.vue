<template>
  <div class='box' v-cloak>
     <div class="foot clearfix" v-if="bottomShow==1">
        <div class="footRight fl">
          <div class="footRightHead">
            <span class="footRightHeadIcon"></span>
            <span class="footRightHeadUser">绑定体验者</span>
          </div>
          <div class="footRightBody">
            <div class="photo"></div>
            <div class="auth">请先授权小程序</div>
          </div>
        </div>
        <div class="footLeft fr">
          <div class="footLeftHead">
            <span class="footLeftHeadIcon"></span>
            <span class="footLeftHeadUser">支付宝小程序</span>
          </div>
          <div class="footLeftBody clearfix">
            <ul class="footLeftBodyLeft fl">
              <li>公测期间只对企业开放，请注册企业账号</li>
              <li>登录管理中心，创建小程序并填写基础信息</li>
              <li>下载开发者工具、查阅文档根据规范进行开发</li>
              <li>提交版本进行审核，审核通过后即可上架</li>
            </ul>
            <div class="footLeftBodyRight fl"></div>
            <div class="footLeftBodybutton">
              <button class="openAlipay" @click="openAlipay">打开支付宝小程序</button>
              <a href='https://open.alipay.com/channel/miniIndex.htm' target="_blank" class="goToAlipay">去注册</a>
            </div>
          </div>
        </div>
      </div>
       <div class="boxBody" v-if="bottomShow==2">
        <!-- 每个框是一块 -->
        <div class="boxBodyXia">
          <div class="boxBodyLeftDown">
            <div class="rightDownTop">
              <span class="rightDownTopIcon"></span>
              <span class="rightDownTopwenZi">绑定体验者</span>
            </div>
            <div class="bingingExperience">
              <ul class="weChatUl">
                <li class="weChatLi">微信号:
                  <input placeholder="请输入微信号 " v-model='wechatid' />
                </li>
              </ul>
              <button class="bingBotton" @click="binding" type="button">绑定</button>
              <button class="untieButton" @click="unbind" type="button">解绑</button>
            </div>
          </div>
          <div class="boxBodyRightDown">
            <div class="leftDownTop">
              <span class="leftDownTopIcon"></span>
              <span class="leftDownTopwenZi">支付宝小程序</span>
            </div>
            <div class="alipay">
              <ul class="alipayweiZi">
                <li>公测期间只对企业开放，请注册企业账号</li>
                <li>登录管理中心，创建小程序并填写基础信息</li>
                <li>下载开发者工具、查阅文档根据规范进行开发</li>
                <li>提交版本进行审核，审核通过后即可上架</li>
              </ul>
              <div class="background"></div>
              <button class="openAlipay" @click="alipayShow=true">打开支付宝小程序</button>
              <a href='https://open.alipay.com/channel/miniIndex.htm' target="_blank" class="goToRegister">去注册</a>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import app from '../../../fetch/api.js';

export default {
  props: ['authlist'],
  data () {
    return {
      bottomShow: 0
    }
  },
  mounted () {
    const auth = this.authlist.auth;
    if (Object.keys(auth).length > 0) {
      this.bottomShow = 2;
    } else {
      this.bottomShow = 1;
    }
  },
  methods: {
    binding () {
      const self = this;
      app.getfetch(`/open/unbindTester?wechatid=${self.wechatid}`).then(res => {
        console.log(res.data);
      }).catch(() => {
        self.$message.error('网络异常请稍后重试');
      })
    },
    unbind () {
      const self = this;
      app.getfetch(`/open/bindTester?wechatid=${self.wechatid}`).then(res => {
        console.log(res.data);
      }).catch(() => {
        self.$message.error('网络异常请稍后重试');
      })
    },
    openAlipay () {
      const tool = true;
      this.$emit('openAlipay', tool);
    }
  }
}
</script>

<style lang="less" scoped>
@sprites:'/client/assets/images/sprites.png';
.box {
 .foot {
    .footRight {
      width: 590px;
      height: 360px;
      border: 1px solid #909399;
      border-top: none;
      .footRightHead {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #909399;
        padding-left: 30px;
        .footRightHeadIcon {
          width: 22px;
          height: 22px;
          display: inline-block;
          background:url(@sprites) no-repeat -140px -270px;
          margin-bottom: -3px;
        }
        .footRightHeadUser {
          color: #303133;
        }
      }
      .footRightBody {
        .photo {
          width: 142px;
          height: 152px;
          margin: 50px 0 0 224px;
          background:url(@sprites) no-repeat 1px -335px;
        }
        .auth {
          margin-top: 20px;
          text-align: center;
        }
      }
    }
    .footLeft {
      width: 590px;
      height: 360px;
      border: 1px solid #909399;
      border-top: none;
      .footLeftHead {
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #909399;
        padding-left: 30px;
        .footLeftHeadIcon {
          width: 22px;
          height: 22px;
          display: inline-block;
          background:url(@sprites) no-repeat -175px -270px;
          margin-bottom: -3px;
        }
        .footLeftHeadUser {
          color: #303133;
        }
      }
      .footLeftBody {
        height: 590px;
        position: relative;
        .footLeftBodyLeft {
          list-style-type: disc;
          margin-left: 65px;
          margin-top: 50px;
          line-height: 30px;
        }
        .footLeftBodyRight {
          width: 136px;
          height: 115px;
          margin-top: 50px;
          margin-left: 70px;
          background:url(@sprites) no-repeat -172px -364px;
        }
        .footLeftBodybutton {
          position: absolute;
          top: 222px;
          left: 160px;
          .openAlipay {
            display: inline-block;
            width: 160px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: #fff;
            background: #1890ff;
            margin-right: 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
          .goToAlipay {
            display: inline-block;
            text-align: center;
            width: 80px;
            height: 30px;
            line-height: 30px;
            color: #606266;
            background: #fff;
            border: none;
            border-radius: 4px;
            border: 1px solid #606266;
            cursor: pointer;
          }
        }
      }
    }
  }
  .boxBody {
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
            background:url(@sprites) no-repeat -212px -218px;
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
            background:url(@sprites) no-repeat -250px -220px;
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
    }
    .boxBodyXia {
      display: flex;
      justify-content: space-between;
      .boxBodyLeftDown {
        width: 590px;
        height: 360px;
        border: 1px solid rgb(220, 223, 230);
        position: relative;
        .rightDownTop {
          height: 50px;
          border-bottom: 1px solid rgb(220, 223, 230);
          .rightDownTopIcon {
            width: 16px;
            height: 20px;
            display: inline-block;
            background:url(@sprites) no-repeat -140px -272px;
            margin-right: 15px;
            margin-left: 18px;
            margin-bottom: -4px;
          }
          .rightDownTopwenZi {
            line-height: 50px;
          }
        }
        .bingingExperience {
          width: 100%;
          padding: 30px 0 0 40px;
          .weChatUl,
          .weChatLi {
            list-style-type: disc;
            input {
              width: 238px;
              height: 30px;
              line-height: 30px;
              margin-left: 30px;
              padding-left: 12px;
              background: none;
              border: 1px solid rgb(220, 223, 230);
            }
            .weChatId {
              display: inline-block;
              height: 30px;
              line-height: 30px;
              font: 16px Microsoft YaHe;
              margin-left: 15px;
            }
          }
          .bingBotton {
            width: 80px;
            height: 30px;
            line-height: 30px;
            display: inline-block;
            background: #1890ff;
            border: 1px solid #1890ff;
            color: #fff;
            text-align: center;
            border-radius: 4px;
            position: absolute;
            left: 140px;
            top: 137px;
          }
          .untieButton {
            width: 80px;
            height: 30px;
            line-height: 30px;
            display: inline-block;
            background: none;
            text-align: center;
            text-align: center;
            border: 1px solid rgb(220, 223, 230);
            border-radius: 4px;
            position: absolute;
            left: 240px;
            top: 137px;
          }
        }
      }
      .boxBodyRightDown {
        width: 590px;
        height: 360px;
        border: 1px solid rgb(220, 223, 230);
        .leftDownTop {
          height: 50px;
          border-bottom: 1px solid rgb(220, 223, 230);
          .leftDownTopIcon {
            width: 18px;
            height: 21px;
            display: inline-block;
            background:url(@sprites) no-repeat -175px -272px;
            margin-right: 15px;
            margin-left: 18px;
            margin-bottom: -4px;
          }
          .leftDownTopwenZi {
            line-height: 50px;
          }
        }
        .alipay {
          padding: 46px 0 0 65px;
          position: relative;
          .alipayweiZi {
            list-style-type: disc;
            line-height: 35px;
          }
          .background {
            width: 137px;
            height: 118px;
            background:url(@sprites) no-repeat -170px -365px;
            position: absolute;
            top: 98px;
            right: 69px;
          }
          .openAlipay {
            width: 160px;
            height: 30px;
            line-height: 30px;
            display: inline-block;
            background: #1890ff;
            border: 1px solid #1890ff;
            color: #fff;
            text-align: center;
            border-radius: 4px;
            position: absolute;
            left: 158px;
            top: 235px;
          }
          .goToRegister {
            width: 82px;
            height: 30px;
            line-height: 30px;
            display: inline-block;
            background: none;
            border: 1px solid rgb(220, 223, 230);
            text-align: center;
            border-radius: 4px;
            position: absolute;
            left: 340px;
            top: 235px;
            color: #606266;
          }
        }
      }
    }
  }
}
</style>
