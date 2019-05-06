<template>
  <div class="box">
    <div class="cententBox">
      <div class="title">
        <span class="text">选择模板</span>
        <span class="shutDown" @click="shutDown"></span>
      </div>
      <div class="centent">
        <ul class="list">
          <li v-for="(item,index) in industryType" :key="index">
            {{item.name}}
            <span>&gt;</span>
              <div class="Secondary" v-for="(citem, index) in item.industryTypeList" :key="index" @click="Selected(citem)">
                {{citem.name}}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['industryType'],
  methods: {
    Selected (value) {
      this.$emit('getCode', value);
      this.shutDown();
    },
    shutDown () {
      const tool = false;
      this.$emit('DragIndustries', tool);
    }
  }
}
</script>

<style lang="less" scoped>
@sprites: "/client/assets/images/sprites.png";
.box {
  .clearfix:after {
    content: ".";
    display: block ;
    height: 0 ;
    clear: both ;
    visibility: hidden ;
  }
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10000;
  transform: translateY(-44px);
  .cententBox{
    width:800px;
    height:700px;
    background-color: #fff;
    border-radius: 4px;
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%, -50%);
    .title{
      width:770px;
      box-sizing: border-box;
      margin:15px;
      .text{
        font-size:14px;
        color:#303133;
      }
      .shutDown{
        float: right;
        width:14px;
        height:14px;
        cursor: pointer;
        background:url(@sprites) no-repeat -450px -104px;
        &:hover{
          background:url(@sprites) no-repeat -484px -104px;
        }
      }
    }
    .centent{
      width:100%;
      position: absolute;
      top:100px;
      .list{
        margin-left: 100px;
        li{
          margin-bottom: 30px;
          font-size:12px;
          color:#333;
          height:18px;
          line-height: 18px;
          span{
            margin-left:20px; 
          }
          div{
            display: inline-block;
            span{
              font-size:12px;
              color:#b5b5b5;
            }
          }
          .Secondary{
            color:#b5b5b5;
            margin-left:40px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
