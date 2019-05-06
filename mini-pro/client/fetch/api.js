import axios from 'axios'
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// 设置默认请求头
axios.defaults.headers = { 'Content-Type': 'application/json' }
// 带cookie请求
axios.defaults.withCredentials = true;
const isDev = process.env.NODE_ENV === 'development'
// console.log(isDev)
const BaseUrl = isDev ? 'http://192.168.30.172:8082' : 'http://test.minisite.cangluxmt.com'
// 图片服务器地址
const imageUrl = 'http://test.image.cangluxmt.com/jcshopimage'
const headers = {
  'Content-Type': 'application/json'
}
// console.log(process.env.NODE_ENV)
export default {
  BaseUrl,
  imageUrl,
  postfetch (url, params) {
    return new Promise((resolve, reject) => {
      axios.post(BaseUrl + url, params)
        .then(response => {
          // console.log(response.data)
          let res = response.data;
          if (!res.success && res.message === '未登录') window.location.href = '/login';
          resolve(response);
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  },
  getfetch (url, params) {
    // console.log(url, params)
    return new Promise((resolve, reject) => {
      axios.get(BaseUrl + url, headers, params)
        .then(response => {
          // console.log(response.data)
          let res = response.data;
          if (!res.success && res.message === '未登录') window.location.href = '/login';
          resolve(response);
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  }
}
