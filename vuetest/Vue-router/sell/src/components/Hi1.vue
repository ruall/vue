<template>
  <div>
    <h2>{{msg}}--{{$route.params.username}}</h2>
  </div>
</template>

<script>
export default {
  name: 'Hi1',
  data(){
    return {
      msg: 'I am Hi1 page',
    }
  },
}
</script>

<style>

</style>
