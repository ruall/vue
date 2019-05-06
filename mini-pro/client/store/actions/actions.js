import api from '../../fetch/api';

export default {// 同步修改数据用mutations,异步修改数据用actions
  // showloader: ({ commit }) => {
  //   commit(types.SHOWLOADING)
  // },
  // hideloader: ({ commit }) => {
  //   commit(types.HIDELOADING)
  // }
  // 控制loding
  startLoding ({state, commit}, data) {
    commit('updateLoadingStatus', data)
  },
  // 封装一个 ajax 方法
  GetAjaxData ({commit}, context) {
    // console.log(context)
    api.fetch(context.url, context.data).then(res => {
      console.log('action中调用封装后的axios成功')
      commit('GetData', res)
    }).catch(res => {
      console.log('获取数据失败：' + res)
      commit('GetDatafail', '12')
    })
  }
}
