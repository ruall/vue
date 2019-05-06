// 编译完css后，对其进行优化操作
const autoprefixer = require('autoprefixer')
module.exports = {
  plugins: [
    autoprefixer()
  ]
}
