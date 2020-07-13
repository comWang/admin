const path = require('path')
const webpack = require('webpack')
const buildDate = JSON.stringify(new Date().toLocaleString())

const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
  // webpack build externals
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
  },
  css: [],
  // https://unpkg.com/browse/vue@2.6.10/
  js: [
    '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.1.3/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js',
  ],
}

// vue.config.js
const vueConfig = {
  publicPath: './',
  configureWebpack: {
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DefinePlugin({
        APP_VERSION: `"${require('./package.json').version}"`,
        BUILD_DATE: buildDate,
      }),
    ],
  },

  chainWebpack: config => {
    config.resolve.alias.set('@', path.join(__dirname, 'src'))

    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]',
      })
    // 框架从cdn加载，这里cdn是自定义配置，index模板从中取值生成标签
    if (isProd) {
      config.plugin('html').tap(args => {
        // 单页只有一个实例配置
        args[0].cdn = assetsCDN
        return args
      })
      config.merge({ externals: assetsCDN.externals })
    }
  },
  devServer: {
    port: 3000,
    proxy: {
      '/api': {
        pathRewrite: { '/api': '' },
        target: 'https://example.com',
        ws: false,
        changeOrigin: true,
      },
    },
  },
  css: {
    loaderOptions: {
      less: {
        prependData: '@import \'@/global.less\';',
      },
    },
  },
  productionSourceMap: false,
  lintOnSave: 'warning',
}

module.exports = vueConfig
