<template>
  <div class="BottomNavcps style_select">
    <div class="stylename">底部导航</div>
    <ul class="btnchangestyle">
      <li>
          <el-radio v-model="tabBarType" label="1">文字+图片</el-radio>
          <el-radio v-model="tabBarType" label="0">图片</el-radio>
      </li>
      <li>
        <a class="fl" >背景颜色</a>
        <span class="rel fl">
          <el-color-picker v-model="NavigatorSet.backgroundColor"  :predefine="predefineColors"></el-color-picker>
          <span class="colorspan fl">{{NavigatorSet.backgroundColor}}</span>
        </span>
      </li>
      <li>
        <a class="fl" >默认字体颜色</a>
         <span class="rel fl">
          <el-color-picker v-model="NavigatorSet.color"  :predefine="predefineColors"></el-color-picker>
          <span class="colorspan fl">{{NavigatorSet.color}}</span>
         </span>
      </li>
      <li>
        <a class="fl" >选中字体颜色</a>
         <span class="rel fl">
          <el-color-picker v-model="NavigatorSet.selectedColor"  :predefine="predefineColors"></el-color-picker>
          <span class="colorspan fl">{{NavigatorSet.selectedColor}}</span>
         </span>
      </li>
      <li>
        <a class="fl pdr0" >导航设置：</a>
        <el-tooltip class="item" effect="light" content="微信规定,底部导航最多添加5个，最少2个" placement="top">
          <span class="iconav"></span>
        </el-tooltip>
        <span class="fr mr10 addNavbtn" @click="addNavbtn()" :class="{'ishome': NavigatorSet.list && NavigatorSet.list.length > 4}">添加导航</span>
        <table id="navtable">
          <tr><td>导航文字</td><td>链接地址</td>
          <td>默认</td><td>选中</td><td>排序</td><td>操作</td>
          </tr>
          <tr v-for="(item,index) in NavigatorSet.list" :key="index">
            <td>
              <el-input class="" v-model="item.pageName"  title="单击更改导航文字" placeholder="输入内容"></el-input>
            </td>
            <td class="pagenamesel">
              <el-select class="fl" v-show="item.pageInfoId !== 1" v-model="item.pageInfoId" placeholder="请选择">
                <el-option v-show="items.id !== 1" v-for="items in pagelist" :key="items.id" :label="items.pageName" :value="items.id"></el-option>
              </el-select>
              <el-select class="fl" disabled v-show="item.pageInfoId == 1" v-model="item.pageInfoId" placeholder="请选择">
                <el-option v-show="items.id == 1" v-for="items in pagelist" :key="items.id" :label="items.pageName" :value="items.id"></el-option>
              </el-select>
              </td>
            <td @click="uploadicon(item,index)"><span class="img"><img :src="showstate.Imgdomain + item.iconPath"></span></td>
            <td @click="uploadicon(item,index,'selectedicon')"><span class="img"><img :src="showstate.Imgdomain + item.selectedIconPath"></span></td>
            <td class="updown"> 
              <span v-if="index > 0" @click="upmove(item,index)" >↑</span>
              <span v-if="index < NavigatorSet.list.length-1" @click="downmove(item,index)">↓</span>
            </td>
            <td>
              <!-- <span class="editbtn" :class="{'ishome':item.pageInfoId==1}" @click="editbtn()"></span> -->
            <span class="deletebtn" :class="{'del':NavigatorSet.list.length<3, 'ishome':item.pageInfoId==1}" @click="deleteNav(item, index)"></span></td>
          </tr>
        </table>
      </li>
    </ul>
  </div>
</template>
<script>
// import app from '../../fetch/api.js'
import { mapState, mapMutations } from 'vuex';

export default{
  data () {
    return {
      NavigatorSet: {},
      tabBarType: '1',
      isshowupload: false,
      pagelist: []
      // pageid: ''
    }
  },
  computed: {
    ...mapState({showstate: state => state}),
    getNavigatorSet () {
      return this.showstate.NavigatorSet;
    }
  },
  watch: {
    getNavigatorSet (val) {
      this.NavigatorSet = val;
    },
    // pageid (curVal) {
    //   console.log(curVal, this.pagelist);
    // },
    NavigatorSet: {
      handler (curVal, oldVal) {
        this.showstate.NavigatorSet = this.NavigatorSet;
        this.tabBarType = this.NavigatorSet.tabBarType;
        // console.log(this.NavigatorSet)
      }
    },
    tabBarType: {
      handler (curVal, oldVal) {
        this.NavigatorSet.tabBarType = this.tabBarType;
        // console.log(this.showstate.NavigatorSet)
      }
    }
  },
  methods: {
    ...mapMutations(['openNavicopop']),
    ...mapMutations(['uploadNavicoimg']),
    changeCurrentNavigatorSet () {
      this.NavigatorSet = this.showstate.NavigatorSet;
      // console.log(this.NavigatorSet)
      this.pagelist = JSON.parse(window.sessionStorage.getItem('pagelistinfo'));
      // console.log(this.pagelist)
    },
    updateBottomNav () {
      this.updateBottomNavUpload(this.showstate.NavigatorSet);
    },
    addNavbtn () {
      if (this.NavigatorSet.list.length > 4) {
        this.$message.error('微信规定最多只能添加5个导航哦！');
        return false;
      }
      this.NavigatorSet.list.push({pageName: '自定义', pageInfoId: '请选择', pagePath: '', iconPath: 'icon/icon11_01.png', selectedIconPath: 'icon/icon10_01.png'});
    },
    deleteNav (item, index) {
      if (this.NavigatorSet.list.length < 3) {
        this.$message.error('最少保留2个导航！');
        return false;
      } else if (item.pageInfoId === this.showstate.IndexPageId) {
        this.$message.error('首页不能删除！');
        return false;
      }
      this.NavigatorSet.list.splice(index, 1);
    },
    uploadicon (item, index, selectedIconPath) {
      // console.log(item)
      this.openNavicopop(true);
      if (selectedIconPath) {
        this.uploadNavicoimg({selectedIconPath: item.selectedIconPath, curindex: index, iconPath: item.iconPath, flag: false});
      } else {
        this.uploadNavicoimg({selectedIconPath: item.selectedIconPath, curindex: index, iconPath: item.iconPath, flag: true});
      }
    },
    upmove (item, index) {
      let list = this.NavigatorSet.list;
      let temp = list[index - 1];
      this.$set(list, index - 1, list[index])
      this.$set(list, index, temp)
      console.log(this.NavigatorSet.list)
    },
    downmove (item, index) {
      let list = this.NavigatorSet.list;
      let temp = list[index + 1];
      this.$set(list, index + 1, list[index])
      this.$set(list, index, temp)
      console.log(this.NavigatorSet.list)
    }
    // editbtn (item) {
    //   console.log(item)
    // }
  }
}
</script>
<style lang="less">
  .showBottomNavcpsStyle .BottomNavcps.style_select{transform:translateX(0);}
  .hidecps .showBottomNavcpsStyle.BottomNavcps{transform:translateX(100%);}
  .linkname{width: 65px;overflow: hidden;display: block;margin: 0 auto;}
  .width70{width:70px !important;margin-right:12px;}
  .BottomNavcps li{padding-left: 15px !important;}
  .bgcps .colorspan {width:150px !important;}
  #navtable{width:100%;border:1px solid #ccc;position: relative; left: -7px;
    tr{width:100%;text-align: center;line-height: 40px;height:40px;transition:all 0.3s ease;
        span.img{position: relative;display: block;width:30px;margin:0 auto;background: #eceef2;cursor: pointer;
          img{display: block;width:30px;margin:0 auto;}
          &:before{content:'编辑';display:block;width:100%;height:100%;line-height:30px;font-size:12px;position: absolute;top:0;left:0;display: none;}
          &:hover{background-color:rgba(0,0,0,.5)}
          &:hover:before{display:block;color:#fff;}
        }
        &:hover{background:#ebeef5;}
        input{border:1px dashed #ccc;margin:0 auto;display:block;width:80px;text-align: center;line-height: 30px;color:#303133;font-size: 14px;padding: 0;cursor: pointer;
          &:hover{border:1px dashed #a1c4fe}
        }
        .editbtn{width:14px;height:14px;display: inline-block;background: url(/client/assets/images/b1.png) no-repeat;cursor: pointer;margin: 0 7px;
          &:hover{background: url(/client/assets/images/b2.png) no-repeat;}
        }
        .deletebtn{width:14px;height:14px;display: inline-block;background: url(/client/assets/images/c1.png) no-repeat;cursor: pointer;margin: 0 7px;
          &.del{cursor: not-allowed;}
          &:hover{background: url(/client/assets/images/c2.png) no-repeat;}
        }
    }
  }
  .pagehome{width:97px;    text-align: center;    position: relative;
    left: 11px; border-radius: 5px;height: 30px;line-height: 30px;    border: 1px dashed #ccc;display: block;cursor: not-allowed;}
  .btnchangestyle .fl{font-size: 12px;}
  .iconav{width:20px;height:20px;display:inline-block;position: relative;background: url(/client/assets/images/tishi.png) no-repeat;background-position: center;position: relative;top:4px;
    &.item{border:none;}
  }
  .borderlight{border:1px solid #fff;}
  .addNavbtn{cursor:pointer;width:100px;border:1px solid #ccc;text-align: center;line-height: 30px;color:#333;font-size: 12px;margin-bottom: 10px;
    &:hover{border:1px solid #2797ff;background: #2797ff;color: #fff;}
  }
  .updown span{width:15px;height:15px;color:#909399;font-size: 18px;display: inline-block;cursor: pointer;text-align:center;
    &:hover{color:#2797ff}
  }
  #navtable tr td.pagenamesel input.el-input__inner{width:100px;}
  #navtable .el-select.fl.el-select--small{position: relative;left:10px;}
</style>

