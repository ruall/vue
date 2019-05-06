const path = require('path')
// html打包
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// 合理合并不同的webapck配置
const merge = require('webpack-merge')
// 单独把不是js的文件拿出来打包成一个静态资源文件
const ExtractPlugin = require('extract-text-webpack-plugin')
// 引入公共配置文件config.base.js
const baseConfig = require('./webpack.config.base.js')
const isDev = process.env.NODE_ENV === 'development'
// 生成vue-ssr-client-manifest.json,提供给服务器axios调用
const VueClientPlugin = require('vue-server-renderer/client-plugin')
// 代码压缩用ParallelUglifyPlugin代替自带的 UglifyJsPlugin插件自带的JS压缩插件是单线程执行的，而webpack-parallel-uglify-plugin可以并行的执行
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const defaultPluins = [
  // 用来区分开发和生产环境(生产环境可以不打包一些不需要用到的代码)
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, isDev ? 'template.html' : 'template1.html'),
    // inject: false,
    minify: {
      removeAttributeQuotes: isDev ? false : true, // 移除html属性的引号
      collapseWhitespace: isDev ? false : true // 压缩html
    }
    // excludeChunks: ['index']
  }),
  new VueClientPlugin() // 默认生成vue-ssr-client-manifest.json
]
// const publicUrl = isDev ? '' : 'http://test.miniapp.cangluxmt.com';
// 配置devserver (webpack2才有的配置项)
const devServer = {
  port: 8000,
  host: '192.168.30.178',
  overlay: {// webpack编译出现错误，则显示到网页上，方便快速查找问题
    errors: true
  },
  // 把没有映射的地址都映射到入口文件index.html
  historyApiFallback: {
    index: '/index.html',
    template: path.join(__dirname, '/index.html') // 和output输入路劲一致
  },
  // 每次启动webdevserver后会自动打开浏览器地址
  open: true,
  // 设置为true是热更新(只渲染更新局部组件修改代码效果，页面不刷新)
  hot: true
}
let config
// 如果是开发环境执行
if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map', // 映射es5代码到浏览器方便调试查看(写法有多种，但官方推荐使用这个)
    module: {
      rules: [
        {
          test: /\.(less|scss|css)$/,
          use: [
            // style-loader功能是将css编译后写入js里面，生产环境不用写入js里面，所以要区分生产和开发环境
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'less-loader'
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPluins.concat([
      // 启用热加载需要使用到的插件
      new webpack.HotModuleReplacementPlugin(),
      // webpack4已经取消NoEmitOnErrorsPlugin
      new webpack.NoEmitOnErrorsPlugin(),
      // 提取依赖第三方依赖比如vue、vuex、vue-router模块（提升打包速度）
      new webpack.DllReferencePlugin({
        context: path.resolve(__dirname, ''),
        manifest: require('./manifest.json')
      }),
      new ExtractPlugin('styles.[contentHash:8].css')
      // 3. 配置全局使用 jquery
      // new webpack.ProvidePlugin({
      //   $: "jquery",
      //   jQuery: "jquery",
      //   jquery: "jquery",
      //   "window.jQuery": "jquery"
      // })
    ])
  })
} else {
  // 如果是生产环境执行
  config = merge(baseConfig, {
    entry: {// 将所用到的类库单独打包
      app: path.join(__dirname, '../client/index.js')
      // vendor: ['vue']
    },
    // 生产环境使用chunkhash,开发环境使用hash
    output: {
      filename: '[name].[chunkhash:8].js',
      path: path.join(__dirname, '../dist')
    },
    module: {
      rules: [
        {
          test: /\.(less|css)/,
          use: ExtractPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: true // css压缩
                }
              },
              {
                // 提升编译css效率
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'less-loader'
            ],
            // fallback将css提取到一个style.css
            fallback: 'style-loader'
            // publicPath: '../../'
          })
        }
      ]
    },
    // 这里使用webpack3版本CommonsChunkPlugin模块指定输出静态文件名字
    // (ps:webpack4已经废弃CommonsChunkPlugin,改为用optimization)
    plugins: defaultPluins.concat([
      new ExtractPlugin('styles.[contentHash:8].css'),
      // 把自己写的app.js代码提取出来单独生成一个静态文件
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'vendor'
      // }),
      // // 把webpack代码提取出来单独生成一个静态文件
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'runtime'
      // }),
      // 使用ModuleConcatenationPlugin插件来加快JS执行速度
      new webpack.optimize.ModuleConcatenationPlugin({}),
      // new webpack.optimize.UglifyJsPlugin(), // 压缩代码
      new ParallelUglifyPlugin({// 压缩代码
        cacheDir: '.cache/',
        uglifyJS: {
          output: {comments: false},
          compress: {warnings: false}
        }
      }),
      new webpack.NamedChunksPlugin() // 重命名name.js例如：main-view.3104d433.js
    ])
  })
}

module.exports = config
