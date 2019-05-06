<template>
  <div class="containercps style_select">
    <div class="stylename">通栏组件</div>
    <ul class="btnchangestyle">
      <li><a>通栏高度</a><el-input class="input1" type="number" min="0" max="2000" v-model="ContainerStyle.h" placeholder="请输入高度(最小200)"></el-input></li>
      <li>
        <a class="fl">设置背景颜色</a>
         <span class="rel fl">
          <el-color-picker v-model="ContainerStyle.bgc" show-alpha :predefine="predefineColors"></el-color-picker>
          <span class="colorspan fl">{{ContainerStyle.bgc}}</span>
         </span>
      </li>
      <li><a>透明</a><em class="slidersel"><el-slider v-model="ContainerStyle.op" :show-tooltip="false" step="0.1" max="1"  show-input></el-slider></em></li>
      <li>
        <a class="fl">边框</a>
        <nav class="bordernav">
          <a class="fl width46">
            <span class="borderColor" :class="{'active': ContainerStyle.bdc == 'none'}" :style="'border:6px '+ ContainerStyle.bds + ' ' + ContainerStyle.bdc"></span>
            <div class="borderColorsel">
              <el-color-picker v-model="ContainerStyle.bdc" :change="ChangeStyle()" show-alpha  :predefine="predefineColors"></el-color-picker>          
            </div>
          </a>
          <a class="fl">
            <el-input class="borderinput" type="number" v-model="ContainerStyle.bdw" min="0" max="10"  placeholder="输入"></el-input>
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
// import { mapState, mapMutations } from 'vuex';
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
      ContainerStyle: {},
      borderlist: ['top', 'right', 'bottom', 'left']
    }
  },
  // computed: {
  //   ...mapState({showstate: state => state}),
  //   getcurrentImages () {
  //     return this.showstate.Uploadimginfo.CurrentImageUrl;
  //   }
  // },
  watch: {
    // getcurrentImages (val) {
    //   this.ContainerStyle.pic = val;
    // },
    ContainerStyle (curVal, oldVal) {
      if (this.container[this.containerindex]) this.container[this.containerindex].container = curVal;
      // console.log(this.container[this.containerindex].container)
    }
    // }
  },
  methods: {
    // ...mapMutations(['updateImageUpload']),
    changeCurrentContainerStyle (item, index) {
      this.containerindex = index;
      this.ContainerStyle = JSON.parse(JSON.stringify(item.container));
    },
    // 统一设置所有自定义属性
    ChangeStyle (item) {
      if (this.ContainerStyle.bgc === null) {
        this.ContainerStyle.bgc = 'none';
      } else if (this.ContainerStyle.bdc === null) {
        this.ContainerStyle.bdc = 'none';
        this.ContainerStyle.bdw = '0';
      }
    },
    // 修改边框类型solid/dashed/dotted
    selborderstyle1 (name) {
      this.bds = name;
      this.ContainerStyle.bds = this.bds;
    },
    // 修改边框方向
    selborderstyle (item, index) {
      if (this.currentborderindex === index) {
        this.currentborderindex = null;
        // this.ContainerStyle.bds = '';
      } else {
        this.currentborderindex = index;
        // console.log(this.currentborderindex);
        switch (this.currentborderindex) {
          case 0: this.ContainerStyle.bds = this.bds + ' none none none'; break;
          case 1: this.ContainerStyle.bds = 'none ' + this.bds + ' none none'; break;
          case 2: this.ContainerStyle.bds = 'none none ' + this.bds + ' none'; break;
          case 3: this.ContainerStyle.bds = 'none none none ' + this.bds; break;
        }
      }
    }
    // openUploadImagesbtn () {
    //   this.updateImageUpload({showUploadimg: true, CurrentImageUrl: this.showstate.Uploadimginfo.CurrentImageUrl})
    // }

  }
}
</script>
<style lang="less">
  .borderinput input{padding:0 !important;}
  .showContainerStyle .containercps.style_select{transform:translateX(0);}
  .hidecps .showContainerStyle.containercps{transform:translateX(100%);}
  .width70{width:70px !important;margin-right:12px;}
</style>

