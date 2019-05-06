import Rourter from 'vue-router'
import routes from './routes'
// console.log('routes', routes)
export default () => {
  return new Rourter({
    routes,
    mode: 'history', // 配置history路由形式，不写则默认是hash形式
    // base: '/base/', // 不太常用
    // 在前端进行路由跳转的时候设置class名(使用<router-link>标签,不适用<a>标签)
    linkActiveClass: 'active-link', // 父级
    linkExactActiveClass: 'exact-active-link', // 子级
    scrollBehavior (to, from, savedposition) {
      if (savedposition) {
        return savedposition
      } else {
        return {x: 0, y: 0}
      }
    }
    // fallback: true, //默认为true,可以不设置此项 (true代表当浏览器遇到不止支持history形式路径跳转就自动跳转成hash形式路由)
    // 获取路径参数
    // parseQuery(query) {

    // },
    // stringifyQuery(obj) {

    // }
  })
}
