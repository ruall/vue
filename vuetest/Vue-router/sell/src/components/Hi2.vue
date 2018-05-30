<template>
  <div>
    <h2>{{msg}}--{{$route.params.username}}</h2>
  </div>
</template>

<script>
export default {
  name: 'Hi2',
  data(){
    return {
      msg: 'I am Hi2 page',
    }
  },
}
</script>

<style>

</style>
