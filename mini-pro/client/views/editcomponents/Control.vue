<template>
  <div class="style_select controlcps">
    <div class="stylename">控件</div>
    <ul class="controllists">
      <li v-for="(item,index) in Controllists" :key="index" :class="{'active': tabs == index}"><span>{{item.name}}</span><a class="editbtn" @click="edit(item,index)">编辑</a></li>
    </ul>
    <transition name="fade">
    <ul class="btnchangestyle" v-if="tabs == 0">
      <li><a>栏目高度</a><el-input class="widthinput" type="number" v-model="jishuStyle.h"  maxlength="3" placeholder="请输入宽度"></el-input>
      </li>
      <li><a class="fl">文字设置</a>
        <el-select class="fl"  v-model="jishuStyle.fs" placeholder="请选择">
          <el-option v-for="item in fontoptions" :key="item.value" :value="item.value"></el-option>
        </el-select>
        <span class="rel fl ml10">
          <el-color-picker v-model="jishuStyle.co" show-alpha :predefine="predefineColors"></el-color-picker>
        <span class="colorspan">{{jishuStyle.co}}</span>
        </span>
      </li>
      <li>
        <a class="fl">背景颜色</a>
         <span class="rel fl">
          <el-color-picker v-model="jishuStyle.bgc" show-alpha :predefine="predefineColors"></el-color-picker>
          <span class="colorspan fl">{{jishuStyle.bgc}}</span>
         </span>
        <!-- <span class="setbtnbg">设置背景图片</span> -->
      </li>
      <li><a>文字内容</a><el-input type="textarea" :rows="2"  placeholder="请输入内容" v-model="jishuStyle.tt"></el-input></li>
    </ul>
    </transition>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  export default{
    data () {
      return {
        Controllists: [{name: '底部——技术支持1'}, {name: '底部——技术支持2'}],
        jishuStyle: {
          w: '375', co: '#606266', fs: '14', bgc: 'rgb(230, 230, 230)', h: '50', tt: '由***提供技术支持'
        },
        tabs: null,
        fontoptions: [
          {value: '12'}, {value: '13'}, {value: '14'}, {value: '15'}, {value: '16'}, {value: '17'}, {value: '18'}, {value: '19'}, {value: '20'}, {value: '24'}, {value: '30'}, {value: '48'}, {value: '60'}, {value: '72'}, {value: '84'}, {value: '96'}, {value: '108'}, {value: '120'}
        ]
      }
    },
    computed: {
      ...mapState({showstate: state => state})
    },
    watch: {
      jishuStyle: {
        handler (curVal, oldVal) {
          this.showstate.supportText = this.jishuStyle;
        }
      }
    },
    methods: {
      changeCurrentStyle (config) {
        this.jishuStyle = this.showstate.supportText;
      },
      edit (item, index) {
        this.tabs = index;
      }
    }
  }
</script>
<style lang="less">
  .showControlstyle .controlcps{transform:translateX(0);}
  .el-textarea.el-input--small{width:270px;}
  .controllists{
    width:360px;margin: 0 auto;
    li{width:100%;height:40px;line-height: 40px;border:1px solid #ccc;border-radius:5px;padding:0 10px;margin:10px 0;
      span{color:#606266;font-size: 12px;text-indent:30px;
        &:before{content:'';display: inline-block;width:15px;top:2px;height:13px;position: relative; left: -2px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAMAAABlXnzoAAAAY1BMVEUAAACoq7Ooq7Ooq7Ooq7Ooq7Ooq7Ooq7Ooq7Ooq7Ooq7Ooq7Ooq7Ooq7Ooq7Ooq7Ooq7Ooq7Ooq7Ooq7Ooq7Ooq7Ooq7Ooq7Ooq7Ooq7Ooq7Ooq7Ooq7Ooq7Ooq7Ooq7Ooq7PdveSoAAAAIHRSTlMAD9sL1LyLeV0o5OGYcgLqzFZNRhvHh2g7NB4HpI2CIUOQJw4AAAB5SURBVAjXTclFFsMwEATRnhGjQTIHfP9TRtYqf1ev8Oe60AmrtRW0zL2sj9ZGL00vvZzImUZ+51ZGCaRhCEmotg8mOHZycCDekSJQlNxeMxANhCz43ioFQmEBuDBJs+oTe3Bo5lsRQB8+nqq8rX4cvSY8pgnItaL7AabFBR1+TZQ1AAAAAElFTkSuQmCC);}
      }
      a.editbtn{color:#1890ff;font-size: 12px;float:right;display: block;cursor: pointer;
        &:before{content:'';width:15px;height:16px;display: inline-block;    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMBAMAAACkW0HUAAAAElBMVEUAAACQk5mQk5mQk5mQk5mQk5mF7NLrAAAABXRSTlMAU/VQo124uMAAAAA0SURBVAjXYwgNDQ1gdGAIYGBgMBIAUcyKDEAKyGEFUkAOkAJyQBSQA6JYBIAUSAkmFQoGAFvsCB06gdnUAAAAAElFTkSuQmCC) no-repeat;position: relative;top: 4px; left: -3px;
    background-position: center;
        }
        &:hover:before{content:''; left:-1px;   top: 6px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMBAMAAACkW0HUAAAAElBMVEUAAAAYkP8YkP8YkP8YkP8YkP+F9YDgAAAABXRSTlMAU/VQo124uMAAAAA0SURBVAjXYwgNDQ1gdGAIYGBgMBIAUcyKDEAKyGEFUkAOkAJyQBSQA6JYBIAUSAkmFQoGAFvsCB06gdnUAAAAAElFTkSuQmCC) no-repeat;}
      }
      &.active span:before{top:1px;height:10px;background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAKCAMAAACzB5/1AAAARVBMVEUAAACTlZmTlZmTlZmTlZmTlZmTlZmTlZmTlZmTlZmTlZmTlZmTlZmTlZmTlZmTlZmTlZmTlZmTlZmTlZmTlZmTlZmTlZlfZZDTAAAAF3RSTlMABOnSu4UmrjMM+KZ624stFpE63D8+I1cjuawAAABfSURBVAjXTY7bDoAgDEO7MQSUu5f//1QHMcS+LCfp2kK1ZbPvJm8YIsvWh+D1kJKTCvgCVHGEKAQcZzoAkgjWl8sQmVtDeGIf2IGHP3OaZmd/UcEJraISuSmtGW3MeAHUDQLk+yqvwwAAAABJRU5ErkJggg==);}
    }
  }
</style>

