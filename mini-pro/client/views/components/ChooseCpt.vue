<template>
  <div class="P_select scrollstyle choosecpt">
    <div class="p_selectarea">
      <div class="adminPage flex">
        <a @click="changepage(0,$event)" :class="{'active':cptpage == 0}">页面管理</a>
        <a @click="changepage(1,$event)" :class="{'active':cptpage == 1}">组件库</a>
      </div>
      <div id="tabs" class="templatescrollstyle">
        <div id="tabs-2" v-show="cptpage == 0">
            <ul>
              <li v-for="(item,index) in pagelist" :key="index" @click="gopagebtn(item,index)" :class="{active:index == currentindex}">
                <el-input type="text" v-model="item.pageName" :change="changename(item,index)" :value="item.pageName" size="mini" placeholder="请输入内容"></el-input><span @click.stop="deletepagebtn(item,index)" :class="{'ishome': item.tabBarCode === 'pages/index/index' || pagelist.length <= 2}" class="deletebtnicon">删除</span>
              </li>
              <li class="addpagebtn" @click="addpagebtn()"><a> + 添加页面</a></li>
            </ul>
        </div>
        <div id="catalog" class="elcps" v-show="cptpage == 1">
          <div class="selectarea clearfix" :class="'sel'+index" v-for="(item,index) in ModuleList" :key="index" >
            <div class="yuansu_name" @click="ChangeStatus(index)"><span>{{item.title}}</span></div>
            <div class="flex flex-wrap">
              <section class="pic" :class="item.Identification" v-for="(icon,index1) in item.icon" :key="index1">
                <div class="area" ><img :src="icon.pic"/><p>{{icon.name}}</p></div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import app from '../../fetch/api.js'
  import { mapState, mapMutations } from 'vuex';
  import $ from 'jquery'
  export default{
    props: {
      container: {
        type: Array, require: true
      },
      isSelect: 0
    },
    data () {
      return {
        cptpage: 1,
        currentindex: null,
        pagelist: [],
        pagedata: [],
        ModuleList: [
          {title: '元素组件',
            icon: [
              {identification: 'text', pic: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAM1BMVEUAAAAYkP8YkP8YkP8YkP8YkP8YkP8YkP8YkP8YkP8YkP8YkP8YkP8YkP8YkP9cYGYYkP82KQ+CAAAAD3RSTlMAiLsRM3fdZu6ZqswiVUT0daqYAAAAl0lEQVQ4y9XTQQ6DMAxE0XGCk0Bpmfuftq5QgQqw1Q0SbxEpCyvfi+BfGbHEhEhHssNiWmBDqBQESsGjwFepUNYoe0RuKcge7Bws3SF82vmieNtZtrH0IPtDqV72HDMyOdkJxk8XJpkl9jhRuGon21VK/hKqk73m+dnrxN7vC/U4vTRsteXqjPbUg+3y7kPcwxTArV253Rt5cgpvu65LygAAAABJRU5ErkJggg==', name: '文字'},
              {identification: 'img', pic: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAOVBMVEUAAAAYkP8YkP8YkP8YkP8YkP8YkP9cYGYYkP8YkP8YkP9cYGZcYGYYkP8hieoYkP8YkP8YkP9cYGa/lIkvAAAAEnRSTlMAH99pDMOY5rv3ekk7uq+pQCwYYZsGAAAAlUlEQVQ4y+3TywrDIBBA0RkzRs2jD///Ywu5gbZKlUJWIXczm4OoqJy9OeRGYd5QWKTREraRpVn+D+maVu2hONkUeyiJWDpkJY0pFntSr93Tqbs7bSDMIIPTBsII6hfCoL6RWWlQn8i8t8KgdoQZRxTmrXaEEUFh6svEoDA1wqCemBphUAlTIww9GBUKt/4b7/+WK5EXJg8JJR4AbUIAAAAASUVORK5CYII=', name: '图片'},
              {identification: 'btn', pic: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkBAMAAAATLoWrAAAAHlBMVEUAAAAYkP9cYGYYkP9cYGZcYGYYkP9cYGZcYGYYkP8KUZw1AAAACHRSTlMA5+dJSTvk5HwV1nUAAAA6SURBVCjPYxiswKkDDagwqKKrCWJoQBfioIeQ4UwoEIYLScKEJuIRQmhMBgvR3/WYQYgZ0CUMgxQAADqWMNec27V+AAAAAElFTkSuQmCC', name: '按钮'}
            ]
          },
          {title: '内容组件',
            icon: [
              {identification: 'title', pic: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkBAMAAAATLoWrAAAAJ1BMVEUAAABcYGZcYGZcYGZcYGZcYGZcYGZcYGZcYGZcYGZcYGZcYGYYkP+YwL4+AAAAC3RSTlMA8q0mEm7pd+ZCEbtQixAAAABoSURBVCjPY8ACOLt3g4GQAVyIYwKEdk2GC3HDGEWYQo6YQtwIod0oYKMyVBIBWMIM0IUY2BUwhFgEMIQYNlAkxHOAgecMBBzALjRqIz4hRgeMGGIKwIhH5tQFyCJcwNhmMJJGTxOYAABhcFoBQldRhAAAAABJRU5ErkJggg==', name: '标题'},
              {identification: 'swiper', pic: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAPFBMVEUAAAAYkP8YkP8YkP8YkP8YkP9cYGYYkP8YkP9cYGYYkP9cYGYYkP9cYGZSZ3xcYGYYkP8YkP8YkP9cYGa7rvtLAAAAE3RSTlMA4SHnZmjnaTw7SkpJSerkw6Y7E5KoYQAAAJFJREFUOMvt0ksOhSAMBdBKsfX7ft3/Xh+pgQaE4MChdwTpCZcQ4Mnd2UmqoR0sNEM1M4FFoBEp1hvi1kU4TXgB/fpoQVzaSGoXH32aRSwnMwzehgZz41xQNrWT2JsBUCUFBA4VZlSlWaxjrTCjqngCPirGZFTliGPF10zYZohTxce1XpzQ9b/K+pJq3is8uTl/YtYH7V6qoVQAAAAASUVORK5CYII=', name: '轮播多图'},
              {identification: 'daohang', pic: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAjVBMVEUAAABcYGYYkP8YkP8YkP9cYGYYkP9cYGZcYGZcYGYYkP8YkP8YkP8YkP8YkP8YkP9cYGYYkP8YkP8YkP9cYGYYkP8YkP8YkP8YkP8YkP9cYGYYkP8YkP8YkP9cYGZcYGYYkP8YkP9cYGYYkP8YkP8YkP8YkP8YkP9cYGYYkP9cYGZcYGYYkP8YkP9cYGbsC73qAAAALnRSTlMA+NtIHOjMV0lBLxALBuoYCgH5787Gq6WFfU458uHDwm3R0KGZkHNnRykQB2M/5Nf6AwAAAMhJREFUOMvNU8cOgzAMhZCmlD3KhpbSRef/f16TVMoF2eGEeAcnki2v52csjg9LyFv+vlOYh53wWJ3lO6wCMkTbjc0fZnFDUw8qVO+5SXzxPTlQ0NPkhgi3F4RoplsWGv45x3uKyzQLcheZTsJtqLEyeP2loiAtR9l4SIr7NWjwFRSlIJDEUCFbLLOVKyIPmBYV1IFB9aAt9/r3RFXjwHRqBavjRXsq6ujQ6fTnOyohtKAQxjmSisw54hxQmSvuRBRLSB8jkloaP6', name: '魔方导航'},
              {identification: 'dibudh', pic: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkBAMAAAATLoWrAAAAHlBMVEUAAAAYkP8YkP8YkP8YkP8YkP8YkP8YkP9cYGYYkP+0qdFuAAAACHRSTlMA7hmRtgaJiBlxl/wAAABFSURBVCjPY6A/6MAADA3oajioLMRqKByAIMBCzE4qBQgCLMSowCSAILAIwTQmIAgsxlPd9ZwzZ05AEFiFaByE2CKN7gAA+mIzQUmG9wEAAAAASUVORK5CYII=', name: '底部导航'},
              {identification: 'newslists', pic: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkBAMAAAATLoWrAAAAHlBMVEUAAABcYGZcYGZcYGZcYGZcYGZcYGZcYGZcYGYYkP+UtWn1AAAACHRSTlMA1H/mFUk7gHwNhWYAAABeSURBVCjPY8AKgjugoAkuZAZjNCrAWA0wRosQhlCDowKGEIsQhhCDowKGEIsQhhCDYwGqEMhtDTAhBCBNiHMmCEwgXSMSoIIjoGDgHUG/kDBDEmEzgCY5BGgOwJoqAcp4Oyk1xfrlAAAAAElFTkSuQmCC', name: '新闻列表'},
              {identification: 'shopshow', pic: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkBAMAAAATLoWrAAAALVBMVEUAAABcYGZcYGZcYGYYkP9cYGYYkP8YkP8YkP9cYGYYkP8YkP8YkP9cYGYYkP8CfyjkAAAADXRSTlMA7hmRBrbuGZGJt7WJEgvnaQAAAGVJREFUKM9jwAJYDO+CgLADnMHAHASWUZ0AZzAwKoBZTAJwBgMv1IALcMZQEsL0EBZvYwsc4gBCY9s7EMhAClWO5WBG1QGEI9gKwAz2BIRT+aCMB0NJCNNDSN7eDmZUH8AWOJgAAGNdWQReAojDAAAAAElFTkSuQmCC', name: '商品展示'}
            ]
          },
          {title: '容器组件', icon: [{Identification: 'tonglan', pic: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkAgMAAACcbnALAAAACVBMVEUAAABcYGYYkP8xJmmBAAAAAXRSTlMAQObYZgAAADZJREFUGNNjoA4IgdKiDK6hEBCIJCYAZbEwCKwCM1YBWQ1gFhNWFlwH6SwCJiNcgNBBwPVUAQAz8g5r3ANkgwAAAABJRU5ErkJggg==', name: '通栏'}]},
          {title: '功能组件',
            icon: [
              {identification: 'search', pic: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAjVBMVEUAAABcYGZcYGZcYGZcYGZcYGZcYGYYkP8YkP9cYGYYkP8YkP8YkP8YkP8YkP8YkP8YkP8YkP8YkP8YkP8YkP8YkP8YkP8YkP9cYGYYkP8YkP8YkP8YkP8YkP8YkP8YkP8YkP8YkP8YkP8YkP8YkP8YkP8YkP9cYGYYkP8YkP8YkP8YkP8YkP9cYGYYkP+XBIPvAAAALXRSTlMA7hiRBre1aqSJYwPt4sqdC/e9kYNwQCocFBEOB9bCt658UhzX0ZSIXUk3Ih9cJaWvAAAA2UlEQVQ4y+2S2Q6CMBREL7LvO4isgrvC/3+eKRFo0laa4KPnhcxk0hsmA3xIotBPCKJEGghR3sHETtZJAyEgazYF0kD0gNMTxj/EF+JvXFQWc6/ohMG3gq2Yh6+jQwmj8n2/bkdBju6KPp0T3D3IW6eeniP/OLPjz8nQKYBeJmjhLJuIEeqsfJYvq6CHDA3TVUIPRUdMu8aG0A0/5zDOZdZSdmoXjAou81NmELN68s6hOQrPHVRW45A3pZpmaWwHw5iibwwS7WSV7gPUMbW2MXWwPVjFeMIPeQNLHh1NeQ1XFwAAAABJRU5ErkJggg==', name: '搜索'},
              {identification: 'map', pic: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAPFBMVEUAAAAYkP8YkP8YkP8YkP8YkP9cYGYYkP8YkP9cYGYYkP9cYGYYkP9cYGZSZ3xcYGYYkP8YkP8YkP9cYGa7rvtLAAAAE3RSTlMA4SHnZmjnaTw7SkpJSerkw6Y7E5KoYQAAAJFJREFUOMvt0ksOhSAMBdBKsfX7ft3/Xh+pgQaE4MChdwTpCZcQ4Mnd2UmqoR0sNEM1M4FFoBEp1hvi1kU4TXgB/fpoQVzaSGoXH32aRSwnMwzehgZz41xQNrWT2JsBUCUFBA4VZlSlWaxjrTCjqngCPirGZFTliGPF10zYZohTxce1XpzQ9b/K+pJq3is8uTl/YtYH7V6qoVQAAAAASUVORK5CYII=', name: '在线地图'},
              {identification: 'message', pic: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAM1BMVEUAAAAYkP9cYGZcYGYYkP8YkP9cYGZcYGZcYGZcYGZcYGZcYGZcYGZcYGZcYGZcYGYYkP9LbvZYAAAAD3RSTlMA5ugcSknb13tyOOBtT0k2xMGZAAAAcUlEQVQ4y+3TvQ6AIAwEYEqF8g/v/7Q2uhBIqnHQkHgDN/CxkJx6O0VXMbow0kGJCZqPKhsGP+qQATBjTwhag7GfoQ1gm3qFf1oP3VpL7nYX8bzA2O0uD6+SxcPYpIR4Vmy8EuMJkdjIcUSO60qx+TY7LS0Hn1qReCcAAAAASUVORK5CYII=', name: '在线留言'},
              {identification: 'video', pic: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkBAMAAAATLoWrAAAALVBMVEUAAABcYGYYkP9cYGZcYGYYkP9cYGYYkP8YkP8YkP8YkP8YkP8YkP9cYGYYkP93Co82AAAADXRSTlMA5uNJO/fnuK+FUiMK5nhXvgAAAElJREFUKM9joDUwvIsChIFCIqgqHIH4AqoQL02EOCIPoAvxvdPCFHpXjSn0CKsQYY1auB1BY29jD2gz1OhIpmpcQ/0MBQ+obTIAUJZAjInN/osAAAAASUVORK5CYII=', name: '在线视频'}
            ]
          }
        ]
      }
    },
    computed: {
      ...mapState({showstate: state => state}),
      getcurrentshowTabBar () {
        return this.showstate.NavigatorSet;
      }
    },
    mounted () {
      $('#tabs').css('height', document.body.clientHeight - 95);
    },
    methods: {
      ...mapMutations(['saveAllPageInfo']),
      ...mapMutations(['setCurrentPageInfo']),
      ...mapMutations(['setPageData']),
      changename (item, index) {
        // this.showstate.CurrentPageInfo.pageName = this.pagelist[index].pageName;
        // console.log(this.pagelist[index].pageName);
        window.sessionStorage.setItem('pagelistinfo', JSON.stringify(this.pagelist));
      },
      changepage (index, ev) {
        this.cptpage = index;
        this.pagelist = JSON.parse(window.sessionStorage.getItem('pagelistinfo'));
      },
      ChangeStatus (index) {
        let el = $('.sel' + index);
        if (el.hasClass('active')) {
          el.removeClass('active')
        } else {
          el.addClass('active')
        }
      },
      addpagebtn () {
        if (this.pagelist.length > 50) {
          this.$message.error('最多添加50个页面');
          return false;
        }
        const loading = this.$loading({lock: true, text: '添加页面中,请稍后...', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)'});
        let subData = {miniappId: this.showstate.miniappId, pageName: '自定义', pageDetails: ''}
        app.postfetch('/page/add', subData).then((res) => {
          loading.close();
          let obj = {pageName: '自定义', id: res.data.data.pageId}
          this.$message.success('添加页面成功！');
          // console.log(res.data.data.pageId)
          this.pagelist.push(obj);
          window.sessionStorage.setItem('pagelistinfo', JSON.stringify(this.pagelist));
          console.log(this.pagelist)
        }).catch(() => {
          loading.close();
          this.$message.error('添加页面数据失败！');
        })
        this.closebottomNav();
      },
      closebottomNav () {
        this.$emit('setcpsName', 'hidecps');
      },
      gopagebtn (item, index) {
        this.closebottomNav();
        // this.currentindex = index;
        // 如果是同一页面就不做任何操作
        if (this.showstate.CurrentPageInfo.id === item.id) return false;
        // 保存上一页数据
        this.SaveLastPage(item)
      },
      navcheck (item) {
        let flag = true;
        this.showstate.NavigatorSet.list.forEach((cur) => {
          if (cur.pageInfoId === item.id) {
            // console.log('1111111111111')
            this.$message.error('该当前页面已被底部导航使用，不能删除！');
            flag = false;
          }
        })
        return flag;
      },
      deletepagebtn (item, index) {
        if (this.navcheck(item)) {
          // if (item.tabBarCode) {
          //   this.$message.error('该当前页面已被底部导航使用，不能删除！');
          //   return false;
          // } else
          if (this.pagelist.length < 3) {
            this.$message.error('最少保留2个导航！');
            return false;
          }
          this.closebottomNav();
          this.$confirm('确定删除 "' + item.pageName + '" 页面吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            customClass: 'deleteinfo',
            type: 'warning'
          }).then(() => {
            this.pageid = item.id;
            this.delbtn(index);
          }).catch(() => {
            this.$message({type: 'info', message: '已取消删除'});
          });
        }
      },
      delbtn (index) {
        const loading = this.$loading({lock: true, text: '删除页面中,请稍后...', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)'});
        app.postfetch('/page/delPage/' + this.pageid + '?miniappId=' + this.showstate.miniappId).then((res) => {
          loading.close();
          this.pagelist.splice(index, 1);
          this.$message.success('删除页面成功！');
          window.sessionStorage.setItem('pagelistinfo', JSON.stringify(this.pagelist));
        }).catch(() => {
          loading.close();
          this.$message.error('删除页面失败！');
        })
      },
      SaveLastPage (item) {
        let page1datas = {pages1: this.showstate.currentPageData, Zindex: this.showstate.domZindex};
        let subData = {miniappId: this.showstate.miniappId, pageName: this.showstate.CurrentPageInfo.pageName, id: this.showstate.CurrentPageInfo.id, pageDetails: JSON.stringify(page1datas)}
        // 替换最新的数据
        if (this.findpageid(subData)) {
          // console.log(this.findpageid(subData))
          this.showstate.AllPageInfo[this.findpageid(subData)] = subData;
        }
        this.showstate.CurrentPageInfo.id = item.id;
        this.showstate.CurrentPageInfo.pageName = item.pageName;
        // console.log(this.showstate.AllPageInfo)
        this.saveAllPageInfo(this.showstate.AllPageInfo);
        this.getcurrentdata(item);
      },
      getcurrentdata (item) {
        if (!this.findpageid(item)) {
          const loading = this.$loading({lock: true, text: '获取当前页面数据中...,请稍后', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)'});
          // 如果缓存中不存在需要查询的id，则通过接口读取
          app.getfetch('/page/get/' + item.id + '/' + this.showstate.miniappId).then((res) => {
            let currentpageInfo = res.data.data.pageInfo;
            // this.showstate.CurrentPageInfo = {id: currentpageInfo.id, pageName: currentpageInfo.pageName}
            if (currentpageInfo.pageDetails !== '') {
              this.pagedata = [];
              this.pagedata = JSON.parse(currentpageInfo.pageDetails).pages1;
            } else {
              this.pagedata = [];
            }
            let pagedata = {id: item.id, miniappId: this.showstate.miniappId, pageDetails: currentpageInfo.pageDetails}
            this.showstate.AllPageInfo.push(pagedata)
            // console.log(this.showstate.AllPageInfo)
            this.setPageData(this.pagedata);
            loading.close();
          }).catch(() => {
            loading.close();
            this.$message.error('获取当前页面管理数据失败！');
          })
        } else {
          // 如果缓存中存在需要查询的id，则直接读出来
          // console.log(JSON.parse(this.showstate.AllPageInfo[this.findpageid(item)].pageDetails).pages1);
          this.setPageData(JSON.parse(this.showstate.AllPageInfo[this.findpageid(item)].pageDetails).pages1);
        }
        this.setCurrentPageInfo({id: item.id, pageName: item.pageName})
      },
      findpageid (subData) {
        let flag = false;
        this.showstate.AllPageInfo.forEach((item, index) => {
          if (subData.id === item.id) flag = index;
        });
        return flag;
      }
    }
  }
</script>
<style lang="less">
  @sprites: "/client/assets/images/sprites.png";
  .deleteinfo.el-message-box{width:400px !important;
    .el-message-box__header{position: relative;}
    .el-message-box__content{padding:10px 15px}
    .el-button--primary:focus, .el-button--primary:hover,{background:none;padding: 5px 15px}
    .el-button--primary,.el-button--small, .el-button--small.is-round{background: none;padding: 5px 15px}
  }
  #tabs{overflow: auto;}
  .el-message-box__headerbtn{z-index: 1000;}
  #tabs-2{width:100%;min-width: 200px;
    ul{padding-bottom:20px;}
    li{width:90%;margin:10px auto 0;border:1px solid #ccc;padding:5px;height: 40px;box-sizing: border-box;cursor: pointer;
      input{color:#333;font-size: 12px;  width:160px; width: 100px;border: none;}
      .deletebtnicon{float:right;cursor: pointer;line-height:30px;margin-right:10px;color:#909399;
        &::before{content:'';position:relative;top:5px;left:-5px;width:20px;height:20px;display:inline-block;background:url('@{sprites}') no-repeat;background-position: -515px -101px;
        }
        &:hover {color:#1890ff;}
        &:hover::before { background-position: -583px -101px;}
      }
      .el-input{width:auto;border:1px solid #fff;}
      &.active{border:1px solid #1890ff; .el-input{border:1px dashed #cccccc;background: #f5f5f5; }}
      &.addpagebtn{
        padding:0;border:none;
        a{color: #fff;text-align: center;display: block; cursor: pointer;    border-radius: 5px;background: #1890ff;height: 40px;line-height: 40px;font-size: 14px;}
      }
    }
  }
  .adminPage{width:100%;max-width:400px;height:50px;box-sizing:border-box;background:#fff;border-bottom: 1px solid #eceef2;
    a{text-align: center;cursor:pointer;line-height: 50px;color:#333;font-size: 14px;position: relative;display:block;flex: 1;
      &::before{content:'';width:80px;display:none;height:2px;background: #1890ff;position: absolute; left:0;right:0;margin:auto;bottom:-1px;}
      &:nth-child(1):after{content:'';width:1px;height:20px;position: absolute;right: 1px;top:15px;background: #eceef2;}
      &:hover,&.active{color:#1890ff;}
      &:hover::before,&.active::before{display: block;}
    }
  }
  .P_select{width:100%;max-width:400px;min-height:700px;float: left;flex: 1;z-index: 1000;position: relative;}
  .p_selectarea{transform:translateX(-100%);    transition: all .5s ease 0.3s;box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);background: #fff;}
  .showcps .p_selectarea{transform:translateX(0);}
  .pic{cursor: move;box-sizing:border-box;overflow: hidden;border:1px solid #eceef2;
    width:25%;height:100px;text-align:center;overflow: hidden;
    border-left:none;border-top:none;
    .area{width:100%;height:100%;}
    div{flex:1;text-align: center;pointer-events: none;}
  }
  .selectarea{
    width:100%;background: #fff;height:100%;flex: 1;overflow: hidden;
    .flex-wrap{height:100%;}
    &.active .flex-wrap{display: none !important;}
    &.active .yuansu_name{
      &::before{content:'';display:block;width:15px;height:15px;margin: 15px;float: right;
      background:url('@{sprites}') no-repeat;
      background-position: -395px -102px;}      
    }
    section{
      img{display: block;margin:18px auto 5px;width:36px;height:36px;}
    }
  }
</style>

