import Vue from 'vue'
import Vuex from 'vuex'
import Vuerouter from 'vue-router'
import Router from './config/router'
import Store from './store/store'
import App from './app.vue'
// import $ from 'jquery'
import './assets/js/jquery-ui.min'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { size: 'small', zIndex: 30000 });
Vue.use(Vuex)
Vue.use(Vuerouter)

// Vue.prototype.$alert = MessageBox.alert;
var router = new Router()
var store = new Store()
new Vue({
  el: '#root', // webpack里面入口文件templete.html中的'#root'
  router,
  store,
  render: (h) => h(App)
})
