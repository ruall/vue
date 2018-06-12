<template>
  <div>
    <h2>{{msg}}</h2>
  </div>
</template>

<script>
export default {
  name: 'Error',
  data(){
    return {
      msg: '404 undefined',
    }
  },
  beforeRouteEnter:(to,from,next)=>{
    console.dir(from);
    console.log('准备进入路由模板');
    next();
  },
  beforeRouteLeave:(to,from,next)=>{
    console.dir(to);
    console.log('准备离开路由模板');
    next();
  },
}
</script>

<style>

</style>
