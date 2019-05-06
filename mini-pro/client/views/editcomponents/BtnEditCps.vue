<template>
  <div class="btncps style_select">
    <div class="stylename">按钮组件</div>
    <div class="selectbtn clearfix">
      <p>组件样式</p>
      <a class="btn prevpage" @click="btnclick('prev')"></a> 
      <div class="selbtn">
        <ul :class="{'nextpage':nextpage}">
          <li v-for="(item,index) in btnlist" :key="index" @click="selbtn(item,index)" :class="{'active':currentindex == index}"><a :class="item.name">按钮</a></li>
        </ul>
      </div>
      <a class="btn nextpage" @click="btnclick('next')"></a>      
    </div>
    <ul class="btnchangestyle">
      <li><a>按钮文案:</a><el-input class="input1" type="text" v-model="BtnStyle.con" placeholder="请输入内容"></el-input></li>
      <li><a>按钮尺寸:</a>
      <span class="ml10 mr10">宽:</span><el-input type="number" class="widthinput" v-model="BtnStyle.w" min="0" minlength="1" maxlength="3" max="300" placeholder="输入宽度"></el-input>
      <span class="ml10 mr10">高:</span><el-input type="number" class="heightinput" min="0" minlength="1" maxlength="3" max="300" v-model="BtnStyle.h" placeholder="输入高度"></el-input>
      </li>
      <li><a class="fl">按钮字体:</a>
        <el-select class="fl" v-model="BtnStyle.fs"  placeholder="请选择">
          <el-option v-for="item in fontoptions" :key="item.value" :value="item.value"></el-option>
        </el-select>
        <span class="rel fl ml10">
          <el-color-picker v-model="BtnStyle.co" show-alpha   :predefine="predefineColors"></el-color-picker>
          <span class="colorspan">{{BtnStyle.co}}</span>
        </span>
      </li>
      <li>
        <a class="fl">背景颜色:</a>
         <span class="rel fl">
          <el-color-picker v-model="BtnStyle.bgc" show-alpha  :predefine="predefineColors"></el-color-picker>
          <span class="colorspan fl">{{BtnStyle.bgc}}</span>
         </span>
        <!-- <span class="setbtnbg">设置背景图片</span> -->
      </li>
      <li><a>圆角:</a><em class="slidersel"><el-slider  v-model="BtnStyle.bdr" :show-tooltip="false" show-input></el-slider></em></li>
      <li><a>不透明:</a><em class="slidersel"><el-slider max="1" :show-tooltip="false" step="0.1" v-model="BtnStyle.op" show-input></el-slider></em></li>
      <li>
        <a class="fl">边框:</a>
        <nav class="bordernav">
          <a class="fl width46">
            <span class="borderColor" :class="{'active': BtnStyle.bdc == 'none'}" :style="'border:6px '+ BtnStyle.bds + ' ' + BtnStyle.bdc"></span>
            <div class="borderColorsel">
              <el-color-picker v-model="BtnStyle.bdc" :change="ChangeStyle()" show-alpha  :predefine="predefineColors"></el-color-picker>          
            </div>
          </a>
          <a class="fl">
            <el-input class="borderinput" type="number" v-model="BtnStyle.bdw" min="0" max="100"  placeholder="输入"></el-input>
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
      <li><a>是否悬浮:</a>
          <el-radio v-model="isfixed" label="0" >不悬浮</el-radio>
          <el-radio v-model="isfixed" label="1" >根据位置悬浮</el-radio>
      </li>
      <li class="btnlink"><a>链接:</a>
        <el-input class="input1" disabled type="text" v-model="BtnStyle.link" style="width:170px;"></el-input><span @click="setlink">设置链接</span>
        <!-- <el-select v-model="BtnStyle.link" placeholder="请选择链接">
          <el-option v-for="items in pagelist" :key="items.id" :label="items.pageName" :value="items.id"></el-option>
        </el-select> -->
      </li>
    </ul>
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
      currentindex: null,
      currentborderindex: null,
      nextpage: false,
      btnlist: [{name: 'btn1'}, {name: 'btn2'}, {name: 'btn3'}, {name: 'btn4'}],
      isfixed: '0',
      opacity: 0.5,
      BtnStyle: {},
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
    isfixed: {
      handler (curVal, oldVal) {
        this.BtnStyle.isf = this.isfixed !== '0';
      }
    },
    BtnStyle: {
      handler (curVal, oldVal) {
        let containerindex = this.container[this.containerindex];
        if (containerindex) this.$set(containerindex.buttonList, this.curbtnindex, this.BtnStyle)
        // this.setPageData(this.container);
        // console.log('11111')
      }
    }
  },
  methods: {
    ...mapMutations(['setPageData']),
    setlink () {
      this.$parent.getFirstList();
    },
    // 选择按钮模板
    selbtn (item, index) {
      this.currentindex = index;
      this.currentborderindex = null;
      this.BtnStyle.bds = 'solid';
      switch (this.currentindex) {
        case 0: this.BtnStyle.co = 'rgba(255, 255, 255, 1)'; this.BtnStyle.bdc = 'rgb(255, 255, 255)'; this.BtnStyle.bgc = 'rgba(24, 144, 253, 1)'; this.BtnStyle.bdr = 5; break;
        case 1: this.BtnStyle.co = 'rgb(24, 144, 253)'; this.BtnStyle.bdc = 'rgb(24, 144, 253)'; this.BtnStyle.bgc = 'rgb(255, 255, 255)'; this.BtnStyle.bdr = 5; break;
        case 2: this.BtnStyle.co = 'rgba(255, 255, 255, 1)'; this.BtnStyle.bdc = 'rgb(255, 255, 255)'; this.BtnStyle.bgc = 'rgba(24, 144, 253, 1)'; this.BtnStyle.bdr = 20; break;
        case 3: this.BtnStyle.co = 'rgb(24, 144, 253)'; this.BtnStyle.bdc = 'rgb(24, 144, 253)'; this.BtnStyle.bgc = 'rgb(255, 255, 255)'; this.BtnStyle.bdr = 20; break;
      }
    },
    // 按钮swiper切换
    btnclick (e) {
      this.nextpage = false;
      if (e === 'next') this.nextpage = true;
    },
    changeCurrentBtnStyle (item, index1, index) {
      this.containerindex = index;
      this.curbtnindex = index1;
      this.BtnStyle = JSON.parse(JSON.stringify(item));
      this.isfixed = this.BtnStyle.isf ? '1' : '0';
      this.pagelist = JSON.parse(window.sessionStorage.getItem('pagelistinfo'));
    },
    // 统一设置所有自定义属性
    ChangeStyle (item) {
      if (this.BtnStyle.bgc === null) {
        this.BtnStyle.bgc = 'none';
      } else if (this.BtnStyle.bdc === null) {
        this.BtnStyle.bdc = 'none';
        this.BtnStyle.bdw = '0';
      }
    },
    // 修改边框方向
    selborderstyle (item, index) {
      if (this.currentborderindex === index) {
        this.currentborderindex = null;
        // this.BtnStyle.bds = '';
      } else {
        this.currentborderindex = index;
        console.log(this.currentborderindex);
        switch (this.currentborderindex) {
          case 0: this.BtnStyle.bds = this.bds + ' none none none'; break;
          case 1: this.BtnStyle.bds = 'none ' + this.bds + ' none none'; break;
          case 2: this.BtnStyle.bds = 'none none ' + this.bds + ' none'; break;
          case 3: this.BtnStyle.bds = 'none none none ' + this.bds; break;
        }
      }
    },
    // 修改边框类型solid/dashed/dotted
    selborderstyle1 (name) {
      this.bds = name;
      this.BtnStyle.bds = this.bds;
    },
    // 父组件伸缩设置width、height
    setpostion (size) {
      setTimeout(() => {
        this.BtnStyle.t = size.top;
        this.BtnStyle.l = size.left;
      }, 100)
    },
    // 父组件伸缩设置width、height
    setWidthHeight (size) {
      this.BtnStyle.w = size.width;
      this.BtnStyle.h = size.height;
    }
  }
}
</script>
<style lang="less">
  @sprites: "/client/assets/images/sprites.png";
  .bordernav{
    .bordersel{width:60px;position: relative;
      em{content: '';display: block;width: 20px;position: absolute;top:4px;left:5px;height: 20px;background:url('@{sprites}') no-repeat; background-position: -624px -204px;}
      .xuxian{width:30px;height: 20px;background:url('@{sprites}') no-repeat;background-position: 4px -210px;}
      .dotted{width:100%;height: 20px;background:url('@{sprites}') no-repeat;background-position: -508px -210px;
        &.active{background-position:-430px -210px;}
      }
      .dashed{width:100%;height: 20px;background:url('@{sprites}') no-repeat;background-position: -352px  -210px;
        &.active{background-position:-274px -210px;}
      }
      .solid{width:100%;height: 20px;background:url('@{sprites}') no-repeat;background-position: -196px -210px;
        &.active{background-position:-118px -210px;}
      }
      .selsolid{width: 100%;height: 60px;position: absolute;top: 29px; background: #fff; z-index: 1;display:none;
        span{display: block;}
      }
      &:hover .selsolid{display: block;}
      i{content: '';transition: all 0.3s ease;display: block;width: 15px;position: absolute;top:7px;right:5px;height: 15px;background:url('@{sprites}') no-repeat; background-position: -395px -102px;}
      &:hover i{background-position: -310px -102px;}
      ul{width:80px;height:80px;position: absolute;top:29px;padding: 10px 10px 20px;left:-20px;display: none;    z-index: 10;padding-top:5px;background:#fff;
        li:nth-child(1){width:80px;height:14px;background:url(/client/assets/images/border.png) no-repeat;position: absolute;top:5px;left:10px;}
        li:nth-child(2){transform:rotate(90deg);width:80px;height:14px;background:url(/client/assets/images/border.png) no-repeat;position: absolute;top:45px;right:-30px;}
        li:nth-child(3){width:80px;height:14px;background:url(/client/assets/images/border.png) no-repeat;position: absolute;bottom:5px;left:10px;}
        li:nth-child(4){transform:rotate(90deg);width:80px;height:14px;background:url(/client/assets/images/border.png) no-repeat;position: absolute;top:45px;left:-30px;}
        li{margin:0 !important;padding:0 !important;
          &.active{background:url(/client/assets/images/borderhover.png) no-repeat;}
        }
        box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
      }
      &:hover ul{display: block;}
    }
    a{border:1px solid #ccc;cursor:pointer;position:relative;padding: 0 !important;margin:0 7px;padding:5px;width:60px;height:30px;box-sizing: border-box;
      .borderColor{display:block;margin: 3.5px auto; width: 18px;height: 8px;background:#ebeef5;position: relative;
      border:6px solid rgb(255, 255, 255);
        &::before{content:'';width:28px;height:18px;position: absolute;top:-6px;left:-6px;border:1px solid #cccccc;}        
        &.active{background: none;background:url('@{sprites}') no-repeat;background-position: -581px -204px;width: 30px;height:20px;border:none !important;
          &::before{display: none;}
        }
      }
    }
    .el-input__inner.el-input__inner{height:25px;height: 25px;
      position: relative; top: -3px;border: none;text-align: center; width: 35px; padding: 0;
    }
    .borderpx{    font-size: 12px;
      position: absolute;
      top: 5px;
      right: 7px;
    }
    .width46{width:40px;}
    .borderColorsel{position: absolute;top:0;left:0;width:100%;opacity: 0;
     .el-color-picker.el-color-picker--small{width:100%;}
     .el-color-picker--small .el-color-picker__trigger{width:100%;}
    }
  }
  .showBtnStyle .btncps.style_select{transform:translateX(0);}
  .hidecps .showBtnStyle.btncps{transform:translateX(100%);}
  .el-radio + .el-radio {
    margin-left: 10px;
}
  .btnlink span{color:#333;font-size: 12px;display: inline-block;margin-left:10px;cursor: pointer;}

</style>

