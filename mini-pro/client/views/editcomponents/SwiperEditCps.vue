<template>
  <div class="swipercps style_select">
    <div class="stylename">轮播多图组件</div>
    <div class="adminPage flex noborderbottom">
      <a @click="cptpage=0" :class="{'active':cptpage == 0}">编辑</a>
      <a @click="cptpage=1" :class="{'active':cptpage == 1}">设置</a>
    </div>
    <div v-show="cptpage == 0">
      <div class="selectbtn clearfix">
        <p>组件样式</p>
        <!-- <a class="btn prevpage" @click="btnclick('prev')"></a>  -->
        <div class="selbtn">
          <ul :class="{'nextpage':nextpage}">
            <li @click="selstyleimg('swiper1')" :class="{'active': SwiperStyle.classnm == 'swiper1'}"><img src="/client/assets/images/swiper1.gif" /></li>
            <li @click="selstyleimg('swiper2')" :class="{'active': SwiperStyle.classnm == 'swiper2'}"><img src="/client/assets/images/swiper2.gif" /></li>      
            <li @click="selstyleimg('swiper3')" :class="{'active': SwiperStyle.classnm == 'swiper3'}"><img src="/client/assets/images/swiper3.png" /></li>
          </ul>
        </div>
        <!-- <a class="btn nextpage" @click="btnclick('next')"></a> -->
      </div>
      <ul class="cubeimages flex-wrap">
        <li v-for="(item,index) in SwiperStyle.swiperLists" :key="index" @click="openUploadImagesbtn(index)" :class="{'active': sonindex == index}"><img  :src="item.imgurl"/><span @click.stop="delimg(item,index)"></span></li>
        <li class="addcubeimg" @click="addimg()" v-if="SwiperStyle.swiperLists && SwiperStyle.swiperLists.length < 20"></li>
      </ul>
      <p class="tuijian">最佳尺寸：750*400</p>
      <ul class="btnchangestyle">
        <li class="btnlink"><a>链接:</a>
          <el-select v-model="swipertitle.link" placeholder="请选择链接">
            <el-option v-for="items in pagelist" :key="items.id" :label="items.pageName" :value="items.id"></el-option>
          </el-select>
        </li>
        <li><a>描述:</a><el-input class="input1" type="text" v-model="swipertitle.tt" placeholder="请输入内容"></el-input></li>
      </ul>
    </div>
    <div v-show="cptpage == 1">
      <ul class="btnchangestyle">
        <li><a class="fl">文字设置:</a>
          <el-select class="fl" v-model="SwiperStyle.fs"  placeholder="请选择">
            <el-option v-for="item in fontoptions" :key="item.value" :value="item.value"></el-option>
          </el-select>
          <span class="rel fl ml10">
            <el-color-picker v-model="SwiperStyle.co" show-alpha :predefine="predefineColors"></el-color-picker>
            <span class="colorspan">{{SwiperStyle.co}}</span>
          </span>
        </li>
        <li><a>图片描述:</a>
          <el-radio v-model="isshowtext" label="0" >显示</el-radio>
          <el-radio v-model="isshowtext" label="1" >隐藏</el-radio>
        </li>
        <li><a>文本对齐方式:</a>
          <el-radio v-model="textAlign" label="0" >居左</el-radio>
          <el-radio v-model="textAlign" label="1" >居中</el-radio>
          <el-radio v-model="textAlign" label="2" >居右</el-radio>
        </li>
        <li>
          <a class="fl">背景颜色:</a>
          <span class="rel fl">
            <el-color-picker v-model="SwiperStyle.bgc" show-alpha  :predefine="predefineColors"></el-color-picker>
            <span class="colorspan fl">{{SwiperStyle.bgc}}</span>
          </span>
        </li>
        <li><a>圆角:</a><em class="slidersel"><el-slider v-model="SwiperStyle.libdr" show-input></el-slider></em></li>
        <li><a>不透明:</a><em class="slidersel"><el-slider v-model="SwiperStyle.op" max="1" step="0.1" :show-tooltip="false" show-input></el-slider></em></li>
        <li>
          <a class="fl">边框:</a>
          <nav class="bordernav">
            <a class="fl width46">
              <span class="borderColor" :class="{'active': SwiperStyle.bdc == 'none'}" :style="'border:6px '+ SwiperStyle.bds + ' ' + SwiperStyle.bdc"></span>
              <div class="borderColorsel">
                <el-color-picker v-model="SwiperStyle.bdc" :change="ChangeStyle()" show-alpha  :predefine="predefineColors"></el-color-picker>    
              </div>
            </a>
            <a class="fl">
              <el-input class="borderinput" type="number" v-model="SwiperStyle.bdw" min="0" max="100"  placeholder="输入"></el-input>
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
  </div>
</template>
<script>
// import app from '../../fetch/api.js'
import { mapState, mapMutations } from 'vuex';
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
      cptpage: 0,
      currentindex: null,
      currentborderindex: null,
      nextpage: false,
      swipertitle: {},
      btnlist: [{name: 'btn1'}, {name: 'btn2'}, {name: 'btn3'}, {name: 'btn4'}],
      sonindex: 0,
      SwiperStyle: {},
      textAlign: '0',
      isshowtext: '0',
      fontoptions: [
        {value: '12'}, {value: '13'}, {value: '14'}, {value: '15'}, {value: '16'}, {value: '17'}, {value: '18'}, {value: '19'}, {value: '20'}, {value: '24'}, {value: '30'}, {value: '48'}, {value: '60'}, {value: '72'}, {value: '84'}, {value: '96'}, {value: '108'}, {value: '120'}
      ],
      borderlist: ['top', 'right', 'bottom', 'left'],
      pagelist: []
    }
  },
  computed: {
    ...mapState({showstate: state => state}),
    getcurrentswiperImages () {
      return this.showstate.CurrentSwiperImageUrl;
    }
  },
  watch: {
    getcurrentswiperImages (val) {
      if (this.showstate.Uploadimginfo.ImgType === 'swiper') {
        this.SwiperStyle.swiperLists[this.sonindex].imgurl = val;
      }
    },
    textAlign: {
      handler (curVal, oldVal) {
        switch (curVal) {
          case '0': this.SwiperStyle.ta = 'left'; break;
          case '1': this.SwiperStyle.ta = 'center'; break;
          default: this.SwiperStyle.ta = 'right'; break;
        }
      }
    },
    isshowtext: {
      handler (curVal, oldVal) {
        this.SwiperStyle.disp = this.isshowtext === '0' ? 'block' : 'none';
      }
    },
    SwiperStyle: {
      handler (curVal, oldVal) {
        // console.log(this.curbtnindex, this.sonindex, curVal)
        let containerindex = this.container[this.containerindex];
        if (containerindex) this.$set(containerindex.swiperList, this.curbtnindex, curVal)
      }
    }
  },
  methods: {
    ...mapMutations(['updateImageUpload']),
    // 选择图片模板
    selstyleimg (classname) {
      this.SwiperStyle.classnm = classname;
      if (classname === 'swiper1') this.SwiperStyle.co = '#fff';
      if (classname === 'swiper2' || classname === 'swiper3') this.SwiperStyle.co = '#333';
    },
    // 按钮swiper切换
    btnclick (e) {
      this.nextpage = false;
      if (e === 'next') this.nextpage = true;
    },
    changeCurrentSwiperStyle (item, index1, index, item2, index2) {
      this.containerindex = index;
      this.curbtnindex = index1;
      this.swipertitle = item2;
      this.sonindex = index2;
      this.SwiperStyle = JSON.parse(JSON.stringify(item));
      switch (this.SwiperStyle.ta) {
        case 'left': this.textAlign = '0'; break;
        case 'center': this.textAlign = '1'; break;
        default: this.textAlign = '2'; break;
      }
      this.isshowtext = this.SwiperStyle.disp === 'block' ? '0' : '1';
      // console.log(this.SwiperStyle)
      this.pagelist = JSON.parse(window.sessionStorage.getItem('pagelistinfo'));
    },
    // 统一设置所有自定义属性
    ChangeStyle (item) {
      if (this.SwiperStyle.bgc === null) {
        this.SwiperStyle.bgc = 'none';
      } else if (this.SwiperStyle.bdc === null) {
        this.SwiperStyle.bdc = 'none';
        this.SwiperStyle.bdw = '0';
      }
    },
    // 修改边框方向
    selborderstyle (item, index) {
      if (this.currentborderindex === index) {
        this.currentborderindex = null;
        // this.SwiperStyle.bds = '';
      } else {
        this.currentborderindex = index;
        console.log(this.currentborderindex);
        switch (this.currentborderindex) {
          case 0: this.SwiperStyle.bds = this.bds + ' none none none'; break;
          case 1: this.SwiperStyle.bds = 'none ' + this.bds + ' none none'; break;
          case 2: this.SwiperStyle.bds = 'none none ' + this.bds + ' none'; break;
          case 3: this.SwiperStyle.bds = 'none none none ' + this.bds; break;
        }
      }
    },
    // 修改边框类型solid/dashed/dotted
    selborderstyle1 (name) {
      this.bds = name;
      this.SwiperStyle.bds = this.bds;
    },
    // 父组件伸缩设置width、height
    setpostion (size) {
      setTimeout(() => {
        this.SwiperStyle.t = size.top;
        this.SwiperStyle.l = size.left;
      }, 100)
    },
    // 父组件伸缩设置width、height
    setWidthHeight (size) {
      this.SwiperStyle.w = size.width;
      this.SwiperStyle.h = size.height;
    },
    // 上传替换图片
    openUploadImagesbtn (index) {
      this.sonindex = index;
      this.updateImageUpload({showUploadimg: true, ImgType: 'swiper'})
    },
    // 删除图片
    delimg (item, index) {
      if (this.SwiperStyle.swiperLists.length <= 1) {
        this.$message.error('当前组件图片不能少于1张！');
        return false;
      }
      this.SwiperStyle.swiperLists.splice(index, 1);
    },
    // 增加图片
    addimg () {
      if (this.SwiperStyle.swiperLists.length >= 20) {
        this.$message.error('当前组件图片不能超过20张！');
        return false;
      }
      this.SwiperStyle.swiperLists.push({tt: '标题', link: '', imgurl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXcAAADICAMAAAAk9VHYAAAAk1BMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ROyVeAAAAMHRSTlMAxbp5t56d+xkK7eniJvW2BNN1bSwUEAHxqIUyINaPi0s23Mqwo5tmV09AlX1iwEbUA1nyAAAC3ElEQVR42uzciXKiQBRA0Sdhhh0XFHejMdHEbP3/XzdZZgIGM2VDt6lY93zCrVcPBBsBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4I9MLt1Vfu9cX6Ou3U9VMuvEFmnaxam7OyGvqx8qEbi7Q0LlWZlwKNOyUIRErXsdCmXIrOF5bKRbNN3CVKb8E9ec9csatkO4Vdru7S19E/LsnulvmqoLXG8q7YEJ3u9xydilM6F5hqbszlEIwp7tNRXdvKWVbuttUdA8HUpakSs9vQZ3uraGU5THdLSq6u7IniNkzFhXd54GUDSK6W1R0TxMpW3l0t8hVH3pSds/9TJnF7rEvhf6I7ja5qtAuNrzf4veqVa4qcRN5N33Nzn2kRa4qCy+XiZ/cbUY8j7TMVZ+MopT3Hl/jfdPPRvej0P1M0P0odD8Tet2j3YLup+/uPUqwpvvJuy9EpB/R/cTdnUBebHlOcNru8UzejOl+yu7pUt4NunS31D17UBUP8s8uZL9b6f7rwDGQm6F86DHvNrrPByJ5S+3pDqTQGTPv5ruPVvIiiVRJOJWy2RXzbrx7Jm+eR+qDt5V9dx7dzXYvFvnj/87QTNgzZruv8+qZMyeQzwKH7ia7h6vq5TNKpCqJ2DMGu2/l1d4vpNFSDrn16G6s+2ZYPUR/IYfd091U925evW8Zd+SwvMt+N9M9nMpnva4vX5mGdDfR3cukojOTr2Uee6Ymt9HE3tC9efd1Lrr8K/ZM0+7hSvQ9p3Rv2P1R6nige7Pum2HN7zXRvUn3dUfqGcy5rjbo7mQX9WQtuvM/vR+D7keh+5lo0/1bXCtTFoLjTdRffD/ypKapMiPme6labpQZPYGO2ZUy4SkQaFmZCN+aCTTN7kPVTDxh2utIssu2U9d4csslFQAAAAAAAAAAAAAAAAAA/GkPDgkAAAAABP1/7QobAAAAAAAAAAAAAAAAAAA8Ap0u2iLpmcUDAAAAAElFTkSuQmCC'});
    }
  }
}
</script>
<style lang="less">
  @sprites: "/client/assets/images/sprites.png";
  .showSwiperstyle .swipercps.style_select{transform:translateX(0);}
  .hidecps .showSwiperstyle.swipercps{transform:translateX(100%);}
  .el-radio + .el-radio {
    margin-left: 10px;
}
.swipercps .selbtn{float: none;
  margin: 0 auto;
  ul{width:320px;
    li{width:30.2% !important;float: left;margin:0 5px 0;overflow: hidden;box-sizing: border-box;}
    img{margin: 0 auto;}
  }
}
 .swipercps .selbtn ul.nextpage {
  transform: translate3d(-320px, 0, 0);
}
.swipercps .cubeimages li{background: #e4e7ed;}
</style>

