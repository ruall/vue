<template>
  <div class="msgcps style_select">
    <div class="stylename">留言组件</div>
    <div class="selectbtn clearfix">
      <p>组件样式</p>
      <a class="btn prevpage op0" @click="btnclick('prev')"></a> 
      <div class="selbtn">
        <ul :class="{'nextpage':nextpage}">
          <li @click="selstyleimg('msg2')" :class="{'active': MsgStyle.classnm == 'msg2'}"><img src="/client/assets/images/zxly_a.png" /></li>
          <li @click="selstyleimg('msg3')" :class="{'active': MsgStyle.classnm == 'msg3'}"><img src="/client/assets/images/zxly_b.png" /></li>
          <li @click="selstyleimg('msg1')" :class="{'active': MsgStyle.classnm == 'msg1'}"><img src="/client/assets/images/zxly_c.png" /></li>
        </ul>
      </div>
      <a class="btn nextpage op0" @click="btnclick('next')"></a>      
    </div>
    <ul class="btnchangestyle">
      <li><a>按钮文案:</a><el-input class="input1" v-model="MsgStyle.btn[0].con" placeholder="请输入内容"></el-input></li>
      <li style="height: 45px;"><a>按钮样式:</a>
        <el-radio v-model="selstyle" label="0" >样式一</el-radio>
        <el-radio v-model="selstyle" label="1" >样式二</el-radio>
        <el-radio v-model="selstyle" label="2" >样式三</el-radio>
        <el-radio v-model="selstyle" label="3" style="margin-left:81px;">样式四</el-radio>
      </li>
      <li><a class="fl">按钮文字:</a>
        <el-select class="fl" v-model="MsgStyle.btn[0].fs"  placeholder="请选择">
          <el-option v-for="item in fontoptions" :key="item.value" :value="item.value"></el-option>
        </el-select>
        <span class="rel fl ml10">
          <el-color-picker v-model="MsgStyle.btn[0].co" show-alpha :predefine="predefineColors"></el-color-picker>
          <span class="colorspan">{{MsgStyle.btn[0].co}}</span>
        </span>
      </li>
      <li>
        <a class="fl">按钮颜色:</a>
         <span class="rel fl">
            <el-color-picker v-model="MsgStyle.btn[0].bgc" show-alpha  :predefine="predefineColors"></el-color-picker>
            <span class="colorspan fl">{{MsgStyle.btnbgc}}</span>
         </span>
      </li>
      <li>
        <a class="fl">背景颜色:</a>
         <span class="rel fl">
          <el-color-picker v-model="MsgStyle.bgc" show-alpha  :predefine="predefineColors"></el-color-picker>
          <span class="colorspan fl">{{MsgStyle.bgc}}</span>
         </span>
        <!-- <span class="setbtnbg">设置背景图片</span> -->
      </li>
      <li><a>内边距:</a><el-input class="pdinput" type="number" v-model="MsgStyle.pd" min="0" minlength="1" maxlength="3" max="370" placeholder="输入"></el-input></li>
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
      currentindex: null,
      currentborderindex: null,
      nextpage: false,
      selstyle: '0',
      btnlist: [{name: 'btn1'}, {name: 'btn2'}, {name: 'btn3'}, {name: 'btn4'}],
      isfixed: '0',
      opacity: 100,
      MsgStyle: {btn: [{}]},
      // MsgStyleInit: [{bds: 'solid'}, {t: '0'}, {l: '0'}],
      fontoptions: [
        {value: '12'}, {value: '13'}, {value: '14'}, {value: '15'}, {value: '16'}, {value: '17'}, {value: '18'}, {value: '19'}, {value: '20'}, {value: '24'}, {value: '30'}, {value: '48'}, {value: '60'}, {value: '72'}, {value: '84'}, {value: '96'}, {value: '108'}, {value: '120'}
      ],
      borderlist: ['top', 'right', 'bottom', 'left'],
      pagelist: []
    }
  },
  watch: {
    selstyle: {
      // 这监听对象值的改变
      handler (curVal, oldVal) {
        console.log(curVal)
        // this.MsgStyle.type = curVal;
        switch (curVal) {
          case '0': this.MsgStyle.btn[0].co = 'rgba(255, 255, 255, 1)'; this.MsgStyle.btn[0].bdc = 'rgb(255, 255, 255)'; this.MsgStyle.btn[0].bgc = 'rgba(24, 144, 253, 1)'; this.MsgStyle.btn[0].bdr = 5; break;
          case '1': this.MsgStyle.btn[0].co = 'rgb(24, 144, 253)'; this.MsgStyle.btn[0].bdc = 'rgb(24, 144, 253)'; this.MsgStyle.btn[0].bgc = 'rgb(255, 255, 255)'; this.MsgStyle.btn[0].bdr = 5; break;
          case '2': this.MsgStyle.btn[0].co = 'rgba(255, 255, 255, 1)'; this.MsgStyle.btn[0].bdc = 'rgb(255, 255, 255)'; this.MsgStyle.btn[0].bgc = 'rgba(24, 144, 253, 1)'; this.MsgStyle.btn[0].bdr = 20; break;
          case '3': this.MsgStyle.btn[0].co = 'rgb(24, 144, 253)'; this.MsgStyle.btn[0].bdc = 'rgb(24, 144, 253)'; this.MsgStyle.btn[0].bgc = 'rgb(255, 255, 255)'; this.MsgStyle.btn[0].bdr = 20; break;
        }
      }
    },
    MsgStyle: {
      // 这监听对象值的改变 和上面的不一样。
      handler (curVal, oldVal) {
        console.log(this.MsgStyle);
        let containerindex = this.container[this.containerindex];
        if (containerindex) this.$set(containerindex.msgList, this.curbtnindex, this.MsgStyle)
        // console.log(this.MsgStyle)
      }
    }
  },
  methods: {
    // 选择图片模板
    selstyleimg (classname) {
      this.MsgStyle.classnm = classname;
      // console.log(this.MsgStyle)
    },
    // 按钮swiper切换
    btnclick (e) {
      this.nextpage = false;
      if (e === 'next') this.nextpage = true;
    },
    changeCurrentMsgStyle (item, index1, index) {
      this.containerindex = index;
      this.curbtnindex = index1;
      this.MsgStyle = JSON.parse(JSON.stringify(item));
      console.log(item.classnm)
      this.MsgStyle.classnm = item.classnm;
      // this.selstyle = this.MsgStyle.type;
      console.log(this.MsgStyle.classname)
    },
    // 父组件伸缩设置width、height
    setpostion (size) {
      setTimeout(() => {
        this.MsgStyle.t = size.top;
        this.MsgStyle.l = size.left;
      }, 100)
    }
  }
}
</script>
<style lang="less">
  @sprites: "/client/assets/images/sprites.png";
  .showMsgstyle .msgcps.style_select{transform:translateX(0);}
  .hidecps .showMsgstyle.msgcps{transform:translateX(100%);}
  .el-radio + .el-radio {
    margin-left: 10px;
  }
  .pdinput{width:60px;}
  .selbtn img{display: block;margin:0 auto;}
  .msgcps .selbtn li {
    float: left;
    width: 91px;
    cursor: pointer;
    height: 100%;
    border: 1px solid #dcdfe6;
    margin: 0 7px;
  }
  .op0{opacity: 0;pointer-events: none;}
</style>

