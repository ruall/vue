<template>
  <div class="titlecps style_select">
    <div class="stylename">标题组件</div>
    <div class="selectbtn clearfix">
      <p>组件样式</p>
      <a class="btn prevpage" @click="btnclick('prev')"></a> 
      <div class="selbtn">
        <!-- <ul :class="{'nextpage':nextpage}">
          <li v-for="(item,index) in titlelist" :key="index" @click="selbtn(item,index)" :class="{'active':currentindex == index}"></li>
        </ul> -->
        <ul :class="{'nextpage':nextpage}">
          <li @click="selstyleimg('title1')" :class="{'active': TitleStyle.classnm == 'title1'}"><img src="/client/assets/images/btyangshi_a.png" /></li>
          <li @click="selstyleimg('title2')" :class="{'active': TitleStyle.classnm == 'title2'}"><img src="/client/assets/images/btyangshi_b.png" /></li>      
          <li @click="selstyleimg('title3')" :class="{'active': TitleStyle.classnm == 'title3'}"><img src="/client/assets/images/btyangshi_c.png" /></li>
        </ul>
      </div> 
      <a class="btn nextpage" @click="btnclick('next')"></a>      
    </div>
    <ul class="btnchangestyle">
      <li><a>标题内容</a><el-input class="input1" v-model="TitleStyle.text[0].con" placeholder="请输入内容"></el-input></li>
      <li><a>标题高度</a>
      <span class="ml10 mr10">高:</span><el-input type="number" class="heightinput" min="0" minlength="1" maxlength="3" max="300" v-model="TitleStyle.h" placeholder="输入高度"></el-input>
      </li>
      <li><a class="fl">文本设置</a>
        <el-select class="fl" v-model="TitleStyle.fs"  placeholder="请选择">
          <el-option v-for="item in fontoptions" :key="item.value" :value="item.value"></el-option>
        </el-select>
        <span class="rel fl ml10">
          <el-color-picker v-model="TitleStyle.co" show-alpha   :predefine="predefineColors"></el-color-picker>
          <span class="colorspan">{{TitleStyle.co}}</span>
        </span>
      </li>
      <li>
        <a class="fl">图标颜色</a>
         <span class="rel fl">
          <el-color-picker v-model="TitleStyle.text[0].bgc" show-alpha  :predefine="predefineColors"></el-color-picker>
          <span class="colorspan fl">{{TitleStyle.text[0].bgc}}</span>
         </span>
        <!-- <span class="setbtnbg">设置背景图片</span> -->
      </li>
      <li>
        <a class="fl">背景颜色</a>
         <span class="rel fl">
          <el-color-picker v-model="TitleStyle.bgc" show-alpha  :predefine="predefineColors"></el-color-picker>
          <span class="colorspan fl">{{TitleStyle.bgc}}</span>
         </span>
        <span class="setbtnbg"  @click="openUploadImagesbtn()">设置背景图片</span>
      </li>
      <li><a>圆角</a><em class="slidersel"><el-slider  v-model="TitleStyle.bdr" :show-tooltip="false" show-input></el-slider></em></li>
      <li><a>透明</a><em class="slidersel"><el-slider v-model="TitleStyle.op" :show-tooltip="false" step="0.1" max="1"  show-input></el-slider></em></li>
      <li>
        <a class="fl">边框</a>
        <nav class="bordernav">
          <a class="fl width46">
            <span class="borderColor" :class="{'active': TitleStyle.bdc == 'none'}" :style="'border:6px '+ TitleStyle.bds + ' ' + TitleStyle.bdc"></span>
            <div class="borderColorsel">
              <el-color-picker v-model="TitleStyle.bdc" :change="ChangeStyle()" show-alpha  :predefine="predefineColors"></el-color-picker>          
            </div>
          </a>
          <a class="fl">
            <el-input class="borderinput" type="number" v-model="TitleStyle.bdw" min="0" max="100"  placeholder="输入"></el-input>
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
      <li><a>显示更多</a>
          <el-radio v-model="isshowmore" label="0">显示</el-radio>
          <el-radio v-model="isshowmore" label="1">隐藏</el-radio>
      </li>
      <li class="btnlink"><a>链接</a>
        <el-select v-model="TitleStyle.link" placeholder="链接类型" >
          <el-option v-for="item in linklist" :key="item.value" :value="item.value" ></el-option>
        </el-select>
      </li>
    </ul>
  </div>
</template>
<script>
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
      titlelist: [{name: 'btn1'}, {name: 'btn2'}, {name: 'btn3'}, {name: 'btn4'}],
      isshowmore: '0',
      TitleStyle: {text: [{}]},
      fontoptions: [
        {value: '12'}, {value: '13'}, {value: '14'}, {value: '15'}, {value: '16'}, {value: '17'}, {value: '18'}, {value: '19'}, {value: '20'}, {value: '24'}, {value: '30'}, {value: '48'}, {value: '60'}, {value: '72'}, {value: '84'}, {value: '96'}, {value: '108'}, {value: '120'}
      ],
      borderlist: ['top', 'right', 'bottom', 'left'],
      linklist: [
        {value: '选项1'}, {value: '选项1'}, {value: '选项1'}, {value: '选项1'}
      ]
    }
  },
  computed: {
    ...mapState({showstate: state => state}),
    getcurrentImages () {
      return this.showstate.Uploadimginfo.CurrentImageUrl;
    }
  },
  watch: {
    getcurrentImages (val) {
      this.TitleStyle.bg = val;
    },
    isshowmore: {
      handler (curVal, oldVal) {
        this.TitleStyle.showmore = curVal;
        console.log(this.TitleStyle.showmore)
      }
    },
    TitleStyle: {
      // 这监听对象值的改变 和上面的不一样。
      handler (curVal, oldVal) {
        let containerindex = this.container[this.containerindex];
        if (containerindex) this.$set(containerindex.titleList, this.curbtnindex, this.TitleStyle)
      }
    }
  },
  methods: {
    ...mapMutations(['updateImageUpload']),
    // 选择标题模板
    selstyleimg (classname) {
      this.TitleStyle.classnm = classname;
    },
    // 按钮swiper切换
    btnclick (e) {
      this.nextpage = false;
      if (e === 'next') this.nextpage = true;
    },
    changeCurrentTitleStyle (item, index1, index) {
      this.containerindex = index;
      this.curbtnindex = index1;
      this.TitleStyle = JSON.parse(JSON.stringify(item));
      this.isshowmore = this.TitleStyle.showmore;
      console.log(this.isshowmore)
    },
    // 统一设置所有自定义属性
    ChangeStyle (item) {
      if (this.TitleStyle.bgc === null) {
        this.TitleStyle.bgc = 'none';
      } else if (this.TitleStyle.bdc === null) {
        this.TitleStyle.bdc = 'none';
        this.TitleStyle.bdw = '0';
      }
    },
    // 修改边框方向
    selborderstyle (item, index) {
      if (this.currentborderindex === index) {
        this.currentborderindex = null;
        // this.TitleStyle.borderStyle = '';
      } else {
        this.currentborderindex = index;
        console.log(this.currentborderindex);
        switch (this.currentborderindex) {
          case 0: this.TitleStyle.bds = this.bds + ' none none none'; break;
          case 1: this.TitleStyle.bds = 'none ' + this.bds + ' none none'; break;
          case 2: this.TitleStyle.bds = 'none none ' + this.bds + ' none'; break;
          case 3: this.TitleStyle.bds = 'none none none ' + this.bds; break;
        }
      }
    },
    // 修改边框类型solid/dashed/dotted
    selborderstyle1 (name) {
      this.bds = name;
      this.TitleStyle.bds = this.bds;
    },
    // 父组件伸缩设置width、height
    setpostion (size) {
      setTimeout(() => {
        this.TitleStyle.t = size.top;
        this.TitleStyle.l = size.left;
      }, 100)
    },
    // 父组件伸缩设置width、height
    setWidthHeight (size) {
      this.TitleStyle.w = size.width;
      this.TitleStyle.h = size.height;
    },
    openUploadImagesbtn () {
      this.updateImageUpload({showUploadimg: true, CurrentImageUrl: this.showstate.Uploadimginfo.CurrentImageUrl})
    }
  }
}
</script>
<style lang="less">
  // @sprites: "/client/assets/images/sprites.png";
  .showTitlestyle .titlecps.style_select{transform:translateX(0);}
  .hidecps .showTitlestyle.titlecps{transform:translateX(100%);}
  .el-radio + .el-radio {
    margin-left: 10px;
  }
  .titlecps .selbtn ul{width:650px;
    li:nth-child(1){width:23% !important;margin:0 5px;img{margin:15px auto;width:148px;}}
    li:nth-child(2){width:23% !important;margin:0 5px;img{margin:15px auto;width:148px;}}
    li:nth-child(3){width:318px !important;margin:0;img{margin:0px auto;width: 95%;}}
  }
  .titlecps .selbtn ul.nextpage {
    transform: translate3d(-323px, 0, 0);
  }
</style>

