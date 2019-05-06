<template>
  <div id="Navigation" class="navigation">
    <div class="navigation_content" :class="{'opacity0': tabbarinfo.showTabBar == 0}" :style="{'background': tabbarinfo.backgroundColor}">
      <a class="" :class="{'active': currentnav == index,'hidetxt': tabbarinfo.tabBarType == '0'}" v-for="(item,index) in tabbarinfo.list" :key="index" @click="changeTabbarActive(item, index)">
        <img :src="showstate.Imgdomain + item.iconPath"  v-show="currentnav !== index"/>
        <img :src="showstate.Imgdomain + item.selectedIconPath" v-show="currentnav == index"/>
        <span :data="tabbarinfo.tabBarType" :style="{'color': currentnav == index?showstate.NavigatorSet.selectedColor:showstate.NavigatorSet.color}">{{item.pageName}}</span>
      </a>
      <ul class="editbtncon">
        <li @click="selnavbtn()">
          <el-tooltip class="item" popper-class="borderlight" effect="dark" content="编辑" placement="right">
            <span class="span1"></span>
          </el-tooltip>
        </li>
        <li class="span2"  @click="hidenavbtn()">
          <el-tooltip class="item" effect="dark" content="隐藏" placement="right">
            <span class="span2"></span>
          </el-tooltip>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import app from '../../fetch/api.js'
  import { mapState, mapMutations } from 'vuex';
  // import $ from 'jquery'
  export default {
    props: {
      tabbarinfo: {type: Object, require: true}
    },
    data () {
      return {
        currentnav: 0,
        navlist: [],
        showNavigation: true
      }
    },
    computed: {
      ...mapState({showstate: state => state}),
      getcurrentshowTabBar () {
        return this.showstate.NavigatorSet;
      }
    },
    watch: {
      getcurrentshowTabBar (val) {
        this.tabbarinfo = val;
        // console.log('11111111')
      },
      tabbarinfo: {
        handler (curVal, oldVal) {
          this.showstate.NavigatorSet = this.tabbarinfo;
          this.tabbarinfo.list.forEach((item, index) => {
            if (item.pageInfoId === 1) this.currentnav = index;
          })
        }
      }
    },
    methods: {
      ...mapMutations(['saveAllPageInfo']),
      ...mapMutations(['setCurrentPageInfo']),
      ...mapMutations(['setPageData']),
      selnavbtn (item, index) {
        this.$emit('setcpsName', 'showBottomNavcpsStyle')
      },
      hidenavbtn (item, index) {
        this.showstate.NavigatorSet.showTabBar = 0;
      },
      changeTabbarActive (item, index) {
        this.$emit('setcpsName', 'hidecps');
        this.currentnav = index;
        if (item.pageInfoId === this.showstate.CurrentPageInfo.id) return false;
        this.SaveLastPage(item)
      },
      SaveLastPage (item) {
        // console.log(this.showstate.currentPageData);
        let page1datas = {pages1: this.showstate.currentPageData, Zindex: this.showstate.domZindex};
        let subData = {miniappId: this.showstate.miniappId, pageName: this.showstate.CurrentPageInfo.pageName, id: this.showstate.CurrentPageInfo.id, pageDetails: JSON.stringify(page1datas)}
        // 替换最新的数据
        if (this.findpageid(subData.id)) {
          this.showstate.AllPageInfo[this.findpageid(subData.id)] = subData;
        }
        this.showstate.CurrentPageInfo.id = item.pageInfoId;
        this.showstate.CurrentPageInfo.pageName = item.pageName;
        this.saveAllPageInfo(this.showstate.AllPageInfo);
        this.getcurrentdata(item);
      },
      getcurrentdata (item) {
        if (!this.findpageid(item.pageInfoId)) {
          const loading = this.$loading({lock: true, text: '获取当前页面数据中...,请稍后', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)'});
          // 如果缓存中不存在需要查询的id，则通过接口读取
          app.getfetch('/page/get/' + item.pageInfoId + '/' + this.showstate.miniappId).then((res) => {
            let currentpageInfo = res.data.data.pageInfo;
            if (currentpageInfo.pageDetails !== '') {
              this.pagedata = [];
              this.pagedata = JSON.parse(currentpageInfo.pageDetails).pages1;
            } else {
              this.pagedata = [];
            }
            let pagedata = {id: item.pageInfoId, miniappId: this.showstate.miniappId, pageDetails: currentpageInfo.pageDetails}
            this.showstate.AllPageInfo.push(pagedata)
            this.setPageData(this.pagedata);
            loading.close();
          }).catch(() => {
            loading.close();
            this.$message.error('获取当前页面管理数据失败！');
          })
        } else {
          // 如果缓存中存在需要查询的id，则直接读出来
          // console.log(JSON.parse(this.showstate.AllPageInfo[this.findpageid(item)].pageDetails).pages1);
          this.setPageData(JSON.parse(this.showstate.AllPageInfo[this.findpageid(item.pageInfoId)].pageDetails).pages1);
        }
        this.setCurrentPageInfo({id: item.pageInfoId, pageName: item.pageName})
      },
      findpageid (id) {
        let flag = false;
        this.showstate.AllPageInfo.forEach((item, index) => {
          if (id === item.id) flag = index;
        });
        return flag;
      }
    }
  }
</script>
<style lang="less">
  @sprites: "/client/assets/images/sprites.png";
  div.navigation{width:100%;height:100px;
    .navigation_content{position: relative;display: flex;background: #fff;box-shadow: 2px 2px 6px 0px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;z-index: 100;height:57px;border: 1px dashed #fff;
      &.opacity0{opacity: 0;pointer-events: none;}
      &:hover,&.active{border: 1px dashed #1890ff;}
    }
    a{display: block;flex: 1;color:#a7a7a7;text-align: center;cursor: pointer;    font-size: 12px;transition:all 0.3s ease;
      img{display: block;margin:5px auto 0px;width:30px;height:30px;}
      span{width:100%;height:20px;margin: 0px auto 0px;display: block;font-size: 12px;display: block;}
      &.hidetxt {
        img {margin:15px auto 0;}
        span{display: none;}
      }
      &.active{background:#e2e2e2}
    }
    .editbtncon{width:30px;height:30px;position: absolute;top:-1px;right:-30px;display: none;
      li{width:100%;height:28.5px;text-align: center;background: #7c7e83;
        span{width:100%;height:100%;display: block;}
        .span1::before{content:'';display:block;width:20px;height:20px;background:url(/client/assets/images/editspan.png) no-repeat;position: relative;top:10px;left:11px;cursor: pointer;}
        .span2::before{content:'';display:block;width:20px;height:20px;background:url(/client/assets/images/deletespan.png) no-repeat;position: relative;top:10px;left:11px;cursor: pointer;}
        &:hover {background-color: #606266;}
      }
    }
    &:hover .editbtncon{display: block;}
  }
  .navigation.ui-state-hover .navigation_content.opacity0{opacity: 1;}
</style>

