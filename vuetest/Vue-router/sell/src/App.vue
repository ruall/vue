<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <router-link to="/gohome">首页</router-link>
      <router-link to="/hi">Hi页面</router-link>
      <router-link :to="{name:'Hi1',params:{username:'test1'}}">Hi1页面</router-link>
      <router-link :to="{name:'Hi2',params:{username:'test2'}}">Hi2页面</router-link>
      <router-link to="/params/111/多撒点">Params页面</router-link>
      <router-link to="/goHome">返回首页</router-link>
      <router-link to="/goParams/618/test a ">Params页面2</router-link>
      <router-link to="/goHi1">goHi1页面</router-link>
      <router-link to="/asdjknajdnakjd">404</router-link>
      <button @click="goback">后退</button>
      <button @click="gohome">回首页</button>
    </div>
    <div>{{$route.name}}</div>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods:{
    goback(){
      this.$router.go(-1);
    },
    gohome(){
      this.$router.push('/');
    },
  },
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
  .fade-enter{
    opacity: 0;
  }
  .fade-leave{
    opacity: 1;
  }
  .fade-enter-active{
    transition: opacity .5s;
  }
  .fade-leave-active{
    opacity: 0;
    transition: opacity .5s;
  }
</style>
