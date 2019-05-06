<template>
   <div :class="[cssname, {'showuploadactive': showstate.Uploadimginfo.showUploadimg}]" @click="cancelrightmouse()">
     <transition name="fade">
      <SetLink v-if="setLinkShow" ref="setlinkchild"></SetLink>
     </transition>
      <ul id="editbtns">
        <li class="ico2" @click="copymodule()" v-if="showcopy">复制</li>
        <li class="ico3" @click="setPosition('top')">置顶</li>
        <li class="ico4" @click="setPosition('bottom')">置底</li>
        <!-- <li class="ico5">上移</li><li class="ico6">下移</li> -->
        <li class="ico8" @click="delmodule()">删除</li>
      </ul>
      <Header @ChooseTemplatebtn="changecssname" @setcpsName="setcpsName" :WindowConfig="WindowConfig" :container="container"></Header>
      <ProTemplate @Gobackbtn = "changecssname" :showbackbtn="showbackbtn" @getindexdata="getIndexInfo" ></ProTemplate>
      <div class="main flex templatescrollstyle" id="contentmain" :class="selstyleName">
        <ChooseCpt @setcpsName="setcpsName('hidecps')" :container="container"></ChooseCpt>
        <div class="mini">
          <div class="minimask" @click="setcpsName('hidecps')"></div>
          <div id="minipro" class="active">
            <div class="wechatpic" @click="setcpsName('showTopNavcpsStyle')" :style="navgaitorBg()"><span>{{showstate.CurrentPageInfo.pageName}}</span></div>
            <div class="P_sortable" :style="pageBg()">
              <div class="scrollstyle psort">
                <div @click="setcpsName" class="scrollmask"></div>
                <ul id="sortable">
                    <li class="ui-state-default ui-droppable" :dataindex="index" v-for="(item,index) in container" :key="index" :style="stylefun(item.container)" v-if="container.length > 0">
                      <div class="flnav">
                        <el-tooltip class="item" effect="dark" content="编辑" placement="right"><span class="ico1" @click="changecontainer(item,index)"></span></el-tooltip>
                        <el-tooltip class="item" effect="dark" content="复制" placement="right">
                          <span class="ico2" @click="copymodule(item,index,true)"></span></el-tooltip>
                        <el-tooltip class="item" effect="dark" content="上移" placement="right">
                          <span class="ico3" @click="UpMove(item,index)" v-if="index > 0"></span>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="下移" placement="right">
                          <span class="ico4" @click="DownMove(item,index)" v-if="index < container.length-1"></span>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="right"><span class="ico5" @click="delmodule(item,index,true)"></span></el-tooltip>
                      </div>
                      <div class="mask_area" @click="changecontainer(item,index)"></div>
                      <slot><span class="selectcps" v-if="hidebtn">添加组件</span></slot>
                      <!-- 按钮组件 -->
                      <a class="btn dragbtn btnchild"  v-for="(items,index1) in item.buttonList" :key="index1" href="javascript:;" :style="stylefun(items)" @click="changeCurrentStyle(items,$event,index1,index)" @contextmenu.prevent="rightMouse($event,items,index,index1)"><span :style="'line-height:'+ items.h + 'px'">{{items.con}}</span>
                      </a>
                      <!-- 照片组件 -->
                      <a v-for="(items,index1) in item.picList" :key="index1" href="javascript:;" class="picUpload picchild dragbtn" :style="stylefun(items)" :class="{'haspic':items.pic}" @click="changeCurrentStyle(items,$event,index1,index)" @contextmenu.prevent="rightMouse($event,items,index,index1)"><p></p><img :src="items.pic?items.pic:items.img" :style="'border-radius:' + items.bdr +'px'"/></a>
                      <!-- 标题组件 -->
                      <a class="title dragbtn titlechild" :class="items.classnm" v-for="(items,index1) in item.titleList" :key="index1" :style="stylefun(items)" @click="changeCurrentStyle(items,$event,index1,index)"  @contextmenu.prevent="rightMouse($event,items,index,index1)"><span :style="{'background':items.text[0].bgc}"></span>{{items.text[0].con}}<p v-if="items.showmore === '0'">更多 ></p></a>
                      <!-- 文字组件 -->
                      <a class="textedit dragbtn textchild" v-for="(items,index1) in item.textList" :key="index1" :style="stylefun(items)" @contextmenu.prevent="rightMouse($event,items,index,index1)" @click="changeCurrentStyle(items,$event,index1,index)">
                        <textarea v-model="items.con" contenteditable="true" :style="{'line-height': items.lh+'px','font-family':items.ff,'color':items.co,'font-style':items.sty,'text-align':items.ta,'text-decoration':items.line,'font-weight':items.fw}"></textarea>
                      </a>
                      <!-- 视频组件 -->
                      <a class="dragbtn videochild" v-for="(items,index1) in item.videoList" :key="index1" :style="stylefun(items)" @click.stop="changeCurrentStyle(items,$event,index1,index)"  @contextmenu.prevent="rightMouse($event,items,index,index1)"><video :src="items.vis" controls preload="auto"></video></a>

                      <!-- 在线留言 -->
                      <a class="dragbtn msg1 msgchild" :class="items.classnm"   v-for="(items,index1) in item.msgList" :key="index1" :style="stylefun(items)" @click="changeCurrentStyle(items,$event,index1,index)"  @contextmenu.prevent="rightMouse($event,items,index,index1)">
                        <nav>
                          <p class="clearfix"><span>姓名</span><el-input type="text" placeholder="请输入姓名"></el-input></p>
                          <p class="clearfix"><span>电话</span><el-input type="text" placeholder="请输入电话"></el-input></p>
                          <p class="textareacon clearfix"><span>内容</span><el-input autosize="true" type="textarea" placeholder="请输入内容"></el-input></p>
                          <div>
                            <div class="sub" :style="{'color':items.btn[0].co, 'border-radius':items.btn[0].bdr + 'px', 'border':'1px solid '+items.btn[0].bdc, 'font-size':items.btn[0].fs +'px', 'background-color': items.btn[0].bgc}">{{items.btn[0].con}}</div>
                          </div>
                        </nav>
                      </a> 
                      <!-- 搜索组件 -->
                      <a class="dragbtn search searchchild" :class="items.classnm"  v-for="(items,index1) in item.searchList" :key="index1" :style="stylefun(items)" @click="changeCurrentStyle(items,$event,index1,index)"  @contextmenu.prevent="rightMouse($event,items,index,index1)">
                        <i class="icon iconfont search_ico" :style="{'color':items.icobg}">&#xe607;</i>
                        <el-input class="searchinput" :placeholder="items.place" :style="{'color':items.co,'font-size':items.fs +'px'}"></el-input>
                      </a>

                      <!-- 魔方导航组件 -->
                      <div class="cubecontent dragbtn cubechild" :class="items.classnm"  v-for="(items,index1) in item.cubeList" :key="index1" :style="stylefun(items)" @contextmenu.prevent="rightMouse($event,items,index,index1)" >
                          <div class="cubeimg" :class="{'active': curitemindex == index2}" v-for="(item2,index2) in items.cubeLists" :key="index2" :href="item2.link" @click.stop="changeCurrentStyle(items,$event,index1,index,item2,index2)">
                            <img :src="item2.imgurl" /><span :style="{'color':items.co,'font-size':items.fs +'px'}">{{item2.tt}}</span>
                          </div>
                      </div>
                      
                      <!-- 地图组件 -->
                      <a class="dragbtn mapchild" v-for="(items,index1) in item.mapList" :key="index1" :style="stylefun(items)"  @contextmenu.prevent="rightMouse($event,items,index,index1)">
                        <!-- <div @click.stop="changeCurrentStyle(items,$event,index1,index)" class="mapmove">移动</div> -->
                        <div class="mapcontent">
                          <div :id="'containermap'+index" class="containermap"></div>
                          <p v-if="items.showtitle" @click.stop="changeCurrentStyle(items,$event,index1,index)" :style="{'color': items.co, 'font-size': items.fs + 'px'}">{{items.address}}</p>
                        </div>
                      </a>
                      <!-- 轮播多图组件 -->
                      <div class="swipercontent swiperchild" v-if="item.swiperList.length>0" :class="items.classnm"  v-for="(items,index1) in item.swiperList" :key="index1" :style="stylefun(items)"  @contextmenu.prevent="rightMouse($event,items,index,index1)">
                        <div class="swiper-container swiper-container0" v-show="items.classnm == 'swiper1'">
                          <div class="swiper-pagination"></div>
                          <div class="swiper-wrapper">
                            <div class="swiper-slide" :style="{'border-radius':items.libdr +'px'}" v-for="(item2,index2) in items.swiperLists" :key="index2" :href="item2.link" @click.stop="changeCurrentStyle(items,$event,index1,index,item2,index2)">
                              <img :src="item2.imgurl"><span :style="{'color':items.co,'font-size':items.fs +'px','text-align':items.ta,'display':items.disp}">{{item2.tt}}</span>
                            </div>
                          </div>
                        </div>
                        <div class="swiper-container swiper-container1" v-show="items.classnm == 'swiper2'">
                          <div class="swiper-wrapper">
                            <div class="swiper-slide" :style="{'border-radius':items.libdr +'px'}" v-for="(item2,index2) in items.swiperLists" :key="index2" :href="item2.link" @click.stop="changeCurrentStyle(items,$event,index1,index,item2,index2)">
                              <img :src="item2.imgurl"><span :style="{'color':items.co,'font-size':items.fs +'px','text-align':items.ta,'display':items.disp}">{{item2.tt}}</span>
                            </div>
                          </div>
                        </div>
                        <div class="widthp" v-if="items.classnm == 'swiper3'">
                          <div class="sonp" :style="{'border-radius':items.libdr +'px'}" v-for="(item2,index2) in items.swiperLists" :key="index2" :href="item2.link" @click.stop="changeCurrentStyle(items,$event,index1,index,item2,index2)"><div class="li"><img :src="item2.imgurl"><span :style="{'color':items.co,'font-size':items.fs +'px','text-align':items.ta,'display':items.disp}">{{item2.tt}}</span></div></div>
                        </div>
                        <!-- <p class="move">移动</p> -->
                      </div>
                      <!-- 文章列表组件 -->
                      <div v-if="item.articleList.length>0 " class="arcicle_content" v-for="(listitem,indexlist) in item.articleList" :key="indexlist">
                        <div v-if="index1 < listitem.limitNum && listitem.classnm !== 'article2'" class="article content" :class="listitem.classnm" v-for="(items,index1) in listitem.articleLists" :key="index1" @click="changeCurrentStyle(listitem,$event,indexlist,index)">
                          <div :style="stylefun(listitem)" class="boxsizing">
                            <div class="articleco">
                              <div class="cont" :style="{'border-radius':listitem.bdr}">
                                <p class="title" :style="{'color':listitem.co,'font-size':listitem.fs +'px'}">{{items.title}}</p>
                                <p :style="{'color':listitem.descolor,'font-size':listitem.desfs +'px'}">{{items.newsSummary}}</p>
                                <span class="date">{{items.date}}</span>
                              </div>
                            </div>
                            <div class="articleimages">
                              <div class="articleimg">
                                <img :src="showstate.imageUrl+items.image" :href="items.link">
                              </div>
                            </div>
                          </div>
                        </div>
                        <!-- <div v-show="item.articleList.length>0 && listitem.classnm === 'article2'" class="arcicle_content sss" v-for="(listitem,indexlist) in item.articleList" :key="indexlist" :data-src="listitem.classnm"> -->
                        <div class="article2" v-show="listitem.classnm == 'article2'" >
                          <div class="swiper-container swiper-container2">
                            <div class="swiper-wrapper" :data-src="listitem.articleLists">
                              <div  class="swiper-slide" v-for="(items,index1) in listitem.articleLists" :key="index1" :style="stylefun(listitem)" @click.stop="changeCurrentStyle(listitem,$event,indexlist,index)">
                                <div class="articleco">
                                  <div class="cont" :style="{'border-radius':listitem.bdr}">
                                    <p class="title" :style="{'color':listitem.co,'font-size':listitem.fs +'px'}">{{items.title}}</p>
                                    <p :style="{'color':listitem.descolor,'font-size':listitem.desfs +'px'}">{{items.newsSummary}}</p>
                                    <span class="date">{{items.date}}</span>
                                  </div>
                                </div>
                                <div class="articleimages">
                                  <div class="articleimg">
                                    <img :src="showstate.imageUrl+items.image" :href="items.link">
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- </div> -->
                    </li>
                    <li id="addtonglan" class="addtonglan cannotdrag"  @click="addzujian()" ><span class="">添加通栏</span></li>
                    <li class="jishutxt cannotdrag" @click="setcpsName('showControlstyle')" href="obj.url? " :style="stylefun(showstate.supportText)" >{{showstate.supportText.tt}}</li>
                </ul>
              </div>
            </div>
            <Navigation @setcpsName="setcpsName" :tabbarinfo="tabbarinfo"></Navigation>
            <ToorBars @setcpsName="setcpsName"></ToorBars>
          </div>
        </div>
        <div class="editcps">
          <div class="minimask" @click="setcpsName('hidecps')"></div>          
          <BtnEditCps :container="container" ref="btnchild"></BtnEditCps>
          <TitleEditCps :container="container" ref="titlechild"></TitleEditCps>
          <MsgEditCps :container="container" ref="msgchild"></MsgEditCps>
          <SearchEditCps :container="container" ref="searchchild"></SearchEditCps>
          <VideoEditCps :container="container" ref="videochild"></VideoEditCps>
          <MapEditCps :container="container" ref="mapchild"></MapEditCps>
          <PicEditCps :container="container" ref="picchild"></PicEditCps>
          <CubeEditCps :container="container" ref="cubechild"></CubeEditCps>
          <SwiperEditCps :container="container" ref="swiperchild"></SwiperEditCps>
          <ArticleEditCps :container="container" ref="articlechild"></ArticleEditCps>
          <ShopEditCps :container="container" ref="shopchild"></ShopEditCps>
          <TextEditCps :container="container" ref="textchild"></TextEditCps>
          <ContainerEditCps :container="container" ref="containerchild"></ContainerEditCps>
          <Control ref="controlchild"></Control>
          <StyleType ref="WindowConfigStylechild"></StyleType>
          <BgEditCps ref="WindowConfigchild"></BgEditCps>
          <BottomNavEditCps ref="BottomNavchild"></BottomNavEditCps>
          <TopNavEditCps ref="TopNavStylechild"></TopNavEditCps>
        </div>
      </div>
      <transition name="fade">
        <Picupload :container="container" @draggable="draggable" v-if="showstate.Uploadimginfo.showUploadimg || showstate.CurrentBGImageUrl.showUploadimg || showstate.uploadiconNavigatorSet"></Picupload>
      </transition>
   </div>
</template>

<script>
import $ from 'jquery'
import app from '../fetch/api.js'
import Swiper from '../assets/js/swiper.min'
import '../assets/styles/swiper.min.css'
import Header from '../layout/header.vue'
import ProTemplate from './components/Pro_Template.vue'
import ChooseCpt from './components/ChooseCpt.vue'
import StyleType from './components/StyleType.vue'
import BtnEditCps from './editcomponents/BtnEditCps.vue'
import PicEditCps from './editcomponents/picEditCps.vue'
import VideoEditCps from './editcomponents/VideoEditCps.vue'
import MapEditCps from './editcomponents/MapEditCps.vue'
import TextEditCps from './editcomponents/TextEditCps.vue'
import CubeEditCps from './editcomponents/CubeEditCps.vue'
import SwiperEditCps from './editcomponents/SwiperEditCps.vue'
import TitleEditCps from './editcomponents/TitleEditCps.vue'
import SearchEditCps from './editcomponents/SearchEditCps.vue'
import ArticleEditCps from './editcomponents/ArticleEditCps.vue'
import ShopEditCps from './editcomponents/ShopEditCps.vue'
import ContainerEditCps from './editcomponents/ContainerEditCps.vue'
import BottomNavEditCps from './editcomponents/BottomNavEditCps.vue'
import Navigation from './editcomponents/navigation.vue'
import BgEditCps from './editcomponents/BgEditCps.vue'
import TopNavEditCps from './editcomponents/TopNavEditCps.vue'
import MsgEditCps from './editcomponents/MsgEditCps.vue'
import Picupload from './editcomponents/picupload.vue'
import Control from './editcomponents/Control.vue'
import ToorBars from './editcomponents/Toolbar.vue'
import Cpstemplete from '../config/cpstemplete.js'
import SetLink from './components/Pop-ups/SetLink'
import { mapState, mapMutations } from 'vuex';

export default {
  components: {
    ProTemplate, Header, ChooseCpt, StyleType, BtnEditCps, PicEditCps, Navigation, Control, ToorBars, TextEditCps, ContainerEditCps, BgEditCps, Picupload, TitleEditCps, TopNavEditCps, BottomNavEditCps, VideoEditCps, MapEditCps, MsgEditCps, SearchEditCps, CubeEditCps, SwiperEditCps, ArticleEditCps, ShopEditCps, SetLink
  },
  data () {
    return {
      cssname: '',
      selstyleName: '',
      hidebtn: true,
      currentItem: null,
      showbackbtn: false,
      CurrentImageUrl: '',
      currentItemindex: null,
      swiper: {},
      currentcps: null,
      showcopy: true,
      currentcontainerindex: 0,
      bgconfig: {bgColor: 'rgba(244, 244, 244, 1)', bgImg: null},
      // 通栏容器
      container: [],
      tabbarinfo: [],
      firstList: [],
      setLinkShow: false
    }
  },
  computed: {
    ...mapState({showstate: state => state}),
    getcurrentPage () {
      return this.showstate.currentPageData;
    }
  },
  canDeactivate (to, from, next) {
    window.alert('2222');
    next()
  },
  watch: {
    getcurrentPage (val) {
      this.container = val;
      setTimeout(() => { this.sortable(); this.getSwiper(); }, 100);
    }
  },
  created () {},
  methods: {
    ...mapMutations(['updateImageUpload']),
    ...mapMutations(['updateBgImageUpload']),
    ...mapMutations(['updateAllStyle']),
    ...mapMutations(['updateBottomNavUpload']),
    ...mapMutations(['setMiniappId']),
    ...mapMutations(['setCurrentPageId']),
    ...mapMutations(['updatedomZindex']),
    ...mapMutations(['updateLoadingStatus']),
    ...mapMutations(['setPageData']),
    ...mapMutations(['setCurrentPageInfo']),
    ...mapMutations(['setIndexPageId']),
    ...mapMutations(['setControl']),
    ...mapMutations(['saveAllPageInfo']),
    setLink (setLink) {
      this.setLinkShow = setLink;
    },
    getFirstList () {
      this.setLinkShow = true;
      setTimeout(() => { this.$refs.setlinkchild.openlinkepop(); }, 0);
    },
    getSwiper () {
      setTimeout(() => {
        new Swiper('.swiper-container0', {spaceBetween: 0, observeParents: true, observer: true, pagination: {loop: true, el: '.swiper-pagination', clickable: true, type: 'bullets'}
        })
        new Swiper('.swiper-container1', {spaceBetween: 5, slidesPerView: 2, observeParents: true, observer: true})
        new Swiper('.swiper-container2', {spaceBetween: -10, slidesPerView: 1, width: '250', height: '231', observeParents: true, observer: true})
      }, 200);
    },
    // 页面刷新后获取页面首页数据
    getIndexInfo () {
      const loading = this.$loading({lock: true, text: '页面初始化中,请稍后...', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)'});
      app.getfetch('/drag/init?miniappId=' + this.showstate.miniappId).then((res) => {
        let PagesInfos = res.data.data.PagesInfos;
        window.sessionStorage.setItem('pagelistinfo', JSON.stringify(PagesInfos));
        let indexpageInfo = res.data.data.indexPageInfo;
        let data = indexpageInfo.pageDetails !== '' ? JSON.parse(indexpageInfo.pageDetails) : '';
        let pagedata = data.pages1 ? data.pages1 : [];
        this.container = pagedata;
        // 存贮当前页面的数据以及id
        this.setPageData(pagedata);
        this.cssname = 'showcps';
        if (indexpageInfo !== null) {
          // 存储miniappid
          this.setMiniappId(indexpageInfo.miniappId)
          // 存贮当前页面id及标题
          this.setCurrentPageInfo({id: indexpageInfo.id, pageName: indexpageInfo.pageName})
          this.saveAllPageInfo([{id: indexpageInfo.id, pageName: indexpageInfo.pageName, miniappId: indexpageInfo.miniappId, pageDetails: indexpageInfo.pageDetails}])
          // console.log(this.showstate.AllPageInfo)
          this.setIndexPageId(indexpageInfo.id)
          if (data.Zindex) this.updatedomZindex(data.Zindex);
        }
        this.updateLoadingStatus({showloading: false, texts: ''})
        this.getSwiper();
        // 底部导航数据
        let extConfig = res.data.data.tabbar;
        // console.log(this.tabbarinfo)
        if (extConfig) {
          let tabbar = extConfig.tabBar;
          this.tabbarinfo = JSON.parse(tabbar);
          this.tabbarinfo.showTabBar = extConfig.showTabBar;
          this.tabbarinfo.tabBarType = extConfig.tabBarType;
          this.updateBottomNavUpload(this.tabbarinfo);
          let supportText = JSON.parse(extConfig.supportText);
          this.setControl(supportText);
          // 设置全局样式
          this.updateAllStyle({navigatorBackColor: extConfig.navigatorBackColor, themeColorhelp: extConfig.themeColorHelp, themeColor: extConfig.themeColor});
          let bgColor = extConfig.bgColor === null ? '' : extConfig.bgColor;
          let bgImg = extConfig.bgImg === null ? '' : extConfig.bgImg;
          let bgconfig = {showUploadimg: false, bgColor: bgColor, bgImg: bgImg, bgupload: false};
          this.updateBgImageUpload(bgconfig);
        }
        setTimeout(() => { this.sortable(); }, 100);
        loading.close();
      }).catch(() => {
        loading.close();
        this.sortable();
        this.$message.error('数据获取失败！请稍后再试试看');
      })
    },
    // 设置通栏样式
    changecontainer (item, index) {
      this.selstyleName = 'showContainerStyle';
      $('#sortable li a').removeClass('activebtn');
      this.$refs.containerchild.changeCurrentContainerStyle(item, index);
    },
    pageBg () {
      return {
        'background': this.showstate.CurrentBGImageUrl.bgColor !== null ? this.showstate.CurrentBGImageUrl.bgColor : 'url(' + this.showstate.CurrentBGImageUrl.bgImg + ') center center'
      }
    },
    navgaitorBg () {
      return {
        'background-color': this.showstate.AllStyle.navigatorBackColor
      }
    },
    stylefun (item) {
      return {
        'width': item.w + 'px', 'height': item.h === '100%' ? '100%' : item.h + 'px', 'line-height': item.h === '100%' ? '100%' : item.h + 'px', 'font-size': item.fs + 'px', 'color': item.co, 'background-color': item.bgc, 'border-width': item.bdw + 'px', 'border-color': item.bdc, 'border-style': item.bds, 'border-radius': item.bdr + 'px', 'opacity': item.op, 'position': item.pos, 'top': item.t + 'px', 'left': item.l + 'px', 'z-index': item.zi, 'text-align': item.ta, 'whiteSpace': item.ws, 'font-family': item.ff, 'background': item.bg ? 'url(' + item.bg + ') center center no-repeat' : item.bgc, 'padding': item.pd + 'px'
      }
    },
    // 选择模板
    changecssname (name) { this.cssname = name; this.showbackbtn = true },
    // 添加通栏
    addzujian () {
      let contain = Cpstemplete.Container;
      let obj = {container: contain, titleList: [], buttonList: [], picList: [], textList: [], videoList: [], mapList: [], msgList: [], searchList: [], cubeList: [], swiperList: [], articleList: [], shopList: []}
      // let obj = {container: contain}
      this.container.push(obj);
      this.resize();
      setTimeout(() => { this.sortable(); }, 100);
      // console.log(this.container)
    },
    // 编辑通栏模块
    // editmodule () {
    //   this.changecontainer(this.currentItem, this.currentcontainerindex)
    // },
    // 置顶或者置底
    setPosition (name) {
      let curzIndex;
      if (name === 'top') {
        let maxzindex = this.showstate.domZindex.maxzIndex;
        curzIndex = maxzindex + 1;
        this.showstate.domZindex.maxzIndex = curzIndex;
      } else {
        let minzIndex = this.showstate.domZindex.minzIndex;
        curzIndex = minzIndex - 1;
        this.showstate.domZindex.minzIndex = curzIndex;
      }
      let contain = this.container[this.currentcontainerindex];
      if (this.currentItem.styleName === 'showBtnStyle') {
        contain.buttonList[this.currentItemindex].zi = curzIndex;
      } else if (this.currentItem.styleName === 'showpicstyle') {
        contain.picList[this.currentItemindex].zi = curzIndex;
      } else if (this.currentItem.styleName === 'showTitlestyle') {
        contain.titleList[this.currentItemindex].zi = curzIndex;
      } else if (this.currentItem.styleName === 'showVideostyle') {
        contain.videoList[this.currentItemindex].zi = curzIndex;
      } else if (this.currentItem.styleName === 'showMapstyle') {
        contain.mapList[this.currentItemindex].zi = curzIndex;
      } else if (this.currentItem.styleName === 'showTextstyle') {
        contain.textList[this.currentItemindex].zi = curzIndex;
      } else if (this.currentItem.styleName === 'showMsgstyle') {
        contain.msgList[this.currentItemindex].zi = curzIndex;
      } else if (this.currentItem.styleName === 'showSearchstyle') {
        contain.searchList[this.currentItemindex].zi = curzIndex;
      } else if (this.currentItem.styleName === 'showCubestyle') {
        contain.cubeList[this.currentItemindex].zi = curzIndex;
      } else if (this.currentItem.styleName === 'showSwiperstyle') {
        contain.swiperList[this.currentItemindex].zi = curzIndex;
      } else if (this.currentItem.styleName === 'showArticlestyle') {
        contain.articleList[this.currentItemindex].zi = curzIndex;
      }
    },
    // 复制模块
    copymodule (item, index, flag) {
      if (flag) {
        // 复制通栏模块
        let copyContainer = JSON.parse(JSON.stringify(this.container[index]));
        this.container.splice(index, 0, copyContainer);
      } else {
        // 复制通栏内部子元素
        let contain = this.container[this.currentcontainerindex];
        let currentItem = JSON.parse(JSON.stringify(this.currentItem))
        currentItem.t = parseInt(currentItem.t) + 20;
        currentItem.l = parseInt(currentItem.l) + 20;
        currentItem.zi = parseInt(currentItem.zi) + 1;
        // console.log(currentItem.top, parseInt(currentItem.top) + 30);
        if (this.currentItem.styleName === 'showBtnStyle') {
          contain.buttonList.splice(this.currentItemindex, 0, currentItem);
        } else if (this.currentItem.styleName === 'showpicstyle') {
          contain.picList.splice(this.currentItemindex, 0, currentItem);
        } else if (this.currentItem.styleName === 'showTitlestyle') {
          contain.titleList.splice(this.currentItemindex, 0, currentItem);
        } else if (this.currentItem.styleName === 'showTextstyle') {
          contain.textList.splice(this.currentItemindex, 0, currentItem);
        } else if (this.currentItem.styleName === 'showVideostyle') {
          contain.videoList.splice(this.currentItemindex, 0, currentItem);
        } else if (this.currentItem.styleName === 'showMapstyle') {
          contain.mapList.splice(this.currentItemindex, 0, currentItem);
        } else if (this.currentItem.styleName === 'showMsgstyle') {
          contain.msgList.splice(this.currentItemindex, 0, currentItem);
        } else if (this.currentItem.styleName === 'showSearchstyle') {
          contain.searchList.splice(this.currentItemindex, 0, currentItem);
        } else if (this.currentItem.styleName === 'showCubestyle') {
          contain.cubeList.splice(this.currentItemindex, 0, currentItem);
        } else if (this.currentItem.styleName === 'showSwiperstyle') {
          contain.swiperList.splice(this.currentItemindex, 0, currentItem);
        } else if (this.currentItem.styleName === 'showArticlestyle') {
          contain.articleList.splice(this.currentItemindex, 0, currentItem);
        }
      }
      setTimeout(() => { this.draggable(); this.sortableResizable(); }, 100)
    },
    // 通栏上移
    UpMove (item, index) {
      let list = this.container;
      let temp = list[index - 1];
      this.$set(list, index - 1, list[index])
      this.$set(list, index, temp)
      this.draggable()
    },
    // 通栏下移
    DownMove (item, index) {
      let list = this.container;
      let temp = list[index + 1];
      this.$set(list, index + 1, list[index])
      this.$set(list, index, temp)
      this.draggable()
    },
    // 删除模块
    delmodule (item, index, flag) {
      console.log(this.currentItem);
      if (flag) {
        this.container.splice(index, 1);
      } else {
        let contain = this.container[this.currentcontainerindex];
        if (this.currentItem.styleName === 'showBtnStyle') {
          contain.buttonList.splice(this.currentItemindex, 1);
        } else if (this.currentItem.styleName === 'showpicstyle') {
          contain.picList.splice(this.currentItemindex, 1);
        } else if (this.currentItem.styleName === 'showTitlestyle') {
          contain.titleList.splice(this.currentItemindex, 1);
        } else if (this.currentItem.styleName === 'showVideostyle') {
          contain.videoList.splice(this.currentItemindex, 1);
        } else if (this.currentItem.styleName === 'showMapstyle') {
          contain.mapList.splice(this.currentItemindex, 1);
        } else if (this.currentItem.styleName === 'showMsgstyle') {
          contain.msgList.splice(this.currentItemindex, 1);
        } else if (this.currentItem.styleName === 'showSearchstyle') {
          contain.searchList.splice(this.currentItemindex, 1);
        } else if (this.currentItem.styleName === 'showTextstyle') {
          contain.textList.splice(this.currentItemindex, 1);
        } else if (this.currentItem.styleName === 'showCubestyle') {
          contain.cubeList.splice(this.currentItemindex, 1);
        } else if (this.currentItem.styleName === 'showSwiperstyle') {
          contain.swiperList.splice(this.currentItemindex, 1);
        } else if (this.currentItem.styleName === 'showArticlestyle') {
          console.log(contain.articleList)
          contain.articleList.splice(this.currentItemindex, 1);
        } else if (this.currentItem.styleName === 'showTextstyle') {
          console.log(contain.textList)
          contain.textList.splice(this.currentItemindex, 1);
        }
      }
      this.setcpsName('hidecps');
    },
    // 右键自定义ui
    rightMouse (event, item, index, index1) {
      let ctx = $('#editbtns');
      ctx.hide();
      event.preventDefault();
      this.currentcontainerindex = index;
      this.currentItemindex = index1;
      this.currentItem = item;
      this.showcopy = true;
      // console.log(item)
      if (item.address || item.swiperLists) this.showcopy = false;
      // console.log(this.currentItemindex);
      var x = event.pageX;
      var y = event.pageY;
      ctx.css({'left': x + 'px', 'top': y + 'px'}).show();
    },
    // 切换右侧组件设置
    setcpsName (name) {
      this.selstyleName = name;
      $('#editbtns').hide();
      $('#sortable li a').removeClass('activebtn');
      if (name === 'showbgcpsStyle') {
        this.$refs.WindowConfigchild.changeCurrentwindowconfigs();
      } else if (name === 'shoowstyle') {
        this.$refs.WindowConfigStylechild.changeCurrentStyle();
      } else if (name === 'showBottomNavcpsStyle') {
        this.$refs.BottomNavchild.changeCurrentNavigatorSet();
      } else if (name === 'showControlstyle') {
        this.$refs.controlchild.changeCurrentStyle();
      } else if (name === 'showTopNavcpsStyle') {
        this.$refs.TopNavStylechild.changeCurrentTopconfigs();
      }
    },
    opencontrol () {
      this.selstyleName = 'showControlstyle';
    },
    cancelrightmouse () {
      $('#editbtns, #controlarea').hide();
    },
    // 打开当前选中组件设计
    changeCurrentStyle (item, e, index1, index, item2, index2) {
      this.selstyleName = item.styleName;
      this.cancelrightmouse();
      $('#sortable li a').removeClass('activebtn');
      $(e.target).addClass('activebtn');
      setTimeout(() => {
        if (this.selstyleName === 'showBtnStyle') {
          this.$refs.btnchild.changeCurrentBtnStyle(item, index1, index);
        } else if (this.selstyleName === 'showpicstyle') {
          this.$refs.picchild.changeCurrentPicStyle(item, index1, index);
        } else if (this.selstyleName === 'showTextstyle') {
          this.$refs.textchild.changeCurrentTextStyle(item, index1, index);
          $(e.target).find('textarea').focus();
        } else if (this.selstyleName === 'showTitlestyle') {
          this.$refs.titlechild.changeCurrentTitleStyle(item, index1, index);
        } else if (this.selstyleName === 'showVideostyle') {
          $(e.target).parent().addClass('activebtn');
          this.$refs.videochild.changeCurrentVideoStyle(item, index1, index);
        } else if (this.selstyleName === 'showMapstyle') {
          $(e.target).parents('a').addClass('activebtn');
          this.$refs.mapchild.changeCurrentMapStyle(item, index1, index);
        } else if (this.selstyleName === 'showMsgstyle') {
          $('#sortable li .dragbtn').removeClass('activebtn');
          this.$refs.msgchild.changeCurrentMsgStyle(item, index1, index);
        } else if (this.selstyleName === 'showSearchstyle') {
          $(e.target).parents('a').addClass('activebtn');
          this.$refs.searchchild.changeCurrentSearchStyle(item, index1, index);
        } else if (this.selstyleName === 'showCubestyle') {
          $('#sortable li .dragbtn').removeClass('activebtn');
          this.$refs.cubechild.changeCurrentCubeStyle(item, index1, index, item2, index2);
        } else if (this.selstyleName === 'showSwiperstyle') {
          $(e.target).parents('a').addClass('activebtn');
          this.$refs.swiperchild.changeCurrentSwiperStyle(item, index1, index, item2, index2);
        } else if (this.selstyleName === 'showArticlestyle') {
          $('.arcicle_content').removeClass('activebtn');
          $(e.target).parents('.arcicle_content').addClass('activebtn');
          this.$refs.articlechild.changeCurrentArticleStyle(item, index1, index);
        }
        this.resize();
      }, 100)
    },
    // 拖拽布局
    sortable () {
      this.mapInit()
      let this_ = this;
      $('#catalog .pic').draggable({
        helper: 'clone',
        zIndex: 100,
        scroll: true,
        refreshPositions: true
        // connectToSortable: '#sortable'
      });
      $('#sortable').droppable({
        hoverClass: 'ui-state-hover'
      })
      $('#sortable li,#Navigation').droppable({
        hoverClass: 'ui-state-hover',
        drop: function (event, ui) {
          let idindex = event.target.attributes[0].value;
          if (event.target.id === 'addtonglan') return false;
          var name = ui.helper[0].localName;
          let textContent = ui.draggable[0].textContent;
          if (name === 'section') {
            let curzIndex = this_.showstate.domZindex.maxzIndex + 1;
            this_.showstate.domZindex.maxzIndex = curzIndex;
            // console.log(this_.showstate.domZindex)
            // 拖拽图片组件
            if (textContent.indexOf('图片') !== -1) {
              this_.updateImageUpload({showUploadimg: true, firstUploadCurrentImageUrl: -1, idindex: idindex, firstupload: true})
              this_.setcpsName('hidecps');
            } else if (textContent.indexOf('按钮') !== -1) {
              let btnstyle = Cpstemplete.BtnStyle;
              btnstyle.zi = curzIndex;
              this_.container[idindex].buttonList.push(btnstyle)
            } else if (textContent.indexOf('标题') !== -1) {
              let titlestyle = Cpstemplete.TitleStyle;
              titlestyle.zi = curzIndex
              this_.container[idindex].titleList.push(titlestyle)
            } else if (textContent.indexOf('文字') !== -1) {
              let TextStyle = Cpstemplete.TextStyle;
              TextStyle.zi = curzIndex
              this_.container[idindex].textList.push(TextStyle)
            } else if (textContent.indexOf('视频') !== -1) {
              let VideoStyle = Cpstemplete.VideoStyle;
              VideoStyle.zi = curzIndex
              this_.container[idindex].videoList.push(VideoStyle)
            } else if (textContent.indexOf('地图') !== -1) {
              if (this_.container[idindex].mapList.length > 0) {
                this_.$message.error('该通栏已经有地图了！');
                return false;
              }
              let MapStyle = Cpstemplete.MapStyle;
              MapStyle.zi = curzIndex;
              this_.container[idindex].mapList.push(MapStyle);
              this_.$refs.mapchild.changeCurrentMapStyle(this_.container[idindex].mapList, '', idindex);
              setTimeout(() => { this_.mapInit() }, 10)
            } else if (textContent.indexOf('底部导航') !== -1) {
              this_.tabbarinfo.showTabBar = 1;
            } else if (textContent.indexOf('留言') !== -1) {
              let MsgStyle = Cpstemplete.MsgStyle;
              MsgStyle.zi = curzIndex
              this_.container[idindex].msgList.push(MsgStyle)
            } else if (textContent.indexOf('搜索') !== -1) {
              let SearchStyle = Cpstemplete.SearchStyle;
              SearchStyle.zi = curzIndex
              this_.container[idindex].searchList.push(SearchStyle)
            } else if (textContent.indexOf('魔方') !== -1) {
              let CubeStyle = Cpstemplete.CubeStyle;
              CubeStyle.zi = curzIndex;
              this_.$set(this_.container[idindex].container, 'h', '100%')
              this_.container[idindex].cubeList.push(CubeStyle)
            } else if (textContent.indexOf('轮播') !== -1) {
              let SwiperStyle = Cpstemplete.SwiperStyle;
              SwiperStyle.zi = curzIndex;
              this_.container[idindex].swiperList.push(SwiperStyle);
              this_.container[idindex].h = 'auto';
              this_.getSwiper();
            } else if (textContent.indexOf('新闻') !== -1) {
              let ArticleStyle = Cpstemplete.ArticleStyle;
              ArticleStyle.zi = curzIndex;
              this_.container[idindex].articleList.push(ArticleStyle);
              this_.currentcps = 'articlebg';
              this_.$set(this_.container[idindex].container, 'h', '100%')
              this_.getSwiper();
            } else if (textContent.indexOf('商品') !== -1) {
              let ShopStyle = Cpstemplete.ShopStyle;
              ShopStyle.zi = curzIndex;
              this_.container[idindex].shopList.push(ShopStyle);
              this_.$set(this_.container[idindex].container, 'h', '100%')
              this_.getSwiper();
            }
            // console.log(this_.container)
            setTimeout(() => { this_.draggable(); }, 100)
            // $(this).find('.selectcps').remove();
          }
        }
      })
      $('#sortable').sortable({
        // revert: '200',
        items: 'li:not(.cannotdrag)',
        axis: 'y',
        placeholder: 'ui-state-highlight',
        scrollSpeed: 40,
        start: function () {
          $('#sortable').addClass('droping')
        },
        stop: function () {
          $('#sortable').removeClass('droping');
          // var sortedIDs = $('#sortable').sortable('toArray');
          // console.log(sortedIDs)
        }
      });
      setTimeout(() => { this.draggable(); this_.sortableResizable(); }, 200)
      $('.cannotdrag').disableSelection();
    },
    // 加载地图
    mapInit () {
      this.container.forEach((item, index) => {
        if (item.mapList && item.mapList.length > 0) {
          this.$refs.mapchild.changeCurrentMapStyle(item.mapList[0], '', index);
        }
      })
    },
    // 元素拉伸操作
    resize () {
      let this_ = this;
      $('#sortable li a.activebtn').resizable({
        handles: 'n,s,e,w,ne,se,sw,nw',
        autoHide: true,
        containment: 'parent',
        maxWidth: 370,
        resize: function (event, ui) {
          this_.setCpsValue(event, ui);
        }
      })
    },
    // 通栏拉伸操作
    sortableResizable () {
      let this_ = this;
      $('#sortable li.ui-state-default').resizable({
        handles: 's',
        autoHide: true,
        resize: function (event, ui) {
          let idindex = event.target.attributes[0].value;
          this_.$set(this_.container[idindex].container, 'h', ui.size.height)
        }
      })
    },
    // 元素拖拽操作
    draggable () {
      let this_ = this;
      setTimeout(() => {
        $('#sortable li a.dragbtn,.cubechild').draggable(
          {
            containment: 'parent',
            helper: 'original',
            // stack: '#sortable li a',
            // start: function (event, ui) {
            // $('#sortable').addClass('overhidden');
            // },
            stop: function (event, ui) {
              $('#sortable li .ui-draggable').removeClass('activebtn');
              $('a.dragbtn').removeClass('activebtn');
              // console.log(event.target.className)
              $(event.target).addClass('activebtn');
              setTimeout(() => { this_.setCpsValue(event, ui) }, 100)
            }
          }
        )
      }, 100)
    },
    // 设置元素位置
    setCpsValue (event, ui) {
      // console.log(this.selstyleName, ui)
      const classname = event.target.className;
      if (classname.indexOf('btnchild') !== -1) {
        this.$refs.btnchild.setpostion(ui.position);
        if (ui.size) this.$refs.btnchild.setWidthHeight(ui.size);
      } else if (classname.indexOf('picchild') !== -1) {
        this.$refs.picchild.setpostion(ui.position);
        if (ui.size) this.$refs.picchild.setWidthHeight(ui.size);
      } else if (classname.indexOf('textchild') !== -1) {
        this.$refs.textchild.setpostion(ui.position);
        if (ui.size) this.$refs.textchild.setWidthHeight(ui.size);
      } else if (classname.indexOf('titlechild') !== -1) {
        this.$refs.titlechild.setpostion(ui.position);
        if (ui.size) this.$refs.titlechild.setWidthHeight(ui.size);
      } else if (classname.indexOf('videochild') !== -1) {
        this.$refs.videochild.setpostion(ui.position);
        if (ui.size) this.$refs.videochild.setWidthHeight(ui.size);
      } else if (classname.indexOf('mapchild') !== -1) {
        this.$refs.mapchild.setpostion(ui.position);
        if (ui.size) this.$refs.mapchild.setWidthHeight(ui.size);
      } else if (classname.indexOf('msgchild') !== -1) {
        this.$refs.msgchild.setpostion(ui.position);
      } else if (classname.indexOf('searchchild') !== -1) {
        this.$refs.searchchild.setpostion(ui.position);
        if (ui.size) this.$refs.searchchild.setWidthHeight(ui.size);
      } else if (classname.indexOf('swiperchild') !== -1) {
        this.$refs.swiperchild.setpostion(ui.position);
        if (ui.size) this.$refs.swiperchild.setWidthHeight(ui.size);
      } else if (classname.indexOf('cubechild') !== -1) {
        this.$refs.cubechild.setpostion(ui.position);
      }
    }
  }
}

</script>
<style lang="less">
  @sprites: "/client/assets/images/sprites.png";
  .title_area{cursor: move;}
  .amap-lib-infowindow-content-wrap{line-height: 20px !important;}
  .mapmove{width:30px;height:30px;position: absolute;top:2px;right:0;z-index: 10000;background: #b16f6b82;cursor: move;text-align: center;line-height: 30px;font-size: 12px;display: none;}
  &:hover .mapmove{display: block;}
  .mapcontent{position: relative;cursor: default;
    width:100%;height:100%;border:0px solid #fff;box-sizing:border-box;
    .containermap{width:100%;height:100%;border: 1px solid #ccc;
    }
    p{width:100%;height:30px;line-height: 30px;font-size: 12px;color:#333;position: absolute;border-top: 1px solid #ccc;overflow: hidden;text-overflow:ellipsis;
    white-space:nowrap;bottom: 0;left: 1px;background: #fff;z-index: 90;text-align: left;text-indent:10px;cursor: move;}
  }
  // .contentmain{position: absolute;top: 44px;left: 0;background: #e4e7ed;}
  #sortable li.jishutxt{width:100%;height:30px;min-height:30px;border:none;margin-top:0px;line-height: 30px;color:#333;font-size: 14px;text-align: center;overflow: hidden;cursor: pointer;}
  .minimask{width:100%;height:100%;position: absolute;top:0;left:0;}
  .mask_area{width:100%;height:100%;position: absolute;z-index: 100;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;top:0;left:0;}
  .candrag_area{width: 100%;min-height: 160px;}
  .yuansu_name{width:100%;height:40px;cursor: pointer;       border-bottom: 1px solid #eceef2;
    span{color:#333;font-size:14px;line-height: 40px;padding-left:20px;}
    &::before{content:'';transition: all 0.3s ease;display:block;width:15px;height:15px;    margin: 15px;float: right;background: url(/client/assets/images/sprites.png) no-repeat;background-position: -310px -102px;}
  }
  .addzujian{width:100px;height:30px;display:block;text-align:center;line-height:30px;color:#333;font-size:15px;margin:10px auto;}
  .displaynone{display:none;}
  .minput{border: 1px dotted #ccc;height: 30px;padding: 0 5px;margin: 5px;    display: block;width:100px;}

  @keyframes myfirst{
    from {transform: scale(0.2)}to {transform: scale(1.2)}
  }
  @keyframes transleft{
    from {transform: translate3d(-100px,0,0)}to {transform: translate3d(0,0,0)}
  }
  .elcps{    width: 100%;max-width: 400px;}
  .wechatpic{position:relative;width:100%;height:64px;background: url(/client/assets/images/wechattitle.png) no-repeat;background-color: #7e33dc;background-size:100% auto;cursor: pointer;
    span{position: absolute;bottom: 0; left: 0;color:#fff;display:block;width:100%;    font-weight: 600;height:30px;font-size: 16px;line-height: 20px;text-align: center;}
  }
  #sortable { width:375px;margin:0 auto;list-style-type: none; padding: 0;
    position: absolute;top:0;
  }
  #sortable li { margin: 0px 0 10px;width:375px !important;height: 300px;min-height:100px;border:1px dotted #ccc;position: relative;box-sizing: border-box;background: #ebeef5;
    &.li_avigation{position: absolute;bottom:0;left:0;margin:0;height:57px;}
    .flnav{width:25px;position: absolute;top:0;right:-25px;background:#7c7e83;z-index: 1000;display:none;
      span{width:100%;height:25px;text-align: center;display: block;border-bottom:1px solid #333;cursor: pointer;
        &.ico1:before{content:'';display:block;width:11px;height:11px;background: url(/client/assets/images/editspan.png) no-repeat;margin:0px auto;position: relative;top:7px;}
        &.ico2:before{content:'';display:block;width:11px;height:11px;background: url(/client/assets/images/copyspan.png) no-repeat;margin:0px auto;position: relative;top:7px;}
        &.ico3:before{content:'';display:block;width:7px;height:11px;background: url(/client/assets/images/upspan.png) no-repeat;margin:0px auto;position: relative;top:7px;}
        &.ico4:before{content:'';display:block;width:7px;height:11px;background: url(/client/assets/images/downspan.png) no-repeat;margin:0px auto;position: relative;top:7px;}
        &.ico5:before{content:'';display:block;width:11px;height:11px;background: url(/client/assets/images/deletespan.png) no-repeat;margin:0px auto;position: relative;top:7px;}
      &:hover{background-color:#606266; }
      }
    }
    .selectcps{width:100px;height:30px;text-align: center;line-height: 30px;font-size: 14px;position: absolute;top:30px;left:0;right:0;bottom:0;margin:auto;background:#1890ff;color:#fff;border-radius:5px;cursor: pointer;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;
      &:before{content:"请从左侧组件库添加组件";width:156px;height:30px;text-align:center;line-height: 30px;position: absolute;top:-35px;left: -25px;color: #606266;}
    }
    &:hover{border: 1px dashed #1890ff;}
    &:hover .flnav{display:block;}
    a.ui-draggable{display: inline-block;text-align: center;cursor: move;}
    a{display: inline-block;box-sizing:border-box;
      &.haspic img{width:100%;height:100%;display: block;position: absolute;border:none;pointer-events: none;    top: 0;left:0;}
      &:hover::before{content:'';width:100%;height:100%;position: absolute;top:-1px;left:-1px;border:1px dashed #1890ff;display: block;}
      &.btn span{color:inherit;font-size:inherit;display:block;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;}
    }
    a.haspic p{display: none;}
    a.ui-resizable-autohide::before{display: none;}
    a.title{width:100% !important;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}
  }
 #controlarea{width:100px;position: absolute;top:0;right:0;box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);z-index: 10000;background:#fff;border-radius:0 0 4px 4px;display: none;
      span{display: block;text-align:center;width:100%;height:30px;line-height: 30px;color:#333;cursor: pointer;
      &:hover{background:#e8f4ff;}
      }
    }
  .mini{width:70%;float:right;position:relative;flex: 1;z-index: 100;}
  .P_sortable{width:375px;height:610px;overflow-x:hidden;overflow-y:auto;padding:0;box-sizing:border-box;    background-size: cover !important;
      background: #f4f4f4;
  }
  .scrollstyle{
    &::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
        background-color:#f8f8f8;
      }
      &::-webkit-scrollbar {//滚动条的宽度
        width:.5px;height:9px;
      }
      &::-webkit-scrollbar-thumb {//滚动条的设置
          background-color:#1890ff;background-clip:padding-box;min-height:28px;
      }
      &::-webkit-scrollbar-thumb:hover {
          background-color:#bbb;
      }
  }
  #minipro{
    width:375px;position: absolute;right:0;top:5%;
    height:730px;box-sizing:border-box;background: #f4f4f4;
    // top:50%;margin-top:-365px;
    box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
  }
  
  /* .g_middle{width:100%;height:30px;border:1px dotted #5a8ae2;display: block;position:absolute;top:-30px;left:0;display: none;} */
  .ui-state-default:hover .g_middle{display: block;display:block;background: #f4f4f4;}
  .ui-state-default{ position: relative; margin-top:10px;  border: none;}
  .ui-state-default, .ui-widget-content .ui-state-default, .ui-widget-header .ui-state-default {
      /* border: 1px solid #d3d3d3; */
      background: #fff;
      font-weight: 400;
      color: #555;
  }
  .ui-state-default:hover::before{content:'';width:100%;height:100%;position: absolute;top:-1px;left:0px;z-index:100;border: 1px dotted #5a8ae2;}
  .ui-state-default h1{text-align: center;line-height: 35px; border-bottom: 1px dotted #aaa;padding:0;margin:0;color:#333;font-size: 15px;width:100%;height:35px;background: #fff;}
  /* .active .ui-state-default{margin-top:32px;} */
  /* #div2:hover .ui-state-default{margin-top:30px;} */
  .item{border-top:1px solid #d3d3d3}
  .overhidden{overflow: hidden;}
  #sortable li.addtonglan{box-sizing:border-box;text-align: center;min-height: 100px;height: 100px !important;border:1px dotted #c5c5c5;background: #fff;margin:0;
    span{line-height: 100px;color:#c5c5c5;font-size:14px;
      &::before{content:'';position:relative;top:2px;display:inline-block;width:25px;height:15px;
      background:url('@{sprites}') no-repeat;background-position: -647px -149px;}
    }
    cursor: pointer;
    &:hover{
      border:1px dashed #1890ff;
      span{color:#1890ff;
        &::before{content:'';background-position: -680px -149px;}
      }
    }
  }
  #sortable.droping li.addtonglan{display: none;}
  #sortable li.ui-state-highlight {height: 50px !important; line-height: 50px;border:1.3px dashed #1890ff;background:none;opacity:0.5;
    &:before{content:'要放在这里吗?';display:block;width:100%;height:100% !important;color:#1890ff;position: absolute;top:0;left:0px;text-align: center;background: #e8f4ff;}
  }
  .psort{width: 403px;height: 610px;overflow: auto;position: absolute;overflow-x: hidden;z-index: 9999;}
  #sortable li:hover .mask_area{border:1px dashed #1890ff;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}
  #sortable li.ui-state-hover{border: 1px dotted #1890ff;}
  #sortable li .textedit{cursor:default;min-height:30px;position: relative;
    textarea{resize: none;overflow: hidden;width:100%;height:100%;}
  }
  ul#editbtns{box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.2);position: absolute;top:0;right:-100px;display: none;
    width:100px;z-index: 10000;
    li{width:100%;height:30px;text-align: center;background: #fff;color:#333;font-size: 12px;line-height: 30px;margin: 0;border: none;cursor: pointer;
      &:hover{background: #e8f4ff;}
      &::before{content:'';display:inline-block;background:url('@{sprites}') no-repeat;width:15px;height:15px;position: relative;top: 3px;left: -4px;}
      &.ico1::before{background-position:0px -185px;}
      &.ico2::before{background-position:-65px -185px;}
      &.ico3::before{background-position:-97px -185px;}
      &.ico4::before{background-position:-130px -185px;}
      &.ico5::before{background-position:-129px -185px;}
      &.ico6::before{background-position:-161px -185px;}
      &.ico7::before{background-position:-192px -185px;}
      &.ico8::before{background-position:-586px -104px;}
      .ui-resizable-handle{display: none !important;}
    }
  }
  video{width:100%;height:100%;}
  .msg1{box-sizing: border-box;
    .sub{overflow: hidden;background:#1890ff;text-align: center;line-height: 40px;border-radius:5px;margin-bottom:10px;}
  } 
</style>