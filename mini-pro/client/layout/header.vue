<template>
  <div class='header-plus'> 
      <div class='headercontent'>
        <a class='head-toptray-logo clearfix'></a>
        <ul class='head_right'>
            <li><a :href="'http://test.app1.cangluxmt.com/?appid='+ showstate.miniappId" target="_blank"><span>预览</span></a></li>
            <!-- <li><a href="http://127.0.0.1:8082" target="_blank"><span>预览</span></a></li> -->
            <li class='save' @click='save()'><span>保存</span></li>
            <li class='Release'><span>发布</span></li>
        </ul>
        <ul class='head_center'>
            <!-- <li><router-link title='选择模板' to='/protemplate'><span>模板</span></router-link> </li> -->
            <li @click="ChooseTemplate('slider')"><span>模板</span></li>
            <li @click="setcpsName('showstyle')"><span>风格</span></li>
            <li><span>后台</span></li>
            <li><span>管理</span></li>
        </ul>
    </div>
  </div>
</template>
<script>
  import { mapState, mapMutations } from 'vuex';
  import app from '../fetch/api.js'
  export default{
    props: {
      container: {
        type: Array, require: true
      }
      // WindowConfig: {
      //   type: Object, require: true
      // }
    },
    computed: {
      ...mapState({showstate: state => state})
    },
    methods: {
      ...mapMutations(['saveAllPageInfo']),
      ChooseTemplate (name) {
        this.$emit('ChooseTemplatebtn', name)
      },
      setcpsName (name) {
        this.$emit('setcpsName', name)
      },
      findpageid (subData) {
        let flag = 0;
        this.showstate.AllPageInfo.forEach((item, index) => {
          if (subData.id === item.id) flag = index;
        });
        return flag;
      },
      // 保存数据
      save () {
        const loading = this.$loading({lock: true, text: '保存中,请稍后...', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)'});
        let page1datas = {pages1: this.showstate.currentPageData, Zindex: this.showstate.domZindex};
        let subData = {miniappId: this.showstate.miniappId, pageName: this.showstate.CurrentPageInfo.pageName, id: this.showstate.CurrentPageInfo.id, pageDetails: JSON.stringify(page1datas)}
        // 保存当前页最新的数据
        this.showstate.AllPageInfo[this.findpageid(subData)] = subData;
        this.saveAllPageInfo(this.showstate.AllPageInfo);
        console.log(this.showstate.AllPageInfo)
        app.postfetch('/page/update', this.showstate.AllPageInfo).then(() => {
          let index0 = 0;
          let NavigatorSet = this.showstate.NavigatorSet;
          NavigatorSet.list.forEach((item, index) => {
            if (item.pageInfoId === this.showstate.IndexPageId) index0 = index + 1;
            if (item.pageInfoId !== this.showstate.IndexPageId) {
              let curindex = index + 1;
              let cur = curindex === 5 ? index0 : curindex;
              item.pagePath = 'pages/index' + cur + '/index' + cur;
            }
          });
          // console.log(NavigatorSet)
          let bottomNavsubData = {miniappId: this.showstate.miniappId,
            showTabBar: NavigatorSet.showTabBar,
            tabBarType: NavigatorSet.tabBarType,
            tabBar: JSON.stringify(NavigatorSet),
            navigatorBackColor: this.showstate.AllStyle.navigatorBackColor,
            themeColor: this.showstate.AllStyle.themeColor,
            themeColorHelp: this.showstate.AllStyle.themeColorhelp,
            bgColor: this.showstate.CurrentBGImageUrl.bgColor,
            bgImg: this.showstate.CurrentBGImageUrl.bgImg,
            showSupport: 1,
            supportText: JSON.stringify(this.showstate.supportText)
          }
          this.$message.success('保存成功！');
          app.postfetch('/tabBar/update', bottomNavsubData)
        }).catch(() => {
          this.$message.error('保存页面数据失败！');
        }).finally(() => {
          loading.close();
        })
      }
    }
  }
</script>
<style lang='less'>
.headercontent{
    transform:translateY(-100%);    transition: all .5s ease .5s;
}
.showcps .headercontent{transform:translateY(0);}
.header-plus{overflow: hidden;}
.header-plus .el-button{display: none;}
.head-toptray-logo{background: url(/client/assets/images/sprites.png) no-repeat;  
    background-position: 0px 0px;  float: left;display:block;width:120px;height:18px;margin:13px;}
.header-plus{position: relative;z-index: 1;color:#666;width: 100%;margin: 0;background: #fff;height:44px;
    li{text-align: center;cursor: pointer;width:100px;height:44px;
        span::before{position:relative;top:6px;width:25px;height: 20px;display:inline-block;background: url(/client/assets/images/sprites.png) no-repeat;}
        span{line-height: 44px;color:#434343;font-size: 14px;}
        &:hover span{color:#8ac7ff; }
        transition: all 0.5s ease;
    }
    border-bottom:1px solid #e1e4ea;
    // overflow: hidden;
    box-sizing: border-box;
    // box-shadow: #1890ff;
}
.head_center{width:400px;height:44px;margin: auto;
    li{float: left;width:100px;height:44px;text-align: center;cursor: pointer;
        &:nth-child(1) span::before{content:'';background-position: -140px 0px;}
        &:nth-child(2) span::before{content:'';background-position: -174px 0;}
        &:nth-child(3) span::before{content:'';background-position: -209px 0;}
        &:nth-child(4) span::before{content:'';background-position: -243px 0;}
        &:hover {background:#e8f4ff;color:#095faf; }
    }
}
.head_right{width:300px;height:44px;float:right;
    li{float: left;
        &.Release {background:#1890ff; }
        &.Release span{color:#fff; }
        &:nth-child(1) span:before{content:'';background-position: -277px 0;}
        &:nth-child(1):hover span:before{content:'';background-position: -312px 0;}
        &:nth-child(2) span::before{content:'';background-position: -345px 0;}
        &:nth-child(2):hover span::before{content:'';background-position: -380px 0;}
        &:nth-child(3) span::before{content:'';background-position: -413px 0;}
        &:hover{background:#1890ff;
            span,a{color:#fff;display: block;}
        }
    }
}
</style>

