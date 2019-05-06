const path = require('path')
// html打包
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
// 单独把不是js的文件拿出来打包成一个静态资源文件(ps:但不会把.vue文件里的css样式单独拿出来)
const ExtractPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
  // 生产环境使用chunkhash,开发环境使用hash    
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name]-aaa.[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 编译时候判断当前环境
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin()
  ]
}

if (isDev) {
  // 如果是开发环境执行
  config.module.rules.push({
    test: /\.styl/,
    use: [
      // style-loader功能是将css编译后写入js里面，生产环境不用写入js里面，所以要区分生产和开发环境
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        }
      },
      'stylus-loader'
    ]
  })
  //映射es5代码到浏览器
  config.devtool = '#cheap-module-eval-source-map'
  //配置devserver
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true,
    },
    //设置为true是热更新(只渲染更新局部修改代码，页面不刷新)
    hot: true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    // webpack4已经取消NoEmitOnErrorsPlugin
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  // 如果是生产环境执行  
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  }
  // 生产环境使用chunkhash,开发环境使用hash
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(
    {
      test: /\.styl/,
      use: ExtractPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            // 提升编译css效率
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            }
          },
          'stylus-loader'
        ]
      })
    }
  )
  //这里使用webpack3版本CommonsChunkPlugin模块指定输出静态文件名字
  // (ps:webpack4已经废弃CommonsChunkPlugin,改为用optimization)
  config.plugins.push(
    new ExtractPlugin('styles.[contentHash:8].css'),
    // 把自己写的app.js代码提取出来单独生成一个静态文件    
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // 把webpack代码提取出来单独生成一个静态文件
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  )
}

module.exports = config
