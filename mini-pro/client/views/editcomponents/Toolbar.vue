<template>
  <div>
    <ul class="recordBar">
      <li @click="setcpsName('showbgcpsStyle')"><a class="iconbtn1"></a><span>背景</span></li>
      <li @click="setcpsName('showControlstyle')" class=""><a class="iconbtn2"></a><span>控件显示</span></li>
      <!-- <li @click="showstyle()" class=""><a class="iconbtn3"></a><span>上一步</span></li>
      <li @click="showstyle()" class=""><a class="iconbtn4"></a><span>下一步</span></li> -->
      <li @click="showstyle()" class=""><a class="iconbtn5"></a><span></span></li>
    </ul>
  </div>
</template>
<script>
  export default{
    methods: {
      // 父组件伸缩设置width、height
      setcpsName (name) {
        this.$emit('setcpsName', name)
      }
    }
  }
</script>
<style lang="less">
  @sprites: "/client/assets/images/sprites.png";
  .recordBar{position: absolute;top:0;right:-15%;bottom:0;margin:auto;height:135px; z-index: 1001;   border-radius: 5px;box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
    &:before{content:'';width:100%;height:100%;border-radius: 5px;background: #fff;position: absolute;}
    li{width:45px;height:45px;cursor: pointer;position: relative;
      span{opacity:0; transition: all .3s ease 0s;    pointer-events: none; position: absolute;top: 9px; left: 60px; min-width: 50px;
    height: 30px;font-size: 12px;padding: 0 5px;height: 30px;border-radius: 5px; text-align: center; line-height: 30px;color: #fff;background: #606266;
        &:before{content:'';position: absolute;left:-7px;top:10px;height: 0;width: 0;
          border-right: 10px solid #606266;
          border-bottom: 5px solid transparent;
          border-top: 5px solid transparent;
        }
      }
      a{background:url('@{sprites}') no-repeat;background-position: -36px -149px;    
        display: block;cursor: pointer;width: 16px;height: 17px;margin: 0px auto;
        position: relative;top: 14px;
        &.iconbtn2{background-position: -108px -150px;}
        &.iconbtn3{background-position: -180px -149px;}
        &.iconbtn4{background-position: -288px -149px;}
        &.iconbtn5{background-position: -393px -149px;}
      }
      &:hover{background:rgba(24, 144, 255, 0.1);
        span{opacity:1;}
      }
      &:hover .iconbtn1{background-position: 0 -149px;}
      &:hover .iconbtn2{background-position: -71px -150px;}
      &:hover .iconbtn3{background-position: -144px -149px;}
      &:hover .iconbtn4{background-position: -252px -149px;}
      &:hover .iconbtn5{background-position: -359px -149px;}
    }
  }
</style>

