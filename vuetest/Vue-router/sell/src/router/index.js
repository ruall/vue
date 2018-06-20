import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Hi from '@/components/Hi'
import Hi1 from '@/components/Hi1'
import Hi2 from '@/components/Hi2'
import Params from '@/components/params'
import Count from '@/components/count'

Vue.use(Router)

export default new Router({
  mode: 'hash',//路由设置，ulr设置
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      alias:'/gohome',
    },
    {
      path:'/count',
      component:Count,
    },
    {
      path:'/params/:newsId(\\d+)/:newsTitle',
      component:Params,
    },
    {
      path:'/goHome',
      redirect:'/',
    },
    {
      path:'/goParams/:newsId(\\d+)/:newsTitle',
      redirect:'/params/:newsId(\\d+)/:newsTitle',//域名重定向
    },
    {
      path:'/Hi1',
      component:Hi1,
      alias:'/goHi1',//alias别名
    },
    {
      path:'/hi',
      component:Hi,
      children:[
        {path:'/',name:'Hi',component:Hi},
        {path:'Hi1',name:'Hi1',component:Hi1},
        {path:'Hi2',name:'Hi2',component:Hi2},
      ],
    },
    {
      path:'*',
      component:Error,
    }
  ]
})
