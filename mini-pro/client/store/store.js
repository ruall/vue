import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

// vuex没有使用热重载模式开发
const isDev = process.env.NODE_ENV === 'development'
export default () => {
  return new Vuex.Store({
    strict: isDev,
    state: defaultState,
    mutations,
    getters,
    actions
  })
}

// // 采用vuex热重载
// export default () => {
//   const store = new Vuex.Store({
//     state: defaultState,
//     mutations,
//     getters,
//     actions
//   })

//   if (module.hot) {
//     // 使 action 和 mutation 成为可热重载模块
//     module.hot.accept([
//       './mutations/mutations',
//       './actions/actions',
//       './getters/getters',
//       './state/state'
//     ], () => {
//       // 获取更新后的模块
//       // 因为 babel 6 的模块编译格式问题，这里需要加上 `.default`
//       const newMutations = require('./mutations/mutations').default
//       const newActions = require('./actions/actions').default
//       const newGetters = require('./getters/getters').default
//       const newState = require('./state/state').default
//       // 加载新模块
//       store.hotUpdate({
//         state: newState,
//         mutations: newMutations,
//         actions: newActions,
//         getters: newGetters
//       })
//     })
//   }

//   return store
// }
