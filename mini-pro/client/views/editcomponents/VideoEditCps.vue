<template>
  <div class="videocps style_select">
    <div class="stylename">视频组件</div>
    <ul class="btnchangestyle">
      <li><a>视频来源</a><a href="javascript:;" class="colorlink" target="_black">如何寻找视频通用代码?</a></li>
      <li style="height:55px;padding-right:25px;margin: -10px 0 10px;">
        <!-- <el-input class="input1" v-model="videoStyle.videoSrc" :value="videoStyle.videoSrc" placeholder="请输入内容"></el-input> -->
        <el-input type="textarea" size="medium" :rows="2"  v-model="videoStyle.vis" placeholder="请输入内容"></el-input>
      </li>
      <li>推荐使用：<a class="colorlink" target="_black" href="https://www.aliyun.com/">阿里云存贮</a><a target="_black" class="colorlink" href="https://cloud.tencent.com/">腾讯云存贮</a><a  target="_black" class="colorlink" href="https://www.qiniu.com/">七牛云存贮</a></li>
      <li><a>视频尺寸</a>
      <span class="mr10">宽:</span><el-input type="number" class="widthinput" v-model="videoStyle.w" min="0" minlength="1" maxlength="3" max="370" placeholder="输入宽度"></el-input>
      <span class="ml10 mr10">高:</span><el-input type="number" class="heightinput" min="0" minlength="1" maxlength="4" v-model="videoStyle.h" placeholder="输入高度"></el-input>
      </li>
      <li>
        <a class="fl">背景颜色</a>
         <span class="rel fl">
          <el-color-picker v-model="videoStyle.bgc" show-alpha  :predefine="predefineColors"></el-color-picker>
          <span class="colorspan fl">{{videoStyle.bgc}}</span>
         </span>
        <!-- <span class="setbtnbg">设置背景图片</span> -->
      </li>
      <li>
        <a class="fl">边框</a>
        <nav class="bordernav">
          <a class="fl width46">
            <span class="borderColor" :class="{'active': videoStyle.bdc == 'none'}" :style="'border:6px '+ videoStyle.bds + ' ' + videoStyle.bdc"></span>
            <div class="borderColorsel">
              <el-color-picker v-model="videoStyle.bdc" :change="ChangeStyle()" show-alpha  :predefine="predefineColors"></el-color-picker>          
            </div>
          </a>
          <a class="fl">
            <el-input class="borderinput" type="number" v-model="videoStyle.bdw" :value="videoStyle.bdw" min="0" max="100"  placeholder="输入"></el-input>
            <span class="borderpx">PX</span>
          </a>
          <a class="fl bordersel">
            <em class="xuxian"></em><i></i>
            <div class="selsolid">
              <span class="solid" @click="selborderstyle1('solid')" :class="{'active':bds == 'solid'}"></span>
              <span class="dashed" @click="selborderstyle1('dashed')" :class="{'active':bds == 'dashed'}"></span>
              <span class="dotted" @click="selborderstyle1('dotted')" :class="{'active':bds == 'dotted'}"></span>
            </div>
          </a>
          <a class="fl bordersel">
            <em></em><i></i>
            <ul>
              <li @click="selborderstyle(item,index)" :class="{'active':currentborderindex == index}" v-for="(item,index) in borderlist" :key="index"></li>
            </ul>
          </a>
        </nav>
      </li>
    </ul>
  </div>
</template>
<script>
export default{
  props: {
    container: {
      type: Array, require: true
    }
  },
  data () {
    return {
      videoStyle: {},
      curbtnindex: 0,
      currentborderindex: null,
      containerindex: null,
      borderlist: ['top', 'right', 'bottom', 'left']
    }
  },
  watch: {
    videoStyle: {
      // 这监听对象值的改变 和上面的不一样。
      handler (curVal, oldVal) {
        let containerindex = this.container[this.containerindex];
        if (containerindex) this.$set(containerindex.videoList, this.curbtnindex, this.videoStyle)
      }
    }
  },
  methods: {
    changeCurrentVideoStyle (item, index1, index) {
      this.containerindex = index;
      this.curbtnindex = index1;
      this.videoStyle = JSON.parse(JSON.stringify(item));
      // console.log(this.videoStyle, this.curbtnindex);
    },
    // 统一设置所有自定义属性
    ChangeStyle (item) {
      if (this.videoStyle.bgc === null) {
        this.videoStyle.bgc = 'none';
      } else if (this.videoStyle.bdc === null) {
        this.videoStyle.bdc = 'none';
        this.videoStyle.bdw = '0';
      }
    },
    // 修改边框方向
    selborderstyle (item, index) {
      if (this.currentborderindex === index) {
        this.currentborderindex = null;
      } else {
        this.currentborderindex = index;
        console.log(this.currentborderindex);
        switch (this.currentborderindex) {
          case 0: this.videoStyle.bds = this.bds + ' none none none'; break;
          case 1: this.videoStyle.bds = 'none ' + this.bds + ' none none'; break;
          case 2: this.videoStyle.bds = 'none none ' + this.bds + ' none'; break;
          case 3: this.videoStyle.bds = 'none none none ' + this.bds; break;
        }
      }
    },
    // 修改边框类型solid/dashed/dotted
    selborderstyle1 (name) {
      this.bds = name;
      this.videoStyle.bds = this.bds;
    },
    // 父组件伸缩设置width、height
    setpostion (size) {
      setTimeout(() => {
        this.videoStyle.t = size.top;
        this.videoStyle.l = size.left;
      }, 100)
    },
    // 父组件伸缩设置width、height
    setWidthHeight (size) {
      this.videoStyle.w = size.width;
      this.videoStyle.h = size.height;
    }
  }
}
</script>
<style lang="less">
  @sprites: "/client/assets/images/sprites.png";
  .showVideostyle .videocps.style_select{transform:translateX(0);
    .el-textarea__inner{resize:none;}
  }
  .hidecps .showVideostyle.videocps{transform:translateX(100%);}
  .width70{width:70px !important;margin-right:12px;}
  .colorlink{color:#1890ff;text-decoration: underline;}
  .settextfont{
    .icon{background:url('@{sprites}') no-repeat;background-position: -447px -100px;width:20px;height:20px;    margin: 4px 7px;border: 1px solid #dcdfe6;cursor: pointer;
      &.active{border:1px solid #1890ff;}
      &.icon0{background-position: -254px -184px;margin-left:14px;}
      &.icon1{background-position: -283px -184px;}
      &.icon10{background-position: -315px -184px;}
      &.icon11{background-position: -346px -184px;}
      &.icon20{background-position: -378px -184px;}
      &.icon21{background-position: -412px -184px;}
      &.icon22{background-position: -446px -184px;}
    }
  }
</style>

