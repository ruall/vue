<template>
  <div class="mapcps style_select">
    <div class="stylename">地图组件</div>
    <div class="mapmask" v-if="!hidepanel">
      <div class="mask" @click="hidepanelbtn()"></div>
      <div id="panel" class="templatescrollstyle"></div>
    </div>
    <ul class="btnchangestyle mapli">
      <li><a
      >查询地址</a><el-input class="input1"  @keyup.enter.native="init(mapStyle.address, '', false)" v-model="mapStyle.address" :value="mapStyle.address" placeholder="请输入内容"></el-input>
      <span  @click="init(mapStyle.address, '', false)" class="searchbtn"></span>
      </li>
      <li><a>地图尺寸</a>
      <span class="mr10">宽:</span><el-input type="number" class="widthinput" v-model="mapStyle.w" min="0" minlength="1" maxlength="3" max="370" placeholder="输入宽度"></el-input>
      <span class="ml10 mr10">高:</span><el-input type="number" class="heightinput" min="0" minlength="1" maxlength="4" v-model="mapStyle.h" placeholder="输入高度"></el-input>
      </li>
      <li><a>地址名称</a>
          <el-radio v-model="isShowtitle" label="0">显示</el-radio>
          <el-radio v-model="isShowtitle" label="1">隐藏</el-radio>
      </li>
      <li><a class="fl">文本设置</a>
        <el-select class="fl" v-model="mapStyle.fs"  placeholder="请选择">
          <el-option v-for="item in fontoptions" :key="item.value" :value="item.value"></el-option>
        </el-select>
        <span class="rel fl ml10">
          <el-color-picker v-model="mapStyle.co" show-alpha  :predefine="predefineColors"></el-color-picker>
          <span class="colorspan">{{mapStyle.co}}</span>
        </span>
      </li>
      <!-- <li>
        <a class="fl">背景颜色</a>
         <span class="rel fl">
          <el-color-picker v-model="mapStyle.bgc" show-alpha  :predefine="predefineColors"></el-color-picker>
          <span class="colorspan fl">{{mapStyle.bgc}}</span>
         </span>
      </li> -->
    </ul>
  </div>
</template>
<script>
import AMap from 'AMap'
export default{
  props: {
    container: {
      type: Array, require: true
    }
  },
  data () {
    return {
      mapStyle: {},
      isShowtitle: '0',
      hidepanel: true,
      curbtnindex: 0,
      currentborderindex: null,
      containerindex: null,
      fontoptions: [
        {value: '12'}, {value: '13'}, {value: '14'}, {value: '15'}, {value: '16'}, {value: '17'}, {value: '18'}, {value: '19'}, {value: '20'}, {value: '24'}, {value: '30'}, {value: '48'}, {value: '60'}, {value: '72'}, {value: '84'}, {value: '96'}, {value: '108'}, {value: '120'}
      ]
    }
  },
  watch: {
    isShowtitle: {
      handler (curVal, oldVal) {
        this.mapStyle.showtitle = this.isShowtitle !== '1';
      }
    },
    mapStyle: {
      handler (curVal, oldVal) {
        let containerindex = this.container[this.containerindex];
        if (containerindex) this.$set(containerindex.mapList, this.curbtnindex, this.mapStyle)
      }
    }
  },
  methods: {
    changeCurrentMapStyle (item, index1, index) {
      this.containerindex = index;
      this.curbtnindex = index1;
      this.mapStyle = JSON.parse(JSON.stringify(item));
      this.isShowtitle = this.mapStyle.showtitle ? '0' : '1';
      this.init(item.address, index)
      // console.log(this.mapStyle)
    },
    // 统一设置所有自定义属性
    ChangeStyle (item) {
      if (this.mapStyle.bgc === null) {
        this.mapStyle.bgc = 'none';
      } else if (this.mapStyle.bdc === null) {
        this.mapStyle.bdc = 'none';
        this.mapStyle.bdw = '0';
      }
    },
    // 父组件伸缩设置width、height
    setpostion (size) {
      setTimeout(() => {
        this.mapStyle.t = size.top;
        this.mapStyle.l = size.left;
      }, 100)
    },
    // 父组件伸缩设置width、height
    setWidthHeight (size) {
      this.mapStyle.w = size.width;
      this.mapStyle.h = size.height;
    },
    // 修改是否显示标题
    ChangeshowtitleStyle () {
      if (this.isshowtitle === '1') {
        this.mapStyle.showtitle = false;
      } else {
        this.mapStyle.showtitle = true;
      }
    },
    init (address, index) {
      let this_ = this;
      this.hidepanel = false;
      var mapid = 'containermap' + this_.containerindex;
      var map = new AMap.Map(mapid, {
        resizeEnable: true
      })
      AMap.service(['AMap.PlaceSearch'], function () {
        var placeSearch = new AMap.PlaceSearch({ // 构造地点查询类
          pageSize: 5,
          pageIndex: 1,
          city: '010', // 城市
          map: map,
          panel: 'panel'
        });
        let addr = address || this_.mapStyle.address;
        // 关键字查询
        placeSearch.search(addr);
        AMap.event.addListener(placeSearch, 'markerClick', function (e) {
          this_.setplaceSearch(e.data)
        })
        AMap.event.addListener(placeSearch, 'listElementClick', function (e) {
          this_.setplaceSearch(e.data)
        })
      });
    },
    setplaceSearch (data) {
      this.mapStyle.latitude = data.location.lat;
      this.mapStyle.longitude = data.location.lng;
      this.mapStyle.address = data.name + data.address;
    },
    hidepanelbtn () {
      this.hidepanel = true;
    }
  }
}
</script>
<style lang="less">
  @sprites: "/client/assets/images/sprites.png";
  .mapmask{width:100%;height:100%;position:absolute;top:0;left:0;z-index: 1000;
    .mask{width:100%;height:100%;}
  }
  #panel {
    position: absolute;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 85px;
    left: 72px;
    width: 300px;
    z-index: 99999;
  }
  .showMapstyle .mapcps.style_select{transform:translateX(0);}
  .hidecps .showMapstyle.mapcps{transform:translateX(100%);}
  .width70{width:70px !important;margin-right:12px;}
  .settextfont{
    .icon{background:url('@{sprites}') no-repeat;background-position: -447px -100px;width:20px;height:20px;    margin: 4px 7px;border: 1px solid #dcdfe6;cursor: pointer;
      &.active{border:1px solid #1890ff;}
      &.icon0{background-position: -254px -184px;margin-left:14px;}
      &.icon1{background-position: -283px -184px;}
      &.icon10{background-position: -315px -184px;}
      &.icon11{background-position: -346px -184px;}
      &.icon20{background-position: -378px -184px;}
      &.icon21{background-position: -412px -184px;}
      &.icon22{background-position: -446px -184px;}
    }
  }
  .mapli{position: relative;}
  .searchbtn{position: absolute;top:9px;right:50px;width:20px;height:20px;
    background:url('/client/assets/images/search1.png') no-repeat; cursor: pointer;
    &:hover{
      background:url('/client/assets/images/search2.png') no-repeat;
    }
  }
</style>

