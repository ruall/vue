<template>
    <div class="left-nav">
      <ul>
        <li>
          <i class="icon iconfont icon-gongnengjianyi"></i>
          <div>设置</div>
        </li>
        <li>
          <i class="icon iconfont icon-dianpu"></i>
          <div>店铺</div>
        </li>
        <li>
          <i class="icon iconfont icon-goumai"></i>
          <div>购买</div>
        </li>
        <li>
          <i class="icon iconfont icon-hanbao"></i>
          <div>商品</div>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "leftNav"
    }
</script>

<style>
  .left-nav{
    width: 5%;
    height: 100%;
    background-color: #1d8ce0;
    color: #fff;
    float: left;
    font-size: 10px;
  }
  .left-nav ul{
    padding: 0;
    margin: 0;
  }
  .iconfont{
    font-size: 24px;
  }
  .left-nav li{
    list-style: none;
    text-align: center;
    border-bottom: 1px solid #fff;
    padding: 10px;
    cursor: pointer;
  }
</style>
