<template>
  <div id="app">
    <Loading v-if="loadingstate.loading"></Loading>
    <div class="main" >
      <div class="block">
        <transition name="fade">
          <router-view />
       </transition>
      </div>
    </div>
  </div>
</template>
<script>

import Loading from './views/components/loading.vue'
import './assets/styles/global.less'

import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    Loading
  },
  data () {
    return {
      info: {}
    }
  },
  computed: {
    ...mapState({
      loadingstate: state => state
    })
  },
  // created () {
  //   this.SetMiniappId(this.MiniappId);
  // },
  mounted () {},
  methods: {
    ...mapMutations(['setMiniappId']),
    SetMiniappId (id) {
      this.setMiniappId(id)
    }
  }
}
</script>