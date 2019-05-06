<template>
  <div class="P_select scrollstyle style_select styletype">
    <div class="stylename">风格</div>
    <div class="adminPage flex noborderbottom">
      <a @click="cptpage=0" :class="{'active':cptpage == 0}">主题颜色</a>
      <a @click="cptpage=1" :class="{'active':cptpage == 1}">内页风格</a>
    </div>
    <div id="themeColor" v-if="cptpage == 0">
      <ul>
        <li class="selectarea clearfix" v-for="(item,index) in themeColorList" :key="index">
          <div class="yuansu_name"><span>{{item.title}}</span></div>
          <nav :id="item.id"  class="clearfix">
            <a v-if="item.selcolor" @click="ChooseColor(item,$event,currentcolor)"  v-for="(currentcolor,index1) in item.color" :key="index1" :style="{background: currentcolor}"></a>
            <a v-if="!item.selcolor" :style="{background: windowconfigs.themeColor}"></a>
            <a v-if="!item.selcolor" :style="{background: windowconfigs.themeColorhelp}"></a>
            <em v-if="item.selcolor && index==0"><el-color-picker v-model="windowconfigs.themeColor" :predefine="predefineColors"></el-color-picker><span>{{windowconfigs.themeColor}}</span></em>
            <em v-if="item.selcolor && index==1"><el-color-picker v-model="windowconfigs.themeColorhelp" :predefine="predefineColors"></el-color-picker><span>{{windowconfigs.themeColorhelp}}</span></em>
          </nav>
        </li>
      </ul>
    </div>
    <div class="elcps" v-show="cptpage == 1">
      <ul class="styletitle flex">
        <li v-for="(item,index) in NeiyeStyleList" :key="index" ><a @click="ChooseTitle(item,index)" :class="{'active':isSelect == index}">{{item.name}}</a></li>
      </ul>
      <div >
        <ul id="stylepic"  class="flex stylepic clearfix scrollstyle templatescrollstyle">
          <li @click="ChooseStyle(item)" v-for="(item,index) in NeiyeStyleListData" :key="index" :class="{'active':item.typeCode == type}">
            <img :src="item.image" /><p><span>{{item.name}}</span></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import app from '../../fetch/api.js'
  import $ from 'jquery'
  import { mapState, mapMutations } from 'vuex';

  export default{
    props: {
      isSelect0: 0
    },
    data () {
      return {
        cptpage: this.isShop ? 0 : 1,
        isSelect: 0,
        selindex: '',
        isShop: false,
        windowconfigs: {},
        currentindex: 0,
        predefineColors: [
          '#ff4500', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585', 'rgba(255, 69, 0, 0.68)', 'rgb(255, 120, 0)', 'hsv(51, 100, 98)', 'hsva(120, 40, 94, 0.5)', 'hsl(181, 100%, 37%)', 'hsla(209, 100%, 56%, 0.73)', '#c7158577'
        ],
        themeColorList: [
          {title: '主题色', id: 'theme', selcolor: '#fa541c', color: ['#f5222d', '#4c82e6', '#fa8c16', '#43c523', '#fadb14', '#a0d911']},
          {title: '辅助色', id: 'Auxiliary', selcolor: '#1890ff', color: ['#eb2f96', '#722ed1', '#2f54eb', '#13c2c2']},
          {title: '当前色', id: 'currentcolor', color: ['#eb2f96', '#7e33dc']}
        ],
        NeiyeStyleList: [],
        NeiyeStyleListData: [],
        pageType: {},
        typeCode: [], // 用来存储选中样式每个元素为对象
        type: 0 // 临时用来显示选中样式
      }
    },
    computed: {
      ...mapState({showstate: state => state})
    },
    mounted () {
      $('#stylepic').css('height', document.body.clientHeight - 210);
      // this.isShop = true;
    },
    watch: {
      windowconfigs: {
        // 这监听对象值的改变。
        handler (curVal, oldVal) {
          this.showstate.AllStyle.themeColorhelp = this.windowconfigs.themeColorhelp;
          this.showstate.AllStyle.themeColor = this.windowconfigs.themeColor;
        }
      }
    },
    methods: {
      ...mapMutations(['updateAllStyle']),
      changeCurrentStyle (config) {
        this.windowconfigs = this.showstate.AllStyle;
        this.getStyle();
      },
      ChooseColor (item, event, currentcolor) {
        let ev = event.target;
        let id = item.id;
        $(ev).addClass('active').siblings().removeClass('active');
        if (id === 'theme') {
          this.windowconfigs.themeColor = currentcolor;
          this.updateAllStyle({themeColor: currentcolor});
        } else if (id === 'Auxiliary') {
          this.windowconfigs.themeColorhelp = currentcolor;
          this.updateAllStyle({themeColorhelp: currentcolor});
        }
      },
      ChooseStyle (item) {
        let name = item.typeName;
        let typeCode = item.typeCode;
        this.typeCode[name] = typeCode;
        this.type = typeCode;
      },
      ChooseTitle (item, index) {
        const type = item.type;
        const name = item.name;
        this.isSelect = index;
        let obj = this.pageType;
        for (const key in obj) {
          if (type === key) this.NeiyeStyleListData = obj[key];
        }
        if (this.typeCode[name] !== undefined) {
          this.type = this.typeCode[name]
        } else {
          this.type = 0;
        }
      },
      getStyle () {
        app.getfetch(`/drag/typelist?miniappId=${this.showstate.miniappId}`).then(res => {
          const result = res.data;
          if (result.success) {
            const data = result.data;
            this.NeiyeStyleList = data.typeList;
            const type = this.NeiyeStyleList[0].type;
            this.pageType = data.pageType;
            this.NeiyeStyleListData = this.pageType[type];
          } else {
            this.$message.error('网络连接错误,请重试');
          }
        }).catch(() => {
          this.$message.error('网络连接错误,请重试');
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  @sprites: "/client/assets/images/sprites.png";
  .styletype{position: absolute;top:0;right:0;}
  .el-color-picker--small .el-color-picker__trigger{height:30px;}
  .noborderbottom{border-bottom:none;}
  .elcps{width:100%;background:#fff;border-top: 1px solid #eceef2;
    .styletitle{width:100%;
      li{flex:1;
        a{cursor:pointer;text-align:center;border-radius:5px;border:1px solid #eceef2; display:block;max-width: 80px;margin:20px auto;height:30px;line-height:30px;color:#333;font-size:14px;
          &:hover,&.active{background:#1890ff;color:#fff;}
        }
      }
    }
    #stylepic{overflow:auto;overflow-x:hidden;}
    .stylepic{width:100%;flex-flow: row wrap;
      li{width:50%;float:left;box-sizing: border-box;cursor:pointer;
        img{display:block;width:90%;margin:0 auto;height:300px;border:2px solid #fff;}
        p{width:100%;text-align:center;line-height:40px;height:40px;color:#333;font-size:14px;
          &::before{content:'';display:inline-block;margin-right:5px;width:16px;height:16px;border-radius: 100%;border:3px solid #e3e3e3;box-sizing: border-box;}
          span{position: relative;top:-2px;}
        }
        &.active p:before,&:hover p:before{width:15px;height:15px;border:4px solid #1890ff;}
        &.active img,&:hover img{border:2px solid #1890ff;}
      }
    }
  }
  .style_select{
    width:100%;max-width:400px;transform:translateX(100%);    transition: all .3s ease 0s;    background: #fff;
  }
  .showstyle .style_select{transform:translateX(0);}
  #themeColor{background: #fff;    border-top: 1px solid #eceef2;    padding-bottom: 20px;
    width:100%;
    li{width:100%;
      a{position:relative;float:left;cursor: pointer;width: 30px;height: 30px;margin:0px 5px 0;border:1px solid #fff;box-sizing: border-box;
        &:last-child{width:30px;height:30px; margin-right:0px;
        }
        // &.active {border: 2px solid #1890ff;}
        &.active::after{content:'';position: absolute;top:-2px;left:-2px;width:30px;height:30px;border:1px solid #1890ff;}
      }
      nav{padding-left:20px;box-sizing: border-box;margin-bottom: 10px;
        em{float: left;margin-left:10px;
          a{margin-right:0;position: relative;
            &::before{content:'';display: block;position: absolute;width:1px;background:#eceef2;    top: -1px;left: -12px;height:30px;}
            &::after{content:'';display: block;position: absolute;width:15px;
            background:url('@{sprites}') no-repeat;background-position:-366px -101px; 
            top: 6px;left: 8px;height:15px;}
          }
        }
        span{width:80px;height:30px;border:1px solid #eceef2;border-left:none;box-sizing:border-box;display: inline-block;text-align: center;line-height: 29px;color:#333;font-size: 12px;}
      }
      &.color2 a{width:40px;height:40px;}
      &:last-child{pointer-events: none;}
    }
  }
  .selectarea{
    width:100%;background: #fff;height:100%;flex: 1;overflow: hidden;
    .flex-wrap{transition: all 0.3s ease;height:100%;transform: scale(1);visibility: visible;}
    &.active .flex-wrap{display: none;}
    .yuansu_name{border:none;height: 50px;
      span{line-height: 60px}
    }
    .yuansu_name{cursor: default;
      &::before{content:'';display:none;width:15px;height:15px;margin: 15px;float: right;background: url(/client/assets/images/sprites.png) no-repeat;background-position: -395px -102px;}      
    }
    // &.active .yuansu_name{
    //   &::before{content:'';display:block;width:15px;height:15px;margin: 15px;float: right;background: url(/client/assets/images/sprites.png) no-repeat;background-position: -395px -102px;}      
    // }
  }
  .el-color-picker{float:left;}
  .stylename{width:100%;border-bottom:1px solid #eceef2;height:40px;line-height: 40px;color:#333;font-size: 14px;background: #fff;text-align: center;}
</style>

