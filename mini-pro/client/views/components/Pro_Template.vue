<template>
  <div class="bodybg">
    <AllIndustries v-if="AllIndustries" @DragIndustries="DragIndustries" @getCode="getCode" :industryType="Templatedata.industryType"></AllIndustries>
    <transition name="fade">
      <Preview v-if="PreviewShow" @DragPreview="DragPreview" :Previewitem="Previewitem"></Preview>
    </transition>
    <header>
      <div class="container">
        <a class='head-toptray-logo clearfix' @click="GobackApp()" v-if="!showbackbtn"></a>
        <a title="返回小程序编辑" @click="GobackApp()" href="javascript:;" v-if="showbackbtn">
          <span>返回小程序编辑</span>
        </a>
        <div class="search">
          <input type="text" placeholder="请输入关键字" id="searchs" @keyup="searchs" />
          <span class="searchbtn" @click='searchs'></span>
        </div>
      </div>
    </header>
    <div class="container allstyle">
      <div class="allstyle_title">
        <span class="allIndustries" @click="AllIndustries=true">全部行业</span>
        <span>最新行业:</span>
      </div>
      <ul class="selectstyle clearfix">
        <li v-for="(item,index) in DataList" :key="index" @click="ChooseIndex(item,index)" :class="{selected:code===item.code}">{{item.name}}</li>
      </ul>
    </div>
    <div id="templateul" class="scrollstyle templatescrollstyle">
      <div class="allstyle">
        <ul class="template clearfix">
          <li @click="AddEmptyTemplate()" class="AddTemplate">
            <div class="addmaskbtn">
              <span></span>
              <p>新建空白模板</p>
            </div>
          </li>
          <li class="" v-for="(item,index) in tplList" :key="index"  @click="Preview(item)">
            <img :src="showstate.imageUrl + item.image" />
            <div class="mask">
              <div class="qrcode">
                <p>请使用微信扫一扫预览模板</p>
                <!-- <img :src="item.wechatimg" /> -->
                <img :src="item.qrImage" />
                <span>预览</span>
              </div>
            </div>
          </li>
          <li class="AddTemplate qidai">
            <div class="addmaskbtn">
              <span></span>
              <p>敬请期待</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import app from '../../fetch/api.js'
import AllIndustries from './Pop-ups/AllIndustries'
import Preview from './Pop-ups/Preview'
import { mapState, mapMutations } from 'vuex';
export default {
  components: {
    AllIndustries,
    Preview
  },
  props: {
    NavigationList: {
      type: Array,
      require: true
    },
    showbackbtn: Boolean,
    isSelect: 0
  },
  computed: {
    ...mapState({ showstate: state => state })
  },
  data () {
    return {
      PreviewShow: false,
      AllIndustries: false,
      Templatedata: {},
      DataList: [],
      MoudleListData: [], // 储存所有模板
      tplList: [], // 储存条件筛选后的模板
      code: '' // 储存模板类型
    }
  },
  mounted () {
    $('#templateul').css('height', document.body.clientHeight - 95);
    $('#contentmain').css('height', document.body.clientHeight - 44);
    this.loadtemplate();
    // window.onbeforeunload( () => {
    //     alert("您确定离开该网页吗？");
    // })
  },
  methods: {
    ...mapMutations(['setMiniappId']),
    ...mapMutations(['updateLoadingStatus']),
    // 加载模板数据
    loadtemplate () {
      let Templatedata = JSON.parse(window.sessionStorage.getItem('Templatedata'));
      // console.log(Templatedata)
      let miniappId = parseInt(window.sessionStorage.getItem('miniappId'));
      // 如果没有miniappId就去获取miniappId
      // if (this.showstate.miniappId) {
      //   this.getTemplatedata(Templatedata);
      // } else {
      app.postfetch('/initApp').then((res) => {
        this.setMiniappId(res.data.data.miniappId);
        // 判断当前登录用户appid是否和上一次登录用户appid是否相同
        if (miniappId !== res.data.data.miniappId) {
          console.log(miniappId, res.data.data.miniappId)
          // window.sessionStorage.removeItem('Templatedata');
          // 不一致就清楚缓存信息
          window.sessionStorage.clear();
          console.log('0000')
          this.getTemplatedata(Templatedata);
        } else {
          // 默认新用户进入模板选择页面
          if (Templatedata && Templatedata.hasTemplate) {
          // this.tplList = Templatedata.industryTypeTop;
            // 已选择模板进入初始化页面
            this.$emit('getindexdata');
            this.tplList = this.MoudleListData = Templatedata.templateInfos;
          } else {
            this.getTemplatedata(Templatedata);
          }
        }
        window.sessionStorage.setItem('miniappId', res.data.data.miniappId);
      }).catch(() => {
        this.$message.error('获取appid错误！');
      })
      // }
    },
    getTemplatedata (Templatedata) {
      // console.log(Templatedata)
      if (!Templatedata) {
        app.getfetch('/miniappTemplate?miniappId=' + this.showstate.miniappId).then((res) => {
          let resdata = res.data;
          this.Templatedata = resdata;
          this.tplListtplList = this.MoudleListData = resdata.templateInfos;
          this.DataList = resdata.industryTypeTop;
          this.templateInfos();
          window.sessionStorage.setItem('Templatedata', JSON.stringify(resdata));
          this.updateLoadingStatus({ showloading: false, texts: '' })
        }).catch(() => {
          this.$message.error('加载模板页面数据失败！');
          this.updateLoadingStatus({ showloading: false, texts: '' })
        })
      } else {
        this.updateLoadingStatus({ showloading: false, texts: '' })
        this.Templatedata = Templatedata;
        this.DataList = Templatedata.industryTypeTop;
        this.tplList = this.MoudleListData = Templatedata.templateInfos;
        this.templateInfos();
        // if (Templatedata.hasTemplate) this.$emit('getindexdata')
      }
    },
    templateInfos () {
      if (this.Templatedata.hasTemplate) {
        this.$emit('getindexdata')
      } else {
        this.$emit('Gobackbtn', 'slider');
      }
    },
    searchs (event) {
      const self = this;
      const value = document.getElementById('searchs').value;
      if (event.type === 'click' || event.keyCode === 13) {
        self.tplList = [];
        self.MoudleListData.forEach(key => {
          if (key.name.indexof(value) > -1) self.tplList.push(key);
        });
      } else if (value.length === 0) {
        self.tplList = self.MoudleListData;
      }
    },
    ChooseIndex (item, index) {
      if (this.code === item.code) {
        this.tplList = this.MoudleListData;
        this.code = '';
      } else {
        this.tplList = [];
        this.MoudleListData.forEach(key => {
          this.code = item.code;
          if (key.industryType === item.code) {
            this.tplList.push(key);
          }
        });
      }
    },
    AddEmptyTemplate () {
      // 空模板id默认为0
      // console.log(this.showstate.miniappId)
      // app.postfetch('/miniappTemplate/choose', {id: 0, miniappId: 267}).then((res) => {
      this.updateLoadingStatus({ showloading: true, texts: '' })
      app.postfetch('/miniappTemplate/choose?id=' + 0 + '&miniappId=' + this.showstate.miniappId).then((res) => {
        if (res.data) this.$emit('getindexdata')
        this.updateLoadingStatus({ showloading: false, texts: '' })
      }).catch(() => {
        this.$message.error('加载模板页面数据失败！');
        this.updateLoadingStatus({ showloading: false, texts: '' })
      })
    },
    GobackApp () {
      this.$emit('Gobackbtn', 'showcps')
    },
    getCode (getCode) {
      this.ChooseIndex(getCode);
    },
    DragIndustries (DragIndustries) {
      this.AllIndustries = DragIndustries
    },
    DragPreview (DragPreview) {
      this.PreviewShow = DragPreview;
    },
    Preview (item) {
      item.iframeurl = 'http://test.app1.cangluxmt.com/';
      this.Previewitem = item;
      console.log(item)
      this.PreviewShow = true;
    },
    Refresh () {
      this.$emit('getindexdata')
    }
  }
}
</script>
<style lang="less">
@sprites: '/client/assets/images/sprites.png';
.bodybg {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  transform: translateY(-100%);
  transition: all 0.5s ease;
  z-index: 1999;
}
.templatescrollstyle {
  &::-webkit-scrollbar {
    //滚动条的宽度
    width: 3px;
    height: 9px;
  }
}
.scroll-content::-webkit-scrollbar {
    //滚动条的宽度
    width: 3px;
    height: 9px;
  }
#templateul {
  overflow-x: hidden;
  overflow: auto;
}
.template {
  width: 100%;
  margin: 20px 0;
  li {
    float: left;
    position: relative;
    width: 216px;
    background: #fff;
    margin: 0 24px 24px 0;
    height: 380px;
    box-sizing: border-box;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    &:before {
      content: '';
      background: rgba(0, 0, 0, 0.4);
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      opacity: 0;
      transition: all 0.5s ease;
    }
    img {
      width: 100%;
      height: 100%;
      background-size: cover;
    }
    &:hover::before,
    &.active::before {
      opacity: 1;
    }
    .qrcode {
      width: 85%;
      height: 200px;
      transition: all 0.7s ease;
      position: absolute;
      opacity: 0;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      z-index: 10;
      border-radius: 4px;
      overflow: hidden;
      text-align: center;
      padding: 5px;
      box-sizing: border-box;
      background: #fff;
      p {
        color: #333;
        font-size: 14px;
        line-height: 30px;
      }
      img {
        display: block;
        margin: 5px auto;
        width: 100%;
        height: 120px;
      }
      span {
        display: block;
        color: #fff;
        font-size: 15px;
        border-radius: 4px;
        line-height: 30px;
        background: #1890ff;
      }
    }
    transition: all 0.3s ease;
    transform: translate3d(0, 0, 0);
    .mask {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
    }
    &:hover,
    &.active {
      transform: translate3d(0, -10px, 0);
      .mask,
      .qrcode {
        opacity: 1;
      }
    }
  }
  .AddTemplate {
    .addmaskbtn {
      height: 100px;
      margin: 150px auto;
      text-align: center;
      z-index: 10;
      span {
        width: 40px;
        height: 50px;
        display: block;
        background: url('@{sprites}') no-repeat;
        margin: 0 auto;
        background-position: -60px -90px;
      }
      p {
        color: #434343;
        font-size: 14px;
        line-height: 30px;
      }
    }
    &:before {
      content: '';
      background: none;
      width: 95%;
      height: 96%;
      position: absolute;
      top: 2%;
      left: 2%;
      border: 1px dotted #e1e4ea;
    }
    &:hover {
      span {
        background-position: 0px -90px;
      }
      p {
        color: #1890ff;
      }
      &:before {
        content: '';
        border: 1px dotted #1890ff;
      }
    }
    &.qidai {
      &:before {
        content: '';
        display: none;
      }
      .addmaskbtn {
        span {
          // background:url('@{sprites}') no-repeat;margin: 0 auto;
          background-position: -180px -90px;
        }
      }
      &:hover {
        span {
          background-position: -120px -90px;
        }
      }
    }
  }
}
.allstyle_title {
  float: left;
  .allIndustries {
    display: inline-block;
    width: 100px;
    margin-right: 10px;
    border-radius: 5px;
    position: relative;
    height: 30px;
    color: #333;
    border: 1px solid #e1e4ea;
    font-size: 14px;
    line-height: 30px;
    cursor: pointer;
    &::after {
      content: '';
      display: block;
      width: 18px;
      height: 15px;
      background: url('@{sprites}') no-repeat;
      position: absolute;
      top: 7px;
      right: 5px;
      background-position: -333px -102px;
    }
  }
  span {
    font-size: 14px;
    margin-left: 10px;
    line-height: 30px;
    color: #333;
    display: inline-block;
    width: 120px;
    text-align: center;
    position: relative;
    &::before {
      content: '';
      display: block;
      width: 1px;
      height: 30px;
      background: #e1e4ea;
      position: absolute;
      top: 0px;
      left: 0px;
    }
  }
}
.allstyle {
  margin: 20px auto 0;
  width: 100%;
  max-width: 1200px;
  ul.selectstyle {
    width: 100%;
    li {
      transition: all 0.3s ease;
      margin: 0 10px;
      width: 100px;
      height: 30px;
      text-align: center;
      float: left;
      cursor: pointer;
      color: #333;
      font-size: 14px;
      line-height: 30px;
      border-radius: 5px;
      &:hover{
        color: #fff;
        background: #1890ff;
      }
    }
    .selected {
        color: #fff;
        background: #1890ff;
      }
  }
}
header {
  position: relative;
  z-index: 9999;
  border-bottom: 1px solid #e1e4ea;
  color: #666;
  width: 100%;
  margin: 0;
  background: #fff;
  height: 44px;
  a {
    float: left;
    height: 100%;
    span {
      color: #1890ff;
      font-size: 14px;
      line-height: 44px;
    }
    &::before {
      content: '';
      position: relative;
      top: 5px;
      display: inline-block;
      width: 30px;
      height: 20px;
      background: url('@{sprites}') no-repeat;
      background-position: -240px -100px;
    }
  }
  .search {
    float: right;
    position: relative;
    width: 205px;
    height: 33px;
    margin: 5px 0;
    border: 1px solid #f2f3f6;
    border-radius: 3px;
    input {
      width: 100%;
      border: none;
      padding-left: 10px;
      color: #434343;
      font-size: 14px;
      height: 100%;
    }
    .searchbtn {
      position: absolute;
      top: 9px;
      right: 5px;
      width: 20px;
      height: 20px;
      background: url('/client/assets/images/search1.png') no-repeat;
      cursor: pointer;
      &:hover {
        background: url('/client/assets/images/search2.png') no-repeat;
      }
    }
  }
}
</style>

