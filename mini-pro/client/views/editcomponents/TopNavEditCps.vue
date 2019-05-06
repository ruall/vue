<template>
  <div class="TopNavcps style_select">
    <div class="stylename">顶部导航</div>
    <ul class="btnchangestyle">
      <li>
        <a class="fl" >顶部导航</a>
         <span class="rel fl">
          <el-color-picker v-model="windowconfig_bg" :predefine="predefineColors"></el-color-picker>
          <span class="colorspan fl">{{windowconfig_bg}}</span>
         </span>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default{
  data () {
    return {
      windowconfig_bg: ''
    }
  },
  computed: {
    ...mapState({showstate: state => state}),
    getcurrentImages () {
      return this.windowconfig_bg;
    }
  },
  watch: {
    windowconfig_bg: {
      handler (curVal, oldVal) {
        this.showstate.AllStyle.navigatorBackColor = this.windowconfig_bg;
        // console.log(this.showstate.AllStyle.navigatorBackColor)
      }
    },
    getcurrentImages (val) {
      this.showstate.AllStyle.navigatorBackColor = val;
      console.log(this.showstate.AllStyle)
    }
  },
  methods: {
    ...mapMutations(['updateBgImageUpload']),
    changeCurrentTopconfigs () {
      this.windowconfig_bg = this.showstate.AllStyle.navigatorBackColor;
      console.log(this.windowconfig_bg)
    }
  }
}
</script>
<style lang="less">
  .showTopNavcpsStyle .TopNavcps.style_select{transform:translateX(0);}
  .hidecps .showTopNavcpsStyle.TopNavcps{transform:translateX(100%);}
  .width70{width:70px !important;margin-right:12px;}
  .bgcps .colorspan {width:150px !important;}
</style>


