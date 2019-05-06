<template>
  <div class="bg">
    <div class="box">
      <div class="title">
        <span>设置链接地址</span>
        <span class="shutDown" @click="shutDown"></span>
      </div>
      <div class='cententBox'>
        <div class="leftBox">
          <div class="MB78">链接类型</div>
          <div v-if="showsecondlevel">页面</div>
        </div>
        <div class="rightBox">
          <div class="firstLevel">
            <el-radio v-model="code" label="0" @change="change">无</el-radio>
            <el-radio v-model="code" v-for="(item,index) in firstList" :key="index" :label="item.code" @change="change">{{item.name}}</el-radio>
          </div>
          <div class="secondLevel" v-if="showsecondlevel">
            <el-select v-model="link" placeholder="请选择" @change="changeSecond">
              <!-- <el-option :value="请选择"></el-option> -->
              <el-option v-for="item in secondList" :key="item.value" :label="item.name" :value="item.url">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class='btnbox'>
          <button @click="shutDown">取消</button>
          <button>确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import app from '../../../fetch/api.js';
  import { mapState } from 'vuex';

  export default {
    computed: {
      ...mapState({showstate: state => state})
    },
    data () {
      return {
        code: '0',
        link: '',
        firstList: [],
        secondList: [],
        showsecondlevel: false
      }
    },
    watch: {
      link: {
        handler (curVal, oldVal) {
          console.log(curVal)
        }
      }
    },
    methods: {
      openlinkepop () {
        app.getfetch('/link/type/getlist').then(res => {
          if (res.data.success) {
            this.firstList = res.data.data.list;
          } else {
            this.$message.error('获取链接数据失败,请重试!');
          }
        }).catch(() => {
          this.$message.error('当前网络异常,请重试!');
        })
      },
      change (v) {
        if (this.code !== '0' && this.code !== 600 && this.code !== 700 && this.code !== 800 && this.code !== 900) {
          app.getfetch(`/link/type/getChildlist/${this.code}?miniappId=${this.showstate.miniappId}`).then(res => {
            if (res.data.success && res.data.data.list.length > 0) {
              this.showsecondlevel = true;
              this.secondList = res.data.data.list;
            } else {
              this.showsecondlevel = false;
            }
            this.link = '请选择'
          })
        } else {
          this.showsecondlevel = false;
          this.link = '请选择'
        }
      },
      changeSecond () {
        console.log('sssss')
      },
      shutDown () {
        this.$emit('setLink', false);
      }
    }
  }
</script>

<style lang="less" scoped>
  @sprites: "/client/assets/images/sprites.png";
  .bg {
    .MB78 {
      margin-bottom: 80px;
    }
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(0, 0, 0, 0.4);
    z-index: 9999;
    .box {
      width: 600px;
      height: 480px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      .title {
        margin-top: 15px;
        padding: 0 15px;
        .shutDown {
          float: right;
          width: 14px;
          height: 14px;
          cursor: pointer;
          background: url(@sprites) no-repeat -450px -104px;
          &:hover {
            background: url(@sprites) no-repeat -484px -104px;
          }
        }
      }
      .cententBox {
        margin-top: 50px;
        height: calc(~"100% - 71px");
        .leftBox,
        .rightBox {
          float: left;
        }
        .leftBox {
          width: 19%;
          height: 100%;
          text-align: right;
        }
        .rightBox {
          width: 80%;
          // height: 100%;
          .firstLevel {
            label {
              margin-left: 20px;
              margin-bottom: 10px;
            }
          }
          .secondLevel {
            margin:5px 0 0 20px; 
          }
        }
      }
      .btnbox{
        position: absolute;
        bottom: 40px;
        text-align: center;
        width:100%;
        button{
          width:80px;
          height:30px;
          border:1px solid #d9d9d9;
          border-radius: 4px;
          background-color:#fff;
          color:#606266;
          cursor: pointer;
        }
        :last-child{
          border-color:#1890ff;
          background-color:#1890ff;
          color:#fff;
        }
      }
    }
  }

  .el-radio__label {
    font-size: 12px !important;
    color: #606266 !important;
  }
</style>