<template>
  <div id="popupWindow5510">
    <div class="mask" @click="closeuploadbtn()"></div>
    <div class="fk-popupWindowVT fileUploadV2 ui-draggable">
     <a class="closebtn" @click="closeuploadbtn()"></a>
      <div class="pWHead">
        <div class="pWHead_title">添加图片
          <span style="font-size:12px; color:#666;" v-if="!showstate.uploadiconNavigatorSet">(&nbsp;只能添加jpg,jpeg,gif,png格式的图片,大小不超过500kb)，为保证您产品的用户体验速度，建议您去<a style="color:red;" href="https://tinypng.com/" target="_black"> 此网站 </a>进行图片优化后再上传</span></div>
        <div style="" class="pWHead_close">
          <div class="J_pWHead_close pWHead_close_img"></div>
        </div>
      </div>
      <div class="pWCenter">
        <div id="fileUploadPanel" class="fileUploadPanel">
          <div class="leftTabs">
            <ul>
              <li class="active">
                <a id="myFileSelect">我的文件</a></li>
            </ul>
            <div class="rectBlock" style="top: 0px;"></div>
          </div>
          <div id="myFile" class="tabContent scrollstyle templatescrollstyle">
            <div>
              <div class="topMenu" v-if="!showstate.uploadiconNavigatorSet">
                <el-upload class="upload-demo" name="imageFile" ref="upload" :with-credentials="true" :data="upLoadData" :action="getImageurl" accept="image/jpg,image/jpeg,image/gif,image/png,image/webp" :auto-upload="true" :before-upload="uploadstart" multiple :show-file-list="false" :on-Error="uploadError" :on-progress="onprogress" :on-success="uploadSuccess">
                    <div class="buttonWrap">
                      <span id="uploadButton">
                        <a id="file_upload_1-button" href="javascript:void(0)" class="uploadify-button ">
                          <div class="uploadIcon"></div>
                          <div class="uploadTip" slot="trigger">直接上传</div></a>
                        </span>
                    </div>
                  </el-upload>
                  <ul class="imagelist clearfix ">
                    <li  :class="{'active': CurPicindex == index}" v-for="(item,index) in imageslistinfo.imageslist" :key="index" @click="selectImg(item,index)"><a @click="deletebtn(item,index)"></a><img :src="imageslistinfo.imageResources + item.imagePath" /></li>
                  </ul>
              </div>
              <ul class="imagelist clearfix iconlist" v-if="showstate.uploadiconNavigatorSet">
                <li :class="{'active': CurPicindex == index}" v-for="(item,index) in Navicolistinfo" :key="index" @click="selectIcon(item,index)"></li>
              </ul>
            </div>
          </div>
          <div class="center width200">
            <el-progress v-if="showprogress" :text-inside="true" :stroke-width="12" :percentage="progress" status="success"></el-progress>
          </div>
        </div>
      </div>
      <a @click="clickuploadbtn()" v-if="!showstate.uploadiconNavigatorSet" class="uploadbtns">确定</a>
      <a @click="clickuploadiconbtn()" v-if="showstate.uploadiconNavigatorSet" class="uploadbtns">确定</a>
    </div>
  </div>
</template>
<script>
  import app from '../../fetch/api.js'
  import { mapState, mapMutations } from 'vuex';
  import Cpstemplete from '../../config/cpstemplete.js'
  export default{
    props: {
      container: {type: Array, require: true}
    },
    data () {
      return {
        getImageurl: app.BaseUrl + '/image/add',
        CurPicindex: -1,
        upLoadData: {},
        imageslistinfo: {imageslist: [], imageResources: ''},
        loading: null,
        progress: 0,
        showprogress: false,
        Navicolistinfo: [
          'icon1_01', 'icon1_02', 'icon1_03', 'icon1_04', 'icon1_05', 'icon1_06', 'icon1_07', 'icon1_08', 'icon1_09', 'icon1_10', 'icon1_11', 'icon1_12', 'icon1_13',
          'icon2_01', 'icon2_02', 'icon2_03', 'icon2_04', 'icon2_05', 'icon2_06', 'icon2_07', 'icon2_08', 'icon2_09', 'icon2_10', 'icon2_11', 'icon2_12', 'icon2_13',
          'icon3_01', 'icon3_02', 'icon3_03', 'icon3_04', 'icon3_05', 'icon3_06', 'icon3_07', 'icon3_08', 'icon3_09', 'icon3_10', 'icon3_11', 'icon3_12', 'icon3_13',
          'icon4_01', 'icon4_02', 'icon4_03', 'icon4_04', 'icon4_05', 'icon4_06', 'icon4_07', 'icon4_08', 'icon4_09', 'icon4_10', 'icon4_11', 'icon4_12', 'icon4_13',
          'icon5_01', 'icon5_02', 'icon5_03', 'icon5_04', 'icon5_05', 'icon5_06', 'icon5_07', 'icon5_08', 'icon5_09', 'icon5_10', 'icon5_11', 'icon5_12', 'icon5_13',
          'icon6_01', 'icon6_02', 'icon6_03', 'icon6_04', 'icon6_05', 'icon6_06', 'icon6_07', 'icon6_08', 'icon6_09', 'icon6_10', 'icon6_11', 'icon6_12', 'icon6_13',
          'icon7_01', 'icon7_02', 'icon7_03', 'icon7_04', 'icon7_05', 'icon7_06', 'icon7_07', 'icon7_08', 'icon7_09', 'icon7_10', 'icon7_11', 'icon7_12', 'icon7_13',
          'icon8_01', 'icon8_02', 'icon8_03', 'icon8_04', 'icon8_05', 'icon8_06', 'icon8_07', 'icon8_08', 'icon8_09', 'icon8_10', 'icon8_11', 'icon8_12', 'icon8_13',
          'icon9_01', 'icon9_02', 'icon9_03', 'icon9_04', 'icon9_05', 'icon9_06', 'icon9_07', 'icon9_08', 'icon9_09', 'icon9_10', 'icon9_11', 'icon9_12', 'icon9_13',
          'icon10_01', 'icon10_02', 'icon10_03', 'icon10_04', 'icon10_05', 'icon10_06', 'icon10_07', 'icon10_08', 'icon10_09', 'icon10_10', 'icon10_11', 'icon10_12', 'icon10_13', 'icon11_01', 'icon11_02', 'icon11_03', 'icon11_04', 'icon11_05', 'icon11_06', 'icon11_07', 'icon11_08', 'icon11_09', 'icon11_10', 'icon11_11', 'icon11_12', 'icon11_13'
        ]
      }
    },
    computed: {
      ...mapState({showstate: state => state})
    },
    mounted () {
      this.getImagelist();
    },
    methods: {
      ...mapMutations(['updateImageUpload']),
      ...mapMutations(['updateCubeImageUpload']),
      ...mapMutations(['updateSwiperImageUpload']),
      getImagelist () {
        this.upLoadData.miniappId = this.showstate.miniappId;
        this.imageslistinfoflag = JSON.parse(window.localStorage.getItem('imageslistinfo'));
        if (!this.imageslistinfoflag || !this.imageslistinfoflag.imageslist || this.imageslistinfoflag.imageslist.length === 0) {
          const loading = this.$loading({lock: true, text: '获取图片列表中,请稍后...', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)'});
          app.getfetch('/image/getImages/' + this.upLoadData.miniappId).then((res) => {
            loading.close();
            let Data = res.data.data;
            this.imageslistinfo.imageslist = Data.images;
            this.imageslistinfo.imageResources = Data.imageResources;
            // console.log(this.imageslistinfo, this.imageslistinfo.imageslist)
            window.localStorage.setItem('imageslistinfo', JSON.stringify(this.imageslistinfo));
          }).catch(() => {
            loading.close();
            this.$message.error('获取图片列表失败！');
          })
        } else {
          this.imageslistinfo = this.imageslistinfoflag;
          // console.log(this.imageslistinfo, this.imageslistinfo.imageslist)
        }
      },
      uploadstart (event, file, fileList) {
        if (this.imageslistinfo.imageslist.length > 100) {
          this.$message.error('抱歉，普通用户上传当天不能超过100张');
          return false
        }
        this.progress = 0;
      },
      uploadError (response) {
        this.showprogress = false;
      },
      uploadSuccess (response, file, fileList) {
        this.progress = 100;
        console.log(file.response)
        if (file.response.success === true) {
          this.imageslistinfo.imageslist.push(file.response.data.image)
        } else {
          this.$message.error('上传失败！请重新上传！');
        }
        window.localStorage.setItem('imageslistinfo', JSON.stringify(this.imageslistinfo));
        setTimeout(() => { this.showprogress = false; }, 200)
      },
      onprogress () {
        var num = Math.floor(Math.random() * 50) + 50;
        this.progress = num;
        this.showprogress = true;
      },
      // overlimit (files, fileList) {
      //   this.$message.error('当天上传最多不能超过20个哟！');
      // },
      selectImg (item, index) {
        this.CurrentImageUrl = this.imageslistinfo.imageResources + item.imagePath;
        this.CurPicindex = index;
      },
      closeuploadbtn () {
        this.showstate.Uploadimginfo.showUploadimg = false;
        this.showstate.CurrentBGImageUrl.showUploadimg = false;
        this.showstate.uploadiconNavigatorSet = false;
      },
      clickuploadbtn () {
        if (this.CurPicindex === -1) {
          this.$message.error('请选择图片！'); return false;
        }
        this.showstate.Uploadimginfo.showUploadimg = false;
        if (this.showstate.Uploadimginfo.firstupload) {
          this.CurPicindex = -1;
          this.showstate.Uploadimginfo.firstupload = false;
          let picstyle = Cpstemplete.PicStyle;
          let idindex = parseInt(this.showstate.Uploadimginfo.idindex);
          let picList = this.container[idindex].picList;
          picstyle.pic = this.CurrentImageUrl;
          picstyle.zi = this.showstate.domZindex.maxzIndex;
          picList.push(picstyle);
          this.showstate.Uploadimginfo.firstUploadCurrentImageUrl = this.CurrentImageUrl;
          this.$emit('draggable')
        } else if (this.showstate.CurrentBGImageUrl.bgupload) {
          this.showstate.CurrentBGImageUrl.showUploadimg = false;
          this.showstate.CurrentBGImageUrl.bgupload = false;
          this.showstate.CurrentBGImageUrl.bgColor = null;
          this.showstate.CurrentBGImageUrl.bgImg = this.CurrentImageUrl;
        } else if (this.showstate.Uploadimginfo.ImgType === 'cube') {
          this.updateCubeImageUpload(this.CurrentImageUrl)
        } else if (this.showstate.Uploadimginfo.ImgType === 'swiper') {
          this.updateSwiperImageUpload(this.CurrentImageUrl)
          // this.showstate.Uploadimginfo.CurrentImageUrl = this.CurrentImageUrl;
        } else {
          this.showstate.Uploadimginfo.CurrentImageUrl = this.CurrentImageUrl;
        }
      },
      deletebtn (item, index) {
        const loading = this.$loading({lock: true, text: '删除图片中,请稍后...', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)'});
        app.getfetch('/image/del/' + item.id).then((res) => {
          loading.close();
          this.imageslistinfo.imageslist.splice(index, 1);
          window.localStorage.setItem('imageslistinfo', JSON.stringify(this.imageslistinfo));
          // console.log(this.imageslistinfo)
          this.CurPicindex = -1;
        }).catch(() => {
          loading.close();
          this.$message.error('删除图片失败！');
        })
      },
      // 选择图标
      selectIcon (item, index) {
        console.log(item)
        this.CurrentIconUrl = 'icon/' + item + '.png';
        this.CurPicindex = index;
        // console.log(this.CurrentIconUrl)
      },
      // 更新选中图标
      clickuploadiconbtn () {
        if (this.CurPicindex === -1) {
          this.$message.error('请选择图标！'); return false;
        }
        let index = this.showstate.uploadiconSrc.curindex;
        if (this.showstate.uploadiconSrc.flag) {
          this.showstate.NavigatorSet.list[index].iconPath = this.CurrentIconUrl
        } else {
          this.showstate.NavigatorSet.list[index].selectedIconPath = this.CurrentIconUrl
        }
        // console.log(this.showstate.NavigatorSet.list);
        this.showstate.uploadiconNavigatorSet = false;
      }
    }
  }
</script>
<style lang="less">
  @sprites: "/client/assets/images/sprites.png";
  .el-upload{float:left;}
  .width200{width:60%;height:20px; position: absolute;top:0;left:0;right:0;bottom:0;margin:auto;}
  .el-progress-bar__innerText{position: relative;top:-3px;}
  .closebtn{width:20px;height:20px;position: absolute;top:10px;right:10px;background: red;z-index: 100;cursor: pointer;background:url('@{sprites}') no-repeat;background-position: -447px -100px;
    &:hover{background-position: -481px -100px;}
  }
  .uploadbtns{float:right;width:80px;height:30px;cursor:pointer;line-height: 30px;text-align: center;background: #1890ff;color:#fff;font-size: 14px;margin: 15px 10px;border-radius: 5px;}
  @sprites: "/client/assets/images/sprites.png";
  #popupWindow5510{width:100%;height:100%;position: fixed;top:0;left:0;right:0;bottom:0;margin:auto;z-index: 10000;background:rgba(0,0,0,.6);
    // .fileUploadV2{transform:scale(0.3);transition:all 0.5s ease 0s;}
  }
  // .showuploadactive #popupWindow5510{opacity: 1;display: block;
  //   .fileUploadV2{transform:scale(1);transition:all 0.5s ease 0s;}
  // }

  .imagelist{
    li{width:66px;height:66px;border:1px solid #ccc;box-sizing:border-box;float:left;margin-right:16px;cursor: pointer;position: relative;margin-bottom: 20px;
      img{display:block;width:100%;height:100%;}
      &.active{border:1px solid #1890ff;
        &::before{content:'';width:17px;height:15px;position: absolute;bottom:0;right:0;
        background:url('@{sprites}') no-repeat;background-position: -738px -207px;
        }
      }
      a{display:none;width:17px;height:15px;position: absolute;top:-7px;right:-7px;
        background:url('@{sprites}') no-repeat;background-position: -773px -207px;}
      &:hover a{display: block;}
    }
  }
  .el-message-box__headerbtn{top:10px;}
  .el-message-box__content{padding: 0;}
  .el-message-box{width:1000px;position: relative;}
  .el-message-box__header {
    position: absolute;
    top: 0;
    right: -5px;
    z-index: 1000;
  }
  .fk-popupWindowVT {
    width:1000px;height:660px;position: absolute;top:0;left:0;right:0;bottom:0;margin:auto;
    background: #fff;box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
    margin: auto;
    overflow: hidden;border-radius: 5px;
    z-index: 9032;
    // animation: fk-popupWindowVT ease .3s;
  }
  .fk-popupWindowVT .pWHead {
    position: relative;
    width: 100%;
    height: 64px;
    border-bottom: 1px solid #e3e2e8;
  }
  .fk-popupWindowVT.fileUploadV2 .pWHead {
    height: 65px;
    line-height: 65px;
    width: 100%;
    background-color: #fff;
    border-top-right-radius: 2px;
  }
  .fk-popupWindowVT .pWHead .pWHead_title {
    position: absolute;
    margin-left: 35px;
    padding-top: 22px;
    font-size: 16px;
    color: #333;
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .fk-popupWindowVT.fileUploadV2 .pWHead .pWHead_title {
    padding-top: 0;
  }
  .fk-popupWindowVT.fileUploadV2 .pWCenter {
    width: 100%;
    position: relative;
  }


  .fk-popupWindowVT .pWBottom {
    width: 100%;
  }
  .fk-popupWindowVT.fileUploadV2 .pWBottom {
    background-color: #fff;
    width: 100%;
    border-bottom-right-radius: 2px;
  }
  .fk-popupWindowVT .pWBottom .pWBtns {
    text-align: center;
    margin-bottom: 28px;
    margin-top: 28px;
}
  .fileUploadPanel {
    background-color: #fff;
    height: 533px;
    width: 100%;
    border-bottom: 1px solid #e3e2e8;
}
.fileUploadPanel .leftTabs {
    height: 532px;
    width: 142px;
    position: absolute;
    top: 0;
    border-right: 1px solid #e3e2e8;
}
.fileUploadPanel .leftTabs li:last-child.active {
    border-bottom: 1px solid #e3e2e8;
}
.fileUploadPanel .leftTabs a {
    display: inline-block;
    padding-top: 21px;
    text-decoration: none;
    color: #333;
    font-size: 14px;
    height: 44px;
    width: 100%;
    font-family: "微软雅黑";
}
.fileUploadPanel .leftTabs .active a {
    color: #1890ff;text-align: center;
}
.rectBlock {
    position: absolute;
    left: 0;
    height: 65px;
    width: 3px;
    background: #1890ff;
    top: 0;
    transition: top .3s;
}
.tabContent {
    // width: 785px;
    margin-left: 145px;
    padding-left: .8rem;
    padding-right: .8rem;
    padding-top: .8rem;
    height: 515px;
    overflow: auto;
    position: relative;
}
.topMenu {
    width: 100%;
    // height: 38px;
    // line-height: 38px;
    margin-top: 8px;
    margin-left: 8px;
}
.uploadTip{text-align: center;line-height: 15px;}
.buttonWrap {
    float: left;
    margin-right: 20px;box-sizing: border-box;
    cursor: pointer;
    color: #333;
}
#myFile .uploadify-button {
    font-size: 13px;
    color: #333;display: block;
}

#myFile .uploadify-button {
    width: 66px;
    height: 66px;
    line-height: 66px;
    border: 1px dashed #909399;
    border-radius: 2px;
    text-decoration: none;box-sizing: border-box;
    background: inherit;
    padding-bottom: 0;color:#909399;
}
#myFile .uploadify-button .uploadIcon {
    width: 20px;
    height: 20px;
    background: url(/client/assets/images/tpsc_a.png) no-repeat;
    margin: 10px auto;
}
#myFile .uploadify-button:hover{
  color:#1890ff;
  .uploadIcon{
    background: url(/client/assets/images/tpsc_b.png) no-repeat;
  }
}
.clearfloat {
    clear: both;
}
.showFilesContent {
    width: auto;
    min-width: 102%;
    height: 450px;
    margin-top: 10px;
    float: left;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    left: -18px;
}
.showFilesContent .noFileIcon {
    width: 170px;
    height: 120px;
    // background: url(/image/mbg01.png?v=201807021157) no-repeat -180px -272px;
    margin: 110px auto;
    margin-bottom: 20px;
}
.showFilesContent .noFileContent {
    font-size: 16px;
    color: #999;
    text-align: center;
}
.el-button--small, .el-button--small.is-round {
    background: none;
    border: 1px solid #ccc;
    padding: 5px 15px;
}
.el-message-box__btns {
    padding: 15px 15px 0;
    text-align: right;
}
.iconlist{
  background: url(/client/assets/images/icoSprite.png) no-repeat;width:780px;height:660px;background-size:780px auto;background-color: rgba(0,0,0,0.3);
  li{width: 60px;height: 60px;border: none;box-sizing: border-box;float: left;margin:0;cursor: pointer;position: relative;
    &:hover{border:1px solid #1890ff;}
  }
}
.mask{width:100%;height:100%;position: absolute;top:0;left:0;}
</style>

