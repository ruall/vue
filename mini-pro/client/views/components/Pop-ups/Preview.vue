<template>
  <div class="box">
    <div class="cententBox">
      <span class="shutDown" @click="shutDown"></span>
      <div class="leftBox">
        <div class="h5Box">
          <iframe :src="item.iframeurl" style="width:100%;height:100%;border:none;" class="templatescrollstyle"/>
        </div>
      </div>
      <div class="rightBox">
        <div class="imgBox">
          <img src="" alt="">
          <span>请使用微信扫一扫查看</span>
        </div>
        <div class="btnBox">
          <button @click="replace">马上替换</button>
          <button @click="shutDown">关闭</button>
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
  props: {
    item: {}
  },
  data () {
    return {
      iframeurl: ''
    }
  },
  computed: {
    ...mapState({showstate: state => state})
  },
  methods: {
    shutDown  () {
      const tool = false;
      this.$emit('DragPreview', tool);
    },
    replace () {
      const data = {
        id: this.item.id,
        miniappId: this.showstate.miniappId
      }
      $.ajax({
        url: app.BaseUrl + '/miniappTemplate/choose',
        type: 'POST',
        data: data,
        dataType: 'json',
        xhrFields: {
          withCredentials: true
        },
        success: res => {
          if (res.success) {
            this.$parent.Refresh();
          } else {
            this.$message.error('选择模板失败');
          }
        },
        error: () => {
          this.$message.error('网络连接错误,请重试');
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@sprites: "/client/assets/images/sprites.png";
.box {
  .clearfix:after {
    content: '.';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10000;
  transform: translateY(-44px);
  .cententBox {
    width: 1000px;
    height: 700px;
    background-color: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
    .shutDown {
      width: 14px;
      height: 14px;
      cursor: pointer;
      z-index:999;
      position: absolute;
      top:15px;
      right:15px;
      background: url(@sprites) no-repeat -450px -104px;
      &:hover {
        background: url(@sprites) no-repeat -484px -104px;
      }
    }
    .leftBox,
    .rightBox {
      width: 500px;
      height: 100%;
      overflow: hidden;
    }
    .leftBox {
      background-color: #f0f0f0;
      .h5Box {
        width: 375px;
        height: 640px;
        margin: 30px auto;
        background: #000;
      }
    }
    .rightBox {
      position: absolute;
      top: 0;
      right: 0;
      .imgBox {
        width: 202px;
        height: 244px;
        margin: 150px auto 45px;
        border: 1px solid #e6e7ec;
        text-align: center;
        img {
          width: 200px;
          height: 200px;
        }
        span {
          display: inline-block;
          margin-top: 20px;
        }
      }
      .btnBox {
        text-align: center;
        button {
          width: 100px;
          height: 30px;
          cursor: pointer;
        }
        :first-child {
          background-color: #66b5ff;
          border: 1px solid #66b5ff;
          color: #fff;
        }
        :last-child {
          background-color: #fff;
          border: 1px solid #e3e2e8;
          color: #606266;
          &:hover {
            background-color: #66b5ff;
            border: 1px solid #66b5ff;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
