
export default [
  {path: '/', redirect: '/login'},
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login-view" */'../views/authorize/login.vue'),
    meta: {title: '登录'}
  },
  {
    path: '/authorize',
    // props: true,
    component: () => import(/* webpackChunkName: "authorize-view" */'../views/authorize/authorize.vue'),
    meta: {title: '授权'}
  },
  {
    path: '/app',
    // props: true,
    // props: (route) => ({id: route.params.id}), // 将 route.query或者route.params 中的值灵活传入Todo组件中
    component: () => import(/* webpackChunkName: "app-view" */'../views/main.vue'), // 只有一个<route-view>时用这个  // 这里用import 按需加载组件
    // component: main,
    meta: {title: '小程序设计'}
    // beforeEnter: (to, from, next) => {
    //   // window.alert('ssss')
    //   next();
    // }
  }
]
