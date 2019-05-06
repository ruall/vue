<template>
  <div class="piccps style_select">
    <div class="stylename">图片组件</div>
    <div class="piccontent clearfix">
      <div class="bg">
        <div class="picUpload" v-if="!showstate.Uploadimginfo.CurrentImageUrl && showstate.Uploadimginfo.firstUploadCurrentImageUrl"><p></p></div>
        <div class="imgcontent">
          <img :src="picStyle.pic" v-if="showstate.Uploadimginfo.CurrentImageUrl || showstate.Uploadimginfo.firstUploadCurrentImageUrl || picStyle.pic"/>
        </div>
      </div>
      <a class="uploadbtn" @click="openUploadImagesbtn()">替换图片</a>    
    </div>
    <ul class="btnchangestyle">
      <li><a>图片尺寸</a>
      <span class="ml10 mr10">宽:</span><el-input type="number"  class="widthinput" v-model="picStyle.w"  maxlength="3" placeholder="输入" min="0" minlength="1" max="300"></el-input>
      <span class="ml10 mr10">高:</span><el-input type="number"  class="heightinput" v-model="picStyle.h" placeholder="输入" min="0" minlength="1" maxlength="3" max="300"></el-input>
      </li>
      <li><a>圆角</a><em class="slidersel"><el-slider  v-model="picStyle.bdr" :show-tooltip="false" show-input></el-slider></em></li>
      <li><a>透明</a><em class="slidersel"><el-slider  v-model="picStyle.op"  step="0.1" max="1" :show-tooltip="false" show-input></el-slider></em></li>
      <li>
        <a class="fl">边框</a>
        <nav class="bordernav">
          <a class="fl width46">
            <span class="borderColor" :class="{'active': picStyle.bdc == 'none'}" :style="'border:6px '+ picStyle.bds + ' ' + picStyle.bdc"></span>
            <div class="borderColorsel">
              <el-color-picker v-model="picStyle.bdc" show-alpha :change="ChangeStyle()" :predefine="predefineColors"></el-color-picker> </div>
          </a>
          <a class="fl">
            <el-input class="borderinput" type="number" v-model="picStyle.bdw"  min="0" minlength="1" maxlength="2" max="300" placeholder="输入"></el-input>
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
      <li><a>是否悬浮</a>
          <el-radio v-model="isfixed" label="0">不悬浮</el-radio>
          <el-radio v-model="isfixed" label="1">根据位置悬浮</el-radio>
      </li>
      <li class="btnlink"><a>链接</a>
        <el-select v-model="picStyle.link" placeholder="请选择链接">
          <el-option v-for="items in pagelist" :key="items.id" :label="items.pageName" :value="items.id"></el-option>
        </el-select>
      </li>
    </ul>
  </div>
</template>
<script>
  // import app from '../../fetch/api.js'
  import { mapState, mapMutations } from 'vuex';
  export default{
    props: {
      container: {type: Array, require: true}
    },
    data () {
      return {
        curpicindex: 0,
        containerindex: 0,
        currentborderindex: null,
        nextpage: false,
        btnlist: [{name: 'btn1'}, {name: 'btn2'}, {name: 'btn3'}, {name: 'btn4'}],
        isfixed: '0',
        opacity: 100,
        picStyle: {pic: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAANAQMAAACJojyTAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAAtJREFUCNdjIAMAAAA0AAGSMvNHAAAAAElFTkSuQmC'},
        picStyleInit: [{bds: 'solid'}, {t: '0'}, {l: '0'}],
        fontoptions: [
          {value: '12'}, {value: '13'}, {value: '14'}, {value: '15'}, {value: '16'}, {value: '17'}, {value: '18'}, {value: '19'}, {value: '20'}, {value: '24'}, {value: '30'}, {value: '48'}, {value: '60'}, {value: '72'}, {value: '84'}, {value: '96'}, {value: '108'}, {value: '120'}
        ],
        borderlist: ['top', 'right', 'bottom', 'left'],
        pagelist: []
      }
    },
    computed: {
      ...mapState({showstate: state => state}),
      getcurrentImages () {
        return this.showstate.Uploadimginfo.CurrentImageUrl;
      }
    },
    watch: {
      isfixed: {
        handler (curVal, oldVal) {
          this.picStyle.isf = this.isfixed !== '0';
        }
      },
      getcurrentImages (val) {
        if (this.showstate.Uploadimginfo.ImgType === 'pic') {
          this.picStyle.pic = val;
        }
      },
      picStyle: {
        handler (curVal, oldVal) {
          let containerindex = this.container[this.containerindex];
          if (containerindex) this.$set(containerindex.picList, this.curpicindex, this.picStyle);
          // console.log(this.container)
        }
      }
    },
    methods: {
      ...mapMutations(['updateImageUpload']),
      // 按钮swiper切换
      btnclick (e) {
        this.nextpage = false;
        if (e === 'next') this.nextpage = true;
      },
      changeCurrentPicStyle (item, index1, index) {
        this.containerindex = index;
        this.curpicindex = index1;
        this.picStyle = JSON.parse(JSON.stringify(item));
        this.isfixed = this.picStyle.isf ? '1' : '0';
        // console.log(this.picStyle)
        this.pagelist = JSON.parse(window.sessionStorage.getItem('pagelistinfo'));
      },
      ChangeOpacityStyle () {
        // this.picStyle.opacity = this.opacity / 100
      },
      // 统一设置所有自定义属性
      ChangeStyle (item) {
        if (this.picStyle.bgc === null) {
          this.picStyle.bgc = 'none';
        } else if (this.picStyle.bdc === null) {
          this.picStyle.bdc = 'none';
          this.picStyle.bdc = '0';
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
            case 0: this.picStyle.bds = this.bds + ' none none none'; break;
            case 1: this.picStyle.bds = 'none ' + this.bds + ' none none'; break;
            case 2: this.picStyle.bds = 'none none ' + this.bds + ' none'; break;
            case 3: this.picStyle.bds = 'none none none ' + this.bds; break;
          }
        }
      },
      // 修改边框类型solid/dashed/dotted
      selborderstyle1 (name) {
        this.bds = name;
        this.picStyle.bds = this.bds;
      },
      // 父组件伸缩设置width、height
      setpostion (size) {
        // console.log(size)
        setTimeout(() => {
          this.picStyle.t = size.top;
          this.picStyle.l = size.left;
        }, 100)
      },
      // 父组件伸缩设置width、height
      setWidthHeight (size) {
        this.picStyle.w = size.width;
        this.picStyle.h = size.height;
      },
      openUploadImagesbtn () {
        this.updateImageUpload({showUploadimg: true, CurrentImageUrl: this.showstate.Uploadimginfo.CurrentImageUrl, ImgType: 'pic'})
      }
    }
  }
</script>
<style lang="less">
  @sprites: "/client/assets/images/sprites.png";
   .picUpload p{pointer-events: none;position: absolute;top: 0;left: 0;right: 0;bottom: 0;margin: auto;width: 100px;height: 90px;
    &::before{content:'';display:block;width:60px;height:55px;margin:0px auto 10px;position: relative;z-index: 0;
      background: url(/client/assets/images/tup_shili.png);    background-size: 60px auto;
    background-repeat: no-repeat;
    }
    &:hover &::before{background: url(/client/assets/images/tup_shili.png);}
    &::after{content:'请添加图片';display:block;width:100%;text-align:center;margin: 0 auto;color:#65676b;position: relative;z-index: 0;}
  }
  .bg{background: #ebeef5;width:360px;margin:0 auto;}
  .showpicstyle .piccps.style_select{transform:translateX(0);}
  .hidecps .showpicstyle.piccps{transform:translateX(100%);}
  .piccontent{width:100%;position: relative;
    .picUpload{position: relative;top: 120px;}
    .imgcontent{width:360px;margin:20px auto;border-radius:2px;height:230px;position: relative;
    z-index: 1;
      img{width:100%;height:230px;    display: block;border-radius: 2px;}
    }
    .uploadbtn{width:360px;height:40px;color:#606266;line-height: 40px;font-size: 12px;text-align: center;display: block;background: #ebeef5;border-radius: 4px;margin-top:20px;margin:0 auto 10px;cursor: pointer;position: relative;text-indent: 30px;
      &:before{content:'';width:15px;height:15px; background: url(/client/assets/images/tihuan_a.png) no-repeat;display: block;position: absolute;top:14px;left:-40px;right:0;margin:auto;}
      &:hover{background:#e8f4ff;&:before{background: url(/client/assets/images/tihuan_b.png) no-repeat;}}
    }
  }
</style>

