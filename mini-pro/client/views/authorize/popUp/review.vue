<template>
  <div class='mongolianLayer'>
    <div class="box">
      <div class="title clearfix">
        <span>微信小程序</span>
        <span class="shutDown" @click="shutDown"></span>
      </div>
      <div class="inputContent clearfix">
        <div class='contentLeft'>
          <div class="MB30">
            <span class="waring">*</span>
            <span>标题</span>
          </div>
          <div class="MB30">
            <span class="waring">*</span>
            <span>标签</span>
          </div>
          <div class="MB30">
            <span class="waring">*</span>
            <span>类目名称</span>
          </div>
        </div>
        <div class="contentRight">
          <form id="upAuth" enctype="multipart/form-data">
            <input type="hidden" name="address" value="pages/index/index">
            <div class="MB30">
              <input type="text" name="title" placeholder="请输入标题" v-model="data.title" />
            </div>
            <div class="MB30">
              <input type="text" name="tag" placeholder="请输入标签" v-model="data.tag" />
            </div>
            <div class="MB30">
              <el-select name="cName" v-model="data.cName" placeholder="请选择栏目">
                <el-option v-for="(item, index) in list" :key="index" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </form>
        </div>
        <div class="buttonBox">
          <button class="button" @click="shutDown">取消</button>
          <button class="button save" @click="submit">提交</button>
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
        value: '',
        list: [],
        data: {
          address: 'pages/index/index',
          title: '',
          tag: '',
          cName: ''
        }
      }
    },
    mounted () {
      const self = this;
      self.getList();
    },
    methods: {
      submit () {
        const data = this.data;
        $.ajax({
          url: app.BaseUrl + '/open/submitAudit',
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
      getList () {
        app.getfetch('/open/audit').then(res => {
          const data = res.data;
          if (data.success) {
            const list = data.data.categoryList;
            for (let i = 0; i < list.length; i++) {
              let element = {};
              element.label = list[i].first_class + '>' + list[i].second_class;
              element.value = list[i].first_id + ',' + list[i].first_class + ',' + list[i].second_id + ',' + list[i]
                .second_class;
              this.list.push(element);
            }
          }
        }).catch(() => {
          this.$message.error('网络异常请稍后重试');
        })
      },
      shutDown () {
        const tool = false;
        this.$emit('reviewShutDown', tool);
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
      height: 380px;
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
        width: calc(~'100% - 483px');
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
        width: 460px;
        float: right;
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