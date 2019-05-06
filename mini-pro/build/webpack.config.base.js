// 当前webpack.config.base.js文件存放公共文件
const path = require('path')
// 引入单独.vue模板文件样式与其他页面样式打包到同一个css里面，可提高样式渲染速度(不引入就会增加渲染样式的时间，因为是不同的css文件)
const createVueLoaderOptions = require('./vue-loader.config')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, '../client/index.js'),
  // entry: path.join(__dirname, '../client/client-entry.js'),
  output: {
  // 生产环境使用chunkhash,开发环境使用hash也可以不使用
    // filename: '[name].[hash:8].js',
    filename: '[name].js', // 开发环境不适用hash提升编译效率
    path: path.join(__dirname, '../dist'),
    publicPath: isDev ? 'http://192.168.30.178:8000/' : 'http://test.miniapp.cangluxmt.com/'// 上线后引用地址
    // publicPath: 'public'
  },
  externals: {
    'AMap': 'AMap'
  },
  module: {
    rules: [
      {
        // 编译解析.vue文件前先用eslint检测代码是否有错并报错，且停止执行vue-loader操作
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        // 编译解析.vue文件
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader?cacheDirectory'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory',
        exclude: /node_modules/
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024, // 文件小于1024字节，转换成base64编码，写入文件里面
              name: 'resources/[path][name].[hash:8].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              optipng: { optimizationLevel: 7 }
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
        options: {
          name: 'resources/[path][name].[hash:8].[ext]'
        }
      }
    ]
  },
  // 暂时放到开发环境中
  plugins: [
    // 提取依赖第三方模块（提升打包速度）
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, ''),
      manifest: require('./manifest.json')
    }),
    // 3. 配置全局使用 jquery
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      jquery: "jquery",
      "window.jQuery": "jquery"
    })
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
      modules: [
        path.resolve('src'),
        path.resolve('node_modules')
      ],
      alias: {
      // vue默认使用运行时构建缺点是不支持模板渲染，这里使用指定vue使用独立构建可避免这个问题(但用dll插件的话这里需要注释掉因为会重新打包vue)
        // 'vue$': 'vue/dist/vue.common.js',
        // 'src': resolve('src'),
        // 'assets': resolve('src/assets'),
        // 'components': resolve('src/components'),
        // 2. 定义别名和插件位置
        // webpack 使用 jQuery，如果是自行下载的
        // 'jquery': path.resolve(__dirname, '../src/assets/libs/jquery/jquery.min'),
        // 如果使用NPM安装的jQuery
        'jquery': 'jquery'
      }
  }
}

module.exports = config
