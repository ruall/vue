<template>
  <div class="bgcps style_select">
    <div class="stylename">页面背景</div>
    <ul class="btnchangestyle">
      <li>
        <a class="fl" >设置颜色</a>
         <span class="rel fl">
          <el-color-picker v-model="windowconfigs.bgColor"  :predefine="predefineColors"></el-color-picker>
          <span class="colorspan fl">{{windowconfigs.bgColor}}</span>
         </span>
        <span class="setbtnbg" @click="openUploadImagesbtn()">设置背景图片</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default{
  data () {
    return {
      windowconfigs: {}
    }
  },
  computed: {
    ...mapState({showstate: state => state}),
    getcurrentImages () {
      return this.showstate.CurrentBGImageUrl;
    }
  },
  watch: {
    windowconfigs: {
      // 这监听对象值的改变。
      handler (curVal, oldVal) {
        this.showstate.CurrentBGImageUrl.bgColor = this.windowconfigs.bgColor;
        this.showstate.CurrentBGImageUrl.bgImg = null;
        console.log(this.showstate.CurrentBGImageUrl.bgColor)
      }
    },
    getcurrentImages (val) {
      this.showstate.CurrentBGImageUrl.bgColor = null;
      this.showstate.CurrentBGImageUrl.bgImg = val;
    }
  },
  methods: {
    ...mapMutations(['updateBgImageUpload']),
    changeCurrentwindowconfigs () {
      this.windowconfigs.bgColor = this.showstate.CurrentBGImageUrl.bgColor;
      console.log(this.windowconfigs.bgColor)
    },
    openUploadImagesbtn () {
      this.updateBgImageUpload({showUploadimg: true, bgColor: this.windowconfigs.bgColor, bgImg: this.windowconfigs.bgImg, bgupload: true});
    }
  }
}
</script>
<style lang="less">
  .showbgcpsStyle .bgcps.style_select{transform:translateX(0);}
  .hidecps .showbgcpsStyle.bgcps{transform:translateX(100%);}
  .width70{width:70px !important;margin-right:12px;}
  .bgcps .colorspan {width:150px !important;}
</style>

