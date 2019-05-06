<template>
  <div id="logincontent">
      <div style="width:400px;margin:0 auto;">
        <p>这里是登录页面</p>
        <el-input type="text" v-model="info.name" placeholder="账号"></el-input>
        <el-input type="text" v-model="info.password" :value="info.pwd" placeholder="密码"></el-input>
        <el-button @click="login()" style="display:block;margin:0 auto;">登录</el-button>
      </div>
  </div>
</template>
<script>
import app from '../../fetch/api.js'
import { mapState, mapMutations } from 'vuex';

export default {
  data () {
    return {
      info: {name: 'yiq', password: '123123'}
    }
  },
  mounted () {
    this.hideload();
  },
  computed: {
    ...mapState({showstate: state => state})
  },
  methods: {
    ...mapMutations(['updateLoadingStatus']),
    ...mapMutations(['setMiniappId']),
    // SetMiniappId (id) {
    //   this.setMiniappId(id)
    // },
    hideload () {
      this.updateLoadingStatus({showloading: false, texts: ''})
    },
    login () {
      const loading = this.$loading({
        lock: true,
        text: '登录中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      // window.location.href = '/app'
      app.postfetch(`/doLogin?name=${this.info.name}&password=${this.info.password}`).then((res) => {
        this.setMiniappId(res.data.data.miniappId)
        this.$router.push({ path: '/authorize' })
        loading.close();
      }).catch(() => {
        loading.close();
        // this.$router.push({ path: '/app' })
        this.$message.error('登录失败！请稍后再试试看');
      })
    }
  }
}
</script>
<style lang="less" scoped>
  #logincontent{position: absolute;top:0;left:0;width: 100%;}
</style>

