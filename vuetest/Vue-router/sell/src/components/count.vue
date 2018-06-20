<template>
  <div>
    <h2>{{msg}}</h2>
    <hr/>
    <h3>{{$store.state.count}}--{{count}}</h3>
    <p>
      <button @click="reduce">-</button>
      <button @click="$store.commit('add',5)">+</button>
    </p>
  </div>
</template>

<script>
  import store from '@/vuex/store';
  import { mapState,mapMutations } from 'vuex';
  export default {
    data(){
      return{
        msg:'hello vuex'
      }
    },
    /*computed:{
      count(){
        return this.$store.state.count;
      }
    },*/
    /*computed:mapState({
      // count:state=>state.count 等同于下面写法
      count:function(state){
        return state.count;
      }
    }),*/
    computed:mapState(['count']),
    methods:mapMutations(['add','reduce']),
    store,
  }
</script>
