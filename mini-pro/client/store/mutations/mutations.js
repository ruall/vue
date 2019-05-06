export default {// 同步修改数据用mutations,异步修改数据用actions
  // 修改loding状态
  updateLoadingStatus (state, data) {
    state.loading = data.showloading
    state.text = data.texts;
    // console.log(data)
  },
  GetData (state, data) {
    state.datalist = data
  },
  // 设置初始化身份id
  setMiniappId (state, data) {
    state.miniappId = data
  },
  // 设置当前页面id
  setCurrentPageInfo (state, data) {
    state.CurrentPageInfo = data
  },
  // 设置当前页面id
  setIndexPageId (state, data) {
    state.IndexPageId = data
  },
  // 缓存当前页面数据
  setPageData (state, data) {
    state.currentPageData = data
    console.log(state.currentPageData)
  },
  // 缓存所有页面数据
  saveAllPageInfo (state, data) {
    // state.AllPageInfo = data
    // let pageinfodata = [data];
    // pageinfodata.push(data)
    state.AllPageInfo = data;
    // console.log(state.AllPageInfo)
  },
  // 修改全局样式
  updateAllStyle (state, data) {
    if (data.bgColor !== null) {
      state.AllStyle.bgColor = data.bgColor;
      state.AllStyle.bgImg = null;
    } else {
      state.AllStyle.bgColor = null;
      state.AllStyle.bgImg = data.bgImg;
    }
    if (data.themeColorhelp) state.AllStyle.themeColorhelp = data.themeColorhelp;
    if (data.themeColor) state.AllStyle.themeColor = data.themeColor;
    if (data.navigatorBackColor) state.AllStyle.navigatorBackColor = data.navigatorBackColor;
    // console.log(state.AllStyle)
  },
  // 设置控件支持
  setControl (state, data) {
    state.supportText = data;
    // console.log(state.supportText)
  },
  // 打开上传底部导航图标功能弹窗
  openNavicopop (state, data) {
    state.uploadiconNavigatorSet = data;
  },
  // 更新底部导航图标
  uploadNavicoimg (state, data) {
    state.uploadiconSrc = data;
  },
  // 更新底部导航
  updateBottomNavUpload (state, data) {
    state.NavigatorSet = data;
    // console.log(state.NavigatorSet)
  },
  // 更新背景图片
  updateBgImageUpload (state, data) {
    if (data.showUploadimg) state.CurrentBGImageUrl.showUploadimg = data.showUploadimg;
    if (data.bgColor) state.CurrentBGImageUrl.bgColor = data.bgColor;
    if (data.bgImg) state.CurrentBGImageUrl.bgImg = data.bgImg;
    if (data.bgupload) state.CurrentBGImageUrl.bgupload = data.bgupload;
    // console.log(state.CurrentBGImageUrl)
  },
  // 上传普通图片
  updateImageUpload (state, data) {
    if (data.showUploadimg) state.Uploadimginfo.showUploadimg = data.showUploadimg;
    if (data.CurrentImageUrl) state.Uploadimginfo.CurrentImageUrl = data.CurrentImageUrl;
    if (data.CurrentBGImageUrl) state.Uploadimginfo.CurrentBGImageUrl = data.CurrentBGImageUrl;
    if (data.firstUploadCurrentImageUrl) state.Uploadimginfo.firstUploadCurrentImageUrl = data.firstUploadCurrentImageUrl;
    if (data.idindex) state.Uploadimginfo.idindex = data.idindex;
    if (data.firstupload) state.Uploadimginfo.firstupload = data.firstupload;
    if (data.bgupload) state.Uploadimginfo.bgupload = data.bgupload;
    if (data.ImgType) state.Uploadimginfo.ImgType = data.ImgType;
    // console.log(state, state.Uploadimginfo.ImgType)
  },
  // 上传cube魔方图片
  updateCubeImageUpload (state, data) {
    state.CurrentCubeImageUrl = data;
    // console.log(state.CurrentCubeImageUrl)
  },
  // 上传cube魔方图片
  updateSwiperImageUpload (state, data) {
    state.CurrentSwiperImageUrl = data;
    // console.log(state.CurrentCubeImageUrl)
  },
  // 更新zindex
  updatedomZindex (state, data) {
    state.domZindex = data;
    // console.log(data)
  }
}
