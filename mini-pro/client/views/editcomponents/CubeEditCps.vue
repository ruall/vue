<template>
  <div class="cubecps style_select">
    <div class="stylename">魔方导航组件</div>
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
            <li @click="selstyleimg('sort2')" :class="{'active': CubeStyle.classnm == 'sort2'}"><img src="/client/assets/images/mofdh_a.png" /></li>
            <li @click="selstyleimg('sort1')" :class="{'active': CubeStyle.classnm == 'sort1'}"><img src="/client/assets/images/mofdh_b.png" /></li>      
            <li @click="selstyleimg('sort3')" :class="{'active': CubeStyle.classnm == 'sort3'}"><img src="/client/assets/images/mofdh_c.png" /></li>
          </ul>
        </div>
        <!-- <a class="btn nextpage" @click="btnclick('next')"></a> -->
      </div>
      <ul class="cubeimages flex-wrap">
        <li v-for="(item,index) in CubeStyle.cubeLists" @click="openUploadImagesbtn(index)" :key="index" :class="{'active': sonindex == index}"><img :src="item.imgurl"/><span @click.stop="delimg(item,index)"></span></li>
        <li class="addcubeimg" @click="addimg()" v-if="CubeStyle.cubeLists && CubeStyle.cubeLists.length < 20"></li>
      </ul>
      <p class="tuijian">最佳尺寸：50*50</p>
      <ul class="btnchangestyle">
        <li><a>标题:</a><el-input class="input1" type="text" v-model="cubetitle.tt" placeholder="请输入内容"></el-input></li>
        <li class="btnlink"><a>链接:</a>
          <el-select v-model="cubetitle.link" placeholder="请选择链接">
            <el-option v-for="items in pagelist" :key="items.id" :label="items.pageName" :value="items.id"></el-option>
          </el-select>
        </li>
      </ul>
    </div>
    <div v-show="cptpage == 1">
      <ul class="btnchangestyle">
        <li><a class="fl">文字设置:</a>
          <el-select class="fl" v-model="CubeStyle.fs"  placeholder="请选择">
            <el-option v-for="item in fontoptions" :key="item.value" :value="item.value"></el-option>
          </el-select>
          <span class="rel fl ml10">
            <el-color-picker v-model="CubeStyle.co" show-alpha :predefine="predefineColors"></el-color-picker>
            <span class="colorspan">{{CubeStyle.co}}</span>
          </span>
        </li>
        <li>
          <a class="fl">背景颜色:</a>
          <span class="rel fl">
            <el-color-picker v-model="CubeStyle.bgc" show-alpha :predefine="predefineColors"></el-color-picker>
            <span class="colorspan fl">{{CubeStyle.bgc}}</span>
          </span>
        </li>
        <li><a>不透明:</a><em class="slidersel"><el-slider v-model="CubeStyle.op" max="1" step="0.1" :show-tooltip="false" show-input></el-slider></em></li>
        <li>
          <a class="fl">边框:</a>
          <nav class="bordernav"> 
            <a class="fl width46">
              <span class="borderColor" :class="{'active': CubeStyle.bdc == 'none'}" :style="'border:6px '+ CubeStyle.bds + ' ' + CubeStyle.bdc"></span>
              <div class="borderColorsel">
                <el-color-picker v-model="CubeStyle.bdc" :change="ChangeStyle()" show-alpha  :predefine="predefineColors"></el-color-picker>
              </div>
            </a>
            <a class="fl">
              <el-input class="borderinput" type="number" v-model="CubeStyle.bdw" min="0" max="100"  placeholder="输入"></el-input>
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
import app from '../../fetch/api.js'
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
      cubetitle: {},
      btnlist: [{name: 'btn1'}, {name: 'btn2'}, {name: 'btn3'}, {name: 'btn4'}],
      isfixed: '0',
      sonindex: 0,
      CubeStyle: {},
      // CubeStyleInit: [{bds: 'solid'}, {t: '0'}, {l: '0'}],
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
      // console.log('CurrentCubeImageUrl')
      return this.showstate.CurrentCubeImageUrl;
    }
  },
  watch: {
    getcurrentImages (val) {
      console.log('当前图片地址是：' + val)
      if (this.showstate.Uploadimginfo.ImgType === 'cube') {
        this.CubeStyle.cubeLists[this.sonindex].imgurl = val;
        // this.cubetitle.imgurl = val;
      }
    },
    CubeStyle: {
      // 这监听对象值的改变。
      handler (curVal, oldVal) {
        // console.log(this.curbtnindex, this.sonindex)
        let containerindex = this.container[this.containerindex];
        if (containerindex) this.$set(containerindex.cubeList, this.curbtnindex, curVal)
        if (containerindex) this.$set(containerindex.cubeList[this.curbtnindex].cubeLists, this.sonindex, this.cubetitle)
      }
    }
  },
  methods: {
    ...mapMutations(['updateImageUpload']),
    // 选择图片模板
    selstyleimg (classname) {
      this.CubeStyle.classnm = classname;
      console.log(this.CubeStyle)
    },
    // 按钮swiper切换
    btnclick (e) {
      this.nextpage = false;
      if (e === 'next') this.nextpage = true;
    },
    changeCurrentCubeStyle (item, index1, index, item2, index2) {
      this.containerindex = index;
      this.curbtnindex = index1;
      this.cubetitle = item2;
      this.sonindex = index2;
      this.CubeStyle = JSON.parse(JSON.stringify(item));
      let pagelistinfo = JSON.parse(window.sessionStorage.getItem('pagelistinfo'));
      if (!pagelistinfo) {
        app.getfetch('/page/getlist/' + this.showstate.miniappId).then((res) => {
          this.pagelist = res.data.data.pageList;
          console.log(this.pagelist)
          window.sessionStorage.setItem('pagelistinfo', JSON.stringify(this.pagelist));
        }).catch(() => {
          this.$message.error('获取页面管理数据失败！');
        })
      } else {
        this.pagelist = pagelistinfo;
      }
    },
    // 统一设置所有自定义属性
    ChangeStyle (item) {
      if (this.CubeStyle.bgc === null) {
        this.CubeStyle.bgc = 'none';
      } else if (this.CubeStyle.bdc === null) {
        this.CubeStyle.bdc = 'none';
        this.CubeStyle.bdw = '1';
      }
    },
    // 修改边框方向
    selborderstyle (item, index) {
      if (this.currentborderindex === index) {
        this.currentborderindex = null;
        // this.CubeStyle.bds = '';
      } else {
        this.currentborderindex = index;
        console.log(this.currentborderindex);
        switch (this.currentborderindex) {
          case 0: this.CubeStyle.bds = this.bds + ' none none none'; break;
          case 1: this.CubeStyle.bds = 'none ' + this.bds + ' none none'; break;
          case 2: this.CubeStyle.bds = 'none none ' + this.bds + ' none'; break;
          case 3: this.CubeStyle.bds = 'none none none ' + this.bds; break;
        }
      }
    },
    // 修改边框类型solid/dashed/dotted
    selborderstyle1 (name) {
      this.bds = name;
      this.CubeStyle.bds = this.bds;
    },
    // 父组件伸缩设置width、height
    setpostion (size) {
      setTimeout(() => {
        console.log(size.top)
        this.CubeStyle.t = size.top;
        // this.CubeStyle.l = size.left;
      }, 100)
    },
    // 上传替换图片
    openUploadImagesbtn (index) {
      this.sonindex = index;
      this.updateImageUpload({showUploadimg: true, ImgType: 'cube'})
      // this.updateCubeImageUpload({})
    },
    // 删除图片
    delimg (item, index) {
      if (this.CubeStyle.cubeLists.length <= 1) {
        this.$message.error('当前组件图片不能少于1张！');
        return false;
      }
      this.CubeStyle.cubeLists.splice(index, 1);
    },
    // 增加图片
    addimg () {
      if (this.CubeStyle.cubeLists.length >= 20) {
        this.$message.error('当前魔方导航图片不能超过20张！');
        return false;
      }
      this.CubeStyle.cubeLists.push({tt: '标题', link: '', imgurl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA0BAMAAAAtauZWAAAAKlBMVEX////5+fvk5uzf4un19vjm6O3c3+bo6u/d3+bw8fT29/n7+/zt7vLy8/aZcG/FAAAA4UlEQVQ4y2MY9mC5cQhOOV6ztOQJuCRF2wUPq+CSvBzIsN0Sl+Tk0ww8OaTqRNhJlmsZlgL9OQrQANcRPJKLkhxwa1TrUMGtMfV6kwNOjYGMFSo4NQowiMO0YmpkYEBoxdTIgEMrC0gjklZBZEknkEaEVsbgCegaEVqXplmiaURo5QpTNZ6AqhGhdWnq6sOWKBoRWrnCohg4QVoRGhFal6YuAOYWS6jGdpBGhNbiKCAF1cqiUQiiEFo1gWphWhEaEQ6GaMXQiAimybZAT4VDNSK0QiQ5ZwOJ3egBzb2BYUgCAM+SOhUAf4qNAAAAAElFTkSuQmCC'});
    }
  }
}
</script>
<style lang="less">
  @sprites: "/client/assets/images/sprites.png";
  .showCubestyle .cubecps.style_select{transform:translateX(0);}
  .hidecps .showCubestyle.cubecps{transform:translateX(100%);}
  .el-radio + .el-radio {
    margin-left: 10px;
}
.cubecps .selbtn{float: none;
  margin: 0 auto;
  ul{width:320px;
    li{width:30.2% !important;float: left;margin:0 5px 0;overflow: hidden;box-sizing: border-box;}
    img{margin: 0 auto;}
  }
}
 .cubecps .selbtn ul.nextpage {
  transform: translate3d(-320px, 0, 0);
}
.cubeimages{
  width:380px;margin:0 auto;
  li{width:20%;border:1px solid #dee1e8;box-sizing: border-box;margin:10px 7px 0;cursor: pointer;position: relative;
    img{display: block;margin:0px auto;padding:10px;width:50px;height:50px;}
    &::after{content:'';width:20px;height:20px;position: absolute;bottom:0;right:0;display: none;
      background: url('/client/assets/images/icon_cpdh_bianjb.png') no-repeat  #1890ff;background-position:center;
    }
    span{    width: 17px;
    height: 15px;
    position: absolute;
    top: -7px;
    right: -7px;display: none;
    background: url(/client/assets/images/sprites.png) no-repeat;
    background-position: -773px -207px;}
    &:hover,&.active {border:1px solid #1890ff;
      &::after,span{display: block;}
    }
    &.addcubeimg{
      &::before{content:'';display:block;width:50px;height:50px;background: url(/client/assets/images/sprites.png) no-repeat;background-position: -771px -131px;margin: 10px auto;
      }
      &:hover::before{background-position: -822px -131px;}
      &::after, span{display: none !important;}
    }
  }
}
.tuijian{    line-height: 35px;
    padding-left: 20px;
    margin-top: 10px;
    font-size: 12px;}
</style>

