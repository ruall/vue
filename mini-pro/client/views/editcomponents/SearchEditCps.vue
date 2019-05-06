<template>
  <div class="searchcps style_select">
    <div class="stylename">搜索组件</div>
    <div class="selectbtn clearfix">
      <p>组件样式</p>
      <a class="btn prevpage" @click="btnclick('prev')"></a> 
      <div class="selbtn">
        <ul :class="{'nextpage':nextpage}">
          <li @click="selstyleimg('search1')" :class="{'active': SearchStyle.classnm == 'search1'}"><img src="/client/assets/images/sousuo_c.png" /></li>
          <li @click="selstyleimg('search2')" :class="{'active': SearchStyle.classnm == 'search2'}"><img src="/client/assets/images/sousuo_b.png" /></li>      
          <li @click="selstyleimg('search3')" :class="{'active': SearchStyle.classnm == 'search3'}"><img src="/client/assets/images/sousuo_a.png" /></li>
        </ul>
      </div>
      <a class="btn nextpage" @click="btnclick('next')"></a>      
    </div>
    <ul class="btnchangestyle">
      <li><a>搜索提示:</a><el-input class="input1" type="text" v-model="SearchStyle.place" placeholder="请输入内容"></el-input></li>
      <li><a>搜索尺寸:</a>
      <span class="mr10">宽:</span><el-input type="number" class="widthinput" v-model="SearchStyle.w" min="0" minlength="1" maxlength="3" max="370" placeholder="输入宽度"></el-input>
      <span class="ml10 mr10">高:</span><el-input type="number" class="heightinput" min="0" minlength="1" maxlength="3" v-model="SearchStyle.h" placeholder="输入高度"></el-input>
      </li>
      <li><a class="fl">文本设置:</a>
        <el-select class="fl" v-model="SearchStyle.fs"  placeholder="请选择">
          <el-option v-for="item in fontoptions" :key="item.value" :value="item.value"></el-option>
        </el-select>
        <span class="rel fl ml10">
          <el-color-picker v-model="SearchStyle.co" show-alpha   :predefine="predefineColors"></el-color-picker>
          <span class="colorspan">{{SearchStyle.co}}</span>
        </span>
      </li>
      <li><a class="fl">图标设置:</a>
        <span class="rel fl">
          <el-color-picker v-model="SearchStyle.icobg"  :predefine="predefineColors"></el-color-picker>
          <span class="colorspan">{{SearchStyle.icobg}}</span>
        </span>
      </li>
      <li>
        <a class="fl">背景颜色:</a>
         <span class="rel fl">
          <el-color-picker v-model="SearchStyle.bgc" show-alpha  :predefine="predefineColors"></el-color-picker>
          <span class="colorspan fl">{{SearchStyle.bgc}}</span>
         </span>
      </li>
      <li><a>圆角:</a><em class="slidersel"><el-slider  v-model="SearchStyle.bdr" :show-tooltip="false" show-input></el-slider></em></li>
      <li><a>透明</a><em class="slidersel"><el-slider v-model="SearchStyle.op" :show-tooltip="false" step="0.1" max="1"  show-input></el-slider></em></li>
      <li>
        <a class="fl">边框:</a>
        <nav class="bordernav">
          <a class="fl width46">
            <span class="borderColor" :class="{'active': SearchStyle.bdc == 'none'}" :style="'border:6px '+ SearchStyle.bds + ' ' + SearchStyle.bdc"></span>
            <div class="borderColorsel">
              <el-color-picker v-model="SearchStyle.bdc" :change="ChangeStyle()" show-alpha  :predefine="predefineColors"></el-color-picker>          
            </div>
          </a>
          <a class="fl">
            <el-input class="borderinput" type="number" v-model="SearchStyle.bdw" min="0" max="100"  placeholder="输入"></el-input>
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
      <li class="btnlink"><a>链接:</a>
        <el-select v-model="SearchStyle.link" placeholder="请选择链接">
          <el-option v-for="items in pagelist" :key="items.id" :label="items.pageName" :value="items.id"></el-option>
        </el-select>
      </li>
    </ul>
  </div>
</template>
<script>
// import app from '../../fetch/api.js'
import { mapState } from 'vuex';
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
      btnlist: [{name: 'btn1'}, {name: 'btn2'}, {name: 'btn3'}, {name: 'btn4'}],
      isfixed: '0',
      SearchStyle: {},
      // SearchStyleInit: [{bds: 'solid'}, {t: '0'}, {l: '0'}],
      fontoptions: [
        {value: '12'}, {value: '13'}, {value: '14'}, {value: '15'}, {value: '16'}, {value: '17'}, {value: '18'}, {value: '19'}, {value: '20'}, {value: '24'}, {value: '30'}, {value: '48'}, {value: '60'}, {value: '72'}, {value: '84'}, {value: '96'}, {value: '108'}, {value: '120'}
      ],
      borderlist: ['top', 'right', 'bottom', 'left'],
      pagelist: []
    }
  },
  computed: {
    ...mapState({showstate: state => state})
  },
  watch: {
    // isfixed: {
    //   // 这监听对象值的改变
    //   handler (curVal, oldVal) {
    //     this.SearchStyle.isf = this.isfixed !== '0';
    //   }
    // },
    SearchStyle: {
      // 这监听对象值的改变 和上面的不一样。
      handler (curVal, oldVal) {
        let containerindex = this.container[this.containerindex];
        if (containerindex) this.$set(containerindex.searchList, this.curbtnindex, this.SearchStyle)
      }
    }
  },
  methods: {
    // 选择图片模板
    selstyleimg (classname) {
      this.SearchStyle.classnm = classname;
    },
    // 按钮swiper切换
    btnclick (e) {
      this.nextpage = false;
      if (e === 'next') this.nextpage = true;
    },
    changeCurrentSearchStyle (item, index1, index) {
      this.containerindex = index;
      this.curbtnindex = index1;
      this.SearchStyle = JSON.parse(JSON.stringify(item));
      this.pagelist = JSON.parse(window.sessionStorage.getItem('pagelistinfo'));
    },
    ChangeOpacityStyle () {
      // this.SearchStyle.opacity = this.opacity / 100
    },
    // 统一设置所有自定义属性
    ChangeStyle (item) {
      if (this.SearchStyle.bgc === null) {
        this.SearchStyle.bgc = 'none';
      } else if (this.SearchStyle.bdc === null) {
        this.SearchStyle.bdc = 'none';
        this.SearchStyle.bdw = '0';
      }
    },
    // 修改边框方向
    selborderstyle (item, index) {
      if (this.currentborderindex === index) {
        this.currentborderindex = null;
        // this.SearchStyle.bds = '';
      } else {
        this.currentborderindex = index;
        console.log(this.currentborderindex);
        switch (this.currentborderindex) {
          case 0: this.SearchStyle.bds = this.bds + ' none none none'; break;
          case 1: this.SearchStyle.bds = 'none ' + this.bds + ' none none'; break;
          case 2: this.SearchStyle.bds = 'none none ' + this.bds + ' none'; break;
          case 3: this.SearchStyle.bds = 'none none none ' + this.bds; break;
        }
      }
    },
    // 修改边框类型solid/dashed/dotted
    selborderstyle1 (name) {
      this.bds = name;
      this.SearchStyle.bds = this.bds;
    },
    // 父组件伸缩设置width、height
    setpostion (size) {
      setTimeout(() => {
        this.SearchStyle.t = size.top;
        this.SearchStyle.l = size.left;
      }, 100)
    },
    // 父组件伸缩设置width、height
    setWidthHeight (size) {
      this.SearchStyle.w = size.width;
      this.SearchStyle.h = size.height;
    }
  }
}
</script>
<style lang="less">
  @sprites: "/client/assets/images/sprites.png";
  .showSearchstyle .searchcps.style_select{transform:translateX(0);}
  .hidecps .showSearchstyle.searchcps{transform:translateX(100%);}
  .el-radio + .el-radio {
    margin-left: 10px;
}
.searchcps .selbtn ul{width:650px;
  li:nth-child(1){width:23% !important;margin:0 5px;img{margin:15px auto;width:148px;}}
  li:nth-child(2){width:23% !important;margin:0 5px;img{margin:15px auto;width:148px;}}
  li:nth-child(3){width:318px !important;margin:0;img{margin:0px auto;width: 95%;}}
 }
 .searchcps .selbtn ul.nextpage {
  transform: translate3d(-323px, 0, 0);
}

  //2018-7-27

</style>

