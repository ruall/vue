const webpack = require('webpack')
const path = require('path')
// const swiper = path.resolve(__dirname, '../client/assets/js/swiper.min.js');
const vendors = [
  'vue',
  'vuex',
  'vue-router'
  // ...其它库
];

module.exports = {
  output: {
    path: path.resolve(__dirname, ''),
    filename: '[name].min.js',
    library: '[name]'
  },
  entry: {
    'dll': vendors
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, 'manifest.json'),
      name: '[name]',
      context: path.resolve(__dirname, '')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: {
        except: ['$super', '$', 'exports', 'require']
      },
      minimize: true,
      output: {comments: false}
    })
  ]
}
