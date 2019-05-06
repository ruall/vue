<template>
  <div class="textcps style_select">
    <div class="stylename">文字组件</div>
    <ul class="btnchangestyle">
      <li>
        <a class="fl">字体</a>
        <el-select class="fl width70" v-model="TextStyle.ff"  placeholder="请选择">
          <el-option v-for="item in fontfamilys" :key="item.value" :value="item.value"></el-option>
        </el-select>
        <a class="fl">大小</a>
        <el-select class="fl width70" v-model="TextStyle.fs"  placeholder="请选择">
          <el-option v-for="item in fontoptions" :key="item.value" :value="item.value"></el-option>
        </el-select>
        <a class="fl">行高</a>
        <el-select class="fl width70" v-model="TextStyle.lh"  placeholder="请选择">
          <el-option v-for="item in lineheightptions" :key="item.value" :value="item.value"></el-option>
        </el-select>
      </li>
      <li class="settextfont">
        <a class="fl">设置</a>
        <span class="rel fl">
        <el-color-picker v-model="TextStyle.co" show-alpha :predefine="predefineColors"></el-color-picker>
        <!-- <span class="colorspan fl">{{TextStyle.color}}</span> -->
        </span>
        <span class="fl icon icon0" :class="{'active': TextStyle.fw == 'bold'}" @click="seltextfont0()"></span>
        <span class="fl icon icon1" @click="seltextfontsty()"  :class="{'active': TextStyle.sty == 'italic'}"></span>
        <span class="fl icon" :class="['icon1'+ index, {'active': item === TextStyle.line}]"  v-for="(item,index) in texticonlist1" :key="index" @click="seltextfont1(item,index)"></span>
        <span class="fl icon" :class="['icon2'+ index, {'active': item === TextStyle.ta}]"  v-for="(item,index) in texticonlist2" :key="index" @click="seltextfont2(item, index)"></span>
      </li>
      <li><a>不透明</a><em class="slidersel"><el-slider v-model="TextStyle.op" :show-tooltip="false" step="0.1" max="1"  show-input></el-slider></em></li>
      <li><a>是否悬浮</a>
          <el-radio v-model="isfixed" label="0" :change="ChangeFixedStyle()">不悬浮</el-radio>
          <el-radio v-model="isfixed" label="1" :change="ChangeFixedStyle()">根据位置悬浮</el-radio>
      </li> 
      <li class="btnlink"><a>链接</a>
        <el-select v-model="TextStyle.link" placeholder="链接类型" >
          <el-option v-for="item in linklist" :key="item.value" :value="item.value" ></el-option>
        </el-select>
      </li>
      <li class="btnlink"><a>栏目</a>
        <el-select v-model="TextStyle.link" placeholder="选择栏目" >
          <el-option v-for="item in linklist" :key="item.value" :value="item.value" ></el-option>
        </el-select>
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
      curbtnindex: 0,
      containerindex: 0,
      currnetindex1: null,
      currnetindex2: null,
      isfixed: '0',
      TextStyle: {},
      texticonlist1: ['underline', 'line-through', 'none'],
      texticonlist2: ['left', 'center', 'right'],
      fontfamilys: [
        {value: '微软雅黑'}, {value: '宋体'}, {value: '黑体'}, {value: 'Arial'}, {value: 'Verdana'}, {value: 'sans-serif'}, {value: 'Times'}, {value: 'Geneva'}, {value: 'Georgia'}, {value: 'TimesNR'}
      ],
      fontoptions: [
        {value: '12'}, {value: '13'}, {value: '14'}, {value: '15'}, {value: '16'}, {value: '17'}, {value: '18'}, {value: '19'}, {value: '20'}, {value: '24'}, {value: '30'}, {value: '48'}, {value: '60'}, {value: '72'}, {value: '84'}, {value: '96'}, {value: '108'}, {value: '120'}
      ],
      lineheightptions: [
        {value: '15'}, {value: '16'}, {value: '17'}, {value: '18'}, {value: '19'}, {value: '20'}, {value: '24'}, {value: '30'}, {value: '35'}, {value: '40'}, {value: '48'}, {value: '60'}, {value: '72'}, {value: '84'}, {value: '96'}, {value: '108'}, {value: '120'}
      ],
      linklist: [
        {value: '选项1'}, {value: '选项1'}, {value: '选项1'}, {value: '选项1'}
      ]
    }
  },
  watch: {
    TextStyle: {
      // 这监听对象值的改变 和上面的不一样。
      handler (curVal, oldVal) {
        let containerindex = this.container[this.containerindex];
        if (containerindex) this.$set(containerindex.textList, this.curbtnindex, this.TextStyle)
      }
    }
  },
  methods: {
    changeCurrentTextStyle (item, index1, index) {
      this.containerindex = index;
      this.curbtnindex = index1;
      this.TextStyle = JSON.parse(JSON.stringify(item));
      // console.log(this.TextStyle, this.curbtnindex);
    },
    seltextfont0 (item, index) {
      this.TextStyle.fw = this.TextStyle.fw === 'bold' ? '200' : 'bold';
      console.log(this.TextStyle.fw)
    },
    seltextfontsty (name) {
      this.TextStyle.sty = this.TextStyle.sty === 'italic' ? 'normal' : 'italic';
      // console.log(this.TextStyle.sty)
    },
    seltextfont1 (item, index) {
      this.TextStyle.line = item;
    },
    seltextfont2 (item, index) {
      this.TextStyle.ta = item;
    },
    // 修改是否悬浮
    ChangeFixedStyle () {
      if (this.isfixed === '1') {
        this.TextStyle.isf = true;
      } else {
        this.TextStyle.isf = false;
      }
    },
    // 父组件伸缩设置width、height
    setpostion (size) {
      setTimeout(() => {
        this.TextStyle.t = size.top;
        this.TextStyle.l = size.left;
      }, 100)
    },
    // 父组件伸缩设置width、height
    setWidthHeight (size) {
      this.TextStyle.w = size.width;
      this.TextStyle.h = size.height;
    }
  }
}
</script>
<style lang="less">
  @sprites: "/client/assets/images/sprites.png";
  .showTextstyle .textcps.style_select{transform:translateX(0);}
  .hidecps .showTextstyle.textcps{transform:translateX(100%);}
  .width70{width:70px !important;margin-right:12px;}
  .settextfont{
    .icon{background:url('@{sprites}') no-repeat;background-position: -447px -100px;width:20px;height:20px;    margin: 4px 5px;border: 1px solid #dcdfe6;cursor: pointer;
      &.active{border:1px solid #1890ff;}
      &.icon0{background-position: -254px -184px;margin-left:14px;}
      &.icon1{background-position: -283px -184px;}
      &.icon10{background-position: -315px -184px;}
      &.icon11{background-position: -346px -184px;}
      &.icon12{background:url('/client/assets/images/icon_t.png') no-repeat;background-position: center;}
      &.icon20{background-position: -378px -184px;}
      &.icon21{background-position: -412px -184px;}
      &.icon22{background-position: -446px -184px;}
    }
  }
  //2018.7.27
  .el-input-number__decrease,.el-input-number__increase{
    line-height:29px !important;
  }
</style>




