<template>
  <div class="shopcps style_select">
    <div class="stylename">商品展示组件</div>
    <div class="adminPage flex noborderbottom">
      <a @click="cptpage=0" :class="{'active':cptpage == 0}">编辑</a>
      <a @click="cptpage=1" :class="{'active':cptpage == 1}">设置</a>
    </div>
    <div v-show="cptpage == 0">
      <div class="selectbtn clearfix">
        <p>组件样式</p>
        <a class="btn prevpage" @click="btnclick('prev')"></a> 
        <div class="selbtn">
          <ul :class="{'nextpage':nextpage}">
            <li @click="selstyleimg('article1')" :class="{'active': ArticleStyle.classnm == 'article1'}"><img src="/client/assets/images/wenzlb_a.png" /></li>
            <li @click="selstyleimg('article2')" :class="{'active': ArticleStyle.classnm == 'article2'}"><img src="/client/assets/images/wenzlb_b.png" /></li>      
            <li @click="selstyleimg('article3')" :class="{'active': ArticleStyle.classnm == 'article3'}"><img src="/client/assets/images/wenzlb_c.png" /></li>
            <li @click="selstyleimg('article4')" :class="{'active': ArticleStyle.classnm == 'article4'}"><img src="/client/assets/images/wenzlb_d.png" /></li>
          </ul>
        </div>
        <a class="btn nextpage" @click="btnclick('next')"></a>
      </div>
      <ul class="seltypecon">
        <li><a>选择调取方式:</a>
          <el-radio v-model="seltype" label="0" >选择指定文章</el-radio>
          <el-radio v-model="seltype" label="1" >选择文章分类</el-radio>
        </li>
        <li class="btnlink" v-if="seltype == '1' || seltype == '0'"><a>选择分类:</a>
          <el-select v-model="ArticleStyle_link" placeholder="请选择分类">
            <el-option v-for="items in articleSortList" :key="items.id" :label="items.name" :value="items.id"></el-option>
          </el-select>
          <span @click="refresh" class="refreshbtn">刷新</span>
        </li>
        <li v-if="seltype == '1'"><a>文章数量:</a><el-input class="input1" style="width:50px;" type="number" v-model="ArticleStyle.limitNum" placeholder="输入"></el-input> 个</li>
      </ul>
      <div class="selectarticle article-basic" v-if="seltype == '0'">
        <!-- <div class="">
          <p class="selarticlebtn">选择文章</p>
          <el-input class="input1" type="text" v-model="ArticleStyle.con" placeholder="请输入"></el-input>
        </div> -->
        <div class="setting-content-block">
          <div class="jz_transfer">
            <div class="jz_transfer_panel jz_transfer_source">
              <div class="jz_transfer_operation is-has-add">
                <div class="jz_transfer_filter jz-input-wrapper">
                  <!-- <input type="text" placeholder="搜索文章" class="jz-input"> -->
                  <el-input class="jz-input" type="text" style="border:none;" v-model="searchDetailtext" placeholder="搜索文章"></el-input>
                  <i class="jz-input-icon jz_transfer_icon_search"></i>
                  <!-- <i class="jz-input-icon jz_transfer_icon_search1"></i> -->
                </div>
              </div>
              <div class="jz_transfer_content">
                <div class="jz-scrollbar is-transfer">
                  <div class="scrollbar-wrap">
                    <div class="scrollbar-resize">
                      <div class="scrollbar-view scrollstyle templatescrollstyle">
                        <ul class="jz_transfer_list" style="">
                          <li class="jz_transfer_item" v-for="(item,index) in articleListDetail" :key="index" @click="addArticleDetail(item, index)">
                            <span class="jz_transfer_label">{{item.title}}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="jz_transfer_arrow active">
            </div>
            <div class="jz_transfer_panel jz_transfer_target">
              <div class="jz_transfer_content">
                <div class="jz-scrollbar is-transfer">
                  <div class="scrollbar-wrap" >
                    <div class="scrollbar-resize" >
                      <div class="scrollbar-view scrollstyle templatescrollstyle">
                        <ul class="jz_transfer_list" style="">
                          <li class="jz_transfer_item" v-for="(item,index) in ArticleStyle.articleLists" :key="index">
                            <span class="jz_transfer_label">{{item.title}}</span>
                            <div class="jz_transfer_button is-first">
                              <i class="jz_transfer_icon_up" @click="upmovebtn(index)" v-if="index > 0"></i>
                              <i class="jz_transfer_icon_down" @click="downmovebtn(index)"  v-if="index < ArticleStyle.articleLists.length-1"></i>
                              <i class="jz_transfer_icon_del" @click="dellistbtn(item,index)"></i>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="cptpage == 1">
      <ul class="btnchangestyle">
        <li><a class="fl">标题文字:</a>
          <el-select class="fl" v-model="ArticleStyle.fs"  placeholder="请选择">
            <el-option v-for="item in fontoptions" :key="item.value" :value="item.value"></el-option>
          </el-select>
          <span class="rel fl ml10">
            <el-color-picker v-model="ArticleStyle.co" show-alpha :predefine="predefineColors"></el-color-picker>
            <span class="colorspan">{{ArticleStyle.co}}</span>
          </span>
        </li>
        <li><a class="fl">详情文字:</a>
          <el-select class="fl" v-model="ArticleStyle.desfs"  placeholder="请选择">
            <el-option v-for="item in fontoptions" :key="item.value" :value="item.value"></el-option>
          </el-select>
          <span class="rel fl ml10">
            <el-color-picker v-model="ArticleStyle.descolor" show-alpha :predefine="predefineColors"></el-color-picker>
            <span class="colorspan">{{ArticleStyle.co}}</span>
          </span>
        </li>
        <li>
          <a class="fl">背景颜色:</a>
          <span class="rel fl">
            <el-color-picker v-model="ArticleStyle.bgc" show-alpha  :predefine="predefineColors"></el-color-picker>
            <span class="colorspan fl">{{ArticleStyle.bgc}}</span>
          </span>
        </li>
        <li><a>圆角:</a><em class="slidersel"><el-slider v-model="ArticleStyle.bdr" :show-tooltip="false"  show-input></el-slider></em></li>
        <li><a>不透明:</a><em class="slidersel"><el-slider v-model="ArticleStyle.op" max="1" step="0.1" :show-tooltip="false" show-input></el-slider></em></li>
        <li>
          <a class="fl">边框:</a>
          <nav class="bordernav">
            <a class="fl width46">
              <span class="borderColor" :class="{'active': ArticleStyle.bdc == 'none'}" :style="'border:6px '+ ArticleStyle.bds + ' ' + ArticleStyle.bdc"></span>
              <div class="borderColorsel">
                <el-color-picker v-model="ArticleStyle.bdc" :change="ChangeStyle()" show-alpha  :predefine="predefineColors"></el-color-picker>    
              </div>
            </a>
            <a class="fl">
              <el-input class="borderinput" type="number" v-model="ArticleStyle.bdw" min="0" max="100"  placeholder="输入"></el-input>
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
        <li><a>内边距:</a><el-input class="input1" type="number" v-model="ArticleStyle.pd" placeholder="请输入"></el-input></li>
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
      seltype: 9,
      articleSortList: [],
      currentindex: null,
      currentborderindex: null,
      nextpage: false,
      ArticleStyle_link: '',
      articleListDetail: [],
      searchDetailtext: null,
      currentTypeid: null,
      // articleListcurrent: [],
      // Articletitle: {},
      btnlist: [{name: 'btn1'}, {name: 'btn2'}, {name: 'btn3'}, {name: 'btn4'}],
      sonindex: 0,
      ArticleStyle: {},
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
    seltype: {
      handler (curVal, oldVal) {
        this.ArticleStyle.seltype = this.seltype;
        let articleSortList;
        articleSortList = JSON.parse(window.sessionStorage.getItem('articleSortListInfo'));
        if (!this.articleSortList) {
          this.refresh();
        } else {
          this.articleSortList = articleSortList;
        }
        if (curVal === '0') {
          this.ArticleStyle.limitNum = 20;
          this.ArticleStyle.articleListDetail = [];
        } else {
          this.ArticleStyle.limitNum = 10;
        }
        this.ArticleStyle_link = null;
        // this.ArticleStyle.articleLists = [];
      }
    },
    ArticleStyle_link: {
      handler (curValid) {
        this.currentTypeid = curValid;
        this.searchDetailtext = '';
        app.getfetch('/news/list?q_typeId=' + curValid).then((res) => {
          let resdata = res.data.rows;
          this.articleListDetail = resdata;
          window.sessionStorage.setItem('articleListDetail', JSON.stringify(this.articleListDetail));
          if (this.seltype === '1') {
            this.ArticleStyle.articleLists = this.articleListDetail;
          } else {
            if (this.ArticleStyle.articleLists && this.ArticleStyle.articleLists.length > 0 && resdata.length > 0) {
              this.ArticleStyle.articleLists.forEach((detailitem, detailindex) => {
                resdata.forEach((item, index) => {
                  if (detailitem.id === item.id) {
                    this.articleListDetail.splice(index, 1);
                  }
                });
              });
            }
          }
        }).catch(() => {
          this.$message.error('获取文章列表失败！请稍后再试试');
        })
      }
    },
    ArticleStyle: {
      handler (curVal, oldVal) {
        let containerindex = this.container[this.containerindex];
        if (containerindex) this.$set(containerindex.articleList, this.curbtnindex, curVal)
      }
    },
    searchDetailtext: {
      handler (curVal, oldVal) {
        let list = JSON.parse(window.sessionStorage.getItem('articleListDetail'));
        let arr = [];
        if (curVal !== '') {
          list.forEach((item, index) => {
            if (item.title.indexOf(curVal) !== -1) {
              arr.push(item);
            }
          })
          list = arr;
        }
        this.articleListDetail = list;
        console.log(this.articleListDetail)
      }
    }
  },
  methods: {
    ...mapMutations(['updateImageUpload']),
    // 选择图片模板
    selstyleimg (classname) {
      this.ArticleStyle.classnm = classname;
    },
    addArticleDetail (item, index) {
      if (!this.ArticleStyle.articleLists[0].id) {
        this.ArticleStyle.articleLists.splice(0, 1);
      }
      // this.ArticleStyle.articleLists.forEach((item, index) => {
      //   console.log(item.id)
      //   if (!item.id === undefined) {
      //     this.articleListDetail.splice(index, 1);
      //   }
      // });
      if (this.hasdata(item.id)) {
        this.ArticleStyle.articleLists.push(item);
        this.articleListDetail.splice(index, 1);
      } else {
        this.$message.error('右侧已有该文章！请重新选择');
      }
    },
    hasdata (id) {
      let flag = true;
      this.ArticleStyle.articleLists.forEach((indexitem, index) => {
        if (indexitem.id === id) flag = false;
      })
      return flag;
    },
    refresh () {
      const loading = this.$loading({lock: true, text: '刷新数据,请稍后...', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)'});
      app.getfetch('/news/cate/list').then((res) => {
        loading.close();
        let resdata = res.data.rows;
        this.articleSortList = resdata;
        window.sessionStorage.setItem('articleSortListInfo', JSON.stringify(resdata));
      }).catch(() => {
        loading.close();
        this.$message.error('获取文章分类列表失败！请稍后再试试');
      })
    },
    // 按钮swiper切换
    btnclick (e) {
      this.nextpage = false;
      if (e === 'next') this.nextpage = true;
    },
    changeCurrentArticleStyle (item, index1, index, item2, index2) {
      this.containerindex = index;
      this.curbtnindex = index1;
      this.sonindex = index2;
      this.ArticleStyle = JSON.parse(JSON.stringify(item));
      this.seltype = this.ArticleStyle.seltype;
      let articleSortList = JSON.parse(window.sessionStorage.getItem('articleSortListInfo'));
      if (!this.articleSortList) {
        this.refresh();
      } else {
        this.articleSortList = articleSortList;
      }
    },
    // 统一设置所有自定义属性
    ChangeStyle (item) {
      if (this.ArticleStyle.bgc === null) {
        this.ArticleStyle.bgc = 'none';
      } else if (this.ArticleStyle.bdc === null) {
        this.ArticleStyle.bdc = 'none';
        this.ArticleStyle.bdw = '0';
      }
    },
    // 修改边框方向
    selborderstyle (item, index) {
      if (this.currentborderindex === index) {
        this.currentborderindex = null;
        // this.ArticleStyle.bds = '';
      } else {
        this.currentborderindex = index;
        switch (this.currentborderindex) {
          case 0: this.ArticleStyle.bds = this.bds + ' none none none'; break;
          case 1: this.ArticleStyle.bds = 'none ' + this.bds + ' none none'; break;
          case 2: this.ArticleStyle.bds = 'none none ' + this.bds + ' none'; break;
          case 3: this.ArticleStyle.bds = 'none none none ' + this.bds; break;
        }
      }
    },
    // 修改边框类型solid/dashed/dotted
    selborderstyle1 (name) {
      this.bds = name;
      this.ArticleStyle.bds = this.bds;
    },
    upmovebtn (index) {
      let list = this.ArticleStyle.articleLists;
      let temp = list[index - 1];
      this.$set(list, index - 1, list[index])
      this.$set(list, index, temp)
    },
    downmovebtn (index) {
      let list = this.ArticleStyle.articleLists;
      let temp = list[index + 1];
      this.$set(list, index + 1, list[index])
      this.$set(list, index, temp)
    },
    dellistbtn (item, index) {
      // console.log(this.ArticleStyle.articleLists.length)
      if (this.ArticleStyle.articleLists.length < 2) {
        this.$message.error('最少保留一片文章！');
        return false;
      }
      this.ArticleStyle.articleLists.splice(index, 1);
      // console.log(item.title, this.keyword)
      if (item.typeId !== this.currentTypeid || item.title.indexOf(this.searchDetailtext) === -1) return false;
      this.articleListDetail.push(item);
    }
  }
}
</script>
<style lang="less">
  @sprites: "/client/assets/images/sprites.png";
  .showShopstyle .shopcps.style_select{transform:translateX(0);}
  .hidecps .showShopstyle.shopcps{transform:translateX(100%);}
  .el-radio + .el-radio {
    margin-left: 10px;
  }
  .seltypecon{width:90%;margin:0 auto;
    li{margin:15px 0;}
  }
  .setting-content-block {
    overflow: hidden;
    clear: both;width:90%;margin:0 auto;
  }
  .article-basic .jz_transfer {
    padding-left: 0;
    // margin-top: 10px;
  }
  .jz_transfer {
      padding-left: 35px;
      font-size: 13px;
      color: #333;
  }
  .article-basic .jz_transfer_panel {
    width:160px;
}
.jz_transfer_panel {
    width: 250px;
    border: 1px solid #e3e2e8;
    display: inline-block;
    box-sizing: border-box;
    border-radius: 2px;
    background-color: #fff;
    vertical-align: middle;
}
.article-basic .jz_transfer_operation {
    padding: 10px 1px 1px 5%;
}
.jz_transfer_operation .jz_transfer_filter {
    margin-right: 0!important;
}
.jz_transfer_operation>* {
    float: left;
    display: inline-block;
}
.jz-input-wrapper {
    display: inline-block;
    position: relative;
    vertical-align: middle;
    pointer-events: auto;
    border:1px solid #dcdfe6;
    border-radius: 5px;overflow: hidden;
}
.article-basic .jz_transfer_operation.is-has-add .jz_transfer_filter .jz-input {
    width: 140px;
}

.jz_transfer_operation.is-has-add .jz_transfer_filter .jz-input {
    width: 160px;
}
.jz_transfer_operation .jz_transfer_filter .jz-input {
    width: 216px;
}
.jz-input {
    width: 200px;
    height: 34px;
    box-sizing: border-box;
    border-radius: 2px;
    border: 1px solid #e3e2e8;
    background-color: #fff;
    font-size: 13px;
    font-family: 微软雅黑;
    color: #333;
    padding: 0 0 0 25px;
    text-overflow: ellipsis;
}
.jz_transfer .jz_transfer_filter .jz_transfer_icon_search {
  background: url(/client/assets/images/search1.png) no-repeat;background-position:left center; 
}
.jz-input+.jz-input-icon {
    position: absolute;
    left: 6px;
    top: 0;
    width: 32px;
    height: 34px;background: red;
    line-height: 34px;
    text-align: center;
    cursor: pointer;
}
.jz_transfer_operation:after {
    content: "";
    display: table;
    height: 0;
    clear: both;
    visibility: hidden;
}
.jz_transfer_source .jz_transfer_content {
    height: 250px;
}
.jz-scrollbar {
    overflow: hidden;
    position: relative;
    height: 100%;
}
.jz_transfer_list {
    // height: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
}

.jz_transfer_arrow {
    display: inline-block;border: 1px solid #ccc;margin:0 3px;
    width:24px;height:24px;text-align: center;line-height: 24px;color:#fff;font-size: 15px;    border-radius: 100%;
    cursor: pointer;position: relative;top: 0px;background: url(/client/assets/images/jianta.png) no-repeat #fff;background-position: center;
    &:hover,&.active{background: url(/client/assets/images/jiantb.png) no-repeat #188dfa;background-position: center;border: 1px solid #188dfa;}
}

.jz_transfer_panel {
    width: 250px;
    border: 1px solid #e3e2e8;
    display: inline-block;
    box-sizing: border-box;
    border-radius: 2px;
    background-color: #fff;
    vertical-align: middle;
}
.article-basic .jz_transfer_panel {
    width: 44%;
}
.jz_transfer_target .jz_transfer_content {
    height: 293px;
}
.jz-scrollbar {
    overflow: hidden;
    position: relative;
    height: 100%;
}
.jz-scrollbar .scrollbar-wrap {
    height: 100%;
}

.jz_transfer_source .jz_transfer_item {
    cursor: pointer;
    margin-right: 14px;
    width: 212px;
}
.jz_transfer_item {
    width: 100%;
    height: 30px;position: relative;
    padding: 0 6px;
    margin: 3px 0px;
    line-height: 28px;
    list-style: none;
    box-sizing: border-box;
    &:hover{ span{color:#1890ff;}background: #e8f4ff;}
}
.jz_transfer_source .jz_transfer_label {
  width: 100%;;
}
.jz_transfer_label {
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;line-height: 30px;
}
.article-basic .jz_transfer_source .jz_transfer_label {
    width: 100%;text-indent:5px;
    vertical-align: middle;
}
.article-basic .jz_transfer_source .jz_transfer_item {
    width: 100%;
}
.jz_transfer_source .jz_transfer_item:hover {
    background-color: #e8f4ff;
    color: #1890ff;
    span{color:#1890ff;}
}
.scrollbar-view{overflow: auto;height:250px;}
.jz_transfer_target .scrollbar-view{height:295px;}
.jz_transfer_icon_del {
    cursor: pointer;
    display: inline-block;
    width: 10px;    margin-right: 10px;
    height: 11px;position: relative;
    top: 1px;
    background: url(/client/assets/images/shanchu.png) no-repeat;
}

.jz_transfer_button.is-first .jz_transfer_icon_down, .jz_transfer_button.is-last .jz_transfer_icon_up {
    margin: 0 5px 0 3px;
}
.article-basic .jz_transfer_button.is-first .jz_transfer_icon_down, .article-basic .jz_transfer_button.is-last .jz_transfer_icon_up {
    margin: 0 5px 0 3px;
}
.jz_transfer_icon_down {
    margin-right: 0;
    cursor: pointer;
    display: inline-block;
    width: 10px;
    height: 11px;
    background: url(/client/assets/images/downa.png) no-repeat;
    &:hover{background: url(/client/assets/images/downb.png) no-repeat;}
}
.jz_transfer_icon_up {
    margin-right: 2px;
    cursor: pointer;
    display: inline-block;
    width: 10px;
    height: 11px;
    background: url(/client/assets/images/upa.png) no-repeat;
    &:hover{background: url(/client/assets/images/upb.png) no-repeat;}
}
.jz_transfer_button{position: absolute;top:3px;right:0;}
.jz-input.el-input--small .el-input__inner{border:none;}
.refreshbtn{cursor: pointer;}
</style>

