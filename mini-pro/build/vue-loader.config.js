module.exports = (isDev) => {
  const identName = isDev ? '[path][name]---[local]---[hash:base64:5]' : '[hash:base64:5]'
  return {
    cssModules: { // 配置使用css module，使用$style在template中使用
      localIdentName: identName,
      camelCase: true
    },
    hotReload: isDev, // 配置是否开启热重载
    // preLoaders: {  // 在vue-loader处理之前先用指定loader处理
    //   js: '...'
    // },
    // postLoaders: { // 在vue-loader处理之后，再用指定loader处理
    //   html: '...'
    // }
    extractCss: !isDev, // 提取vue文件中的css到单独css文件
    // loaders: {
    // 'docs': '...' // 自定义区块指定loader
    // },
    preserveWhitespace: true // 忽略模板中标签之前的空格
  }
}

/**
 * <template functional>
 *   <div>{{props.foo}}</div>
 * </template>
 * 自动编译成functional组件
 */
