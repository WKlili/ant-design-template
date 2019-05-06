const path = require('path')
const AntDesignThemePlugin = require('antd-theme-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'
const prodTheme = require('./theme')
const devTheme = {
  'border-radius-base': '2px'
}

process.env.VUE_APP_USER = process.env.USER
process.env.VUE_APP_BUILD_DATETIME = new Date()

const options = {
  stylesDir: path.join(__dirname, './src/assets/styles'),
  antDir: path.join(__dirname, './node_modules/ant-design-vue'),
  varFile: path.join(__dirname, './src/assets/styles/variables.less'),
  mainLessFile: path.join(__dirname, './src/assets/styles/index.less'),
  themeVariables: [
    '@primary-color',
    '@secondary-color',
    '@text-color',
    '@text-color-secondary',
    '@heading-color',
    '@layout-body-background',
    '@btn-primary-bg',
    '@layout-header-background'
  ]
}

const config = {
  publicPath: './',
  outputDir: 'dist',
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        modifyVars: isDev ? devTheme : prodTheme,
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    plugins: [
      isDev && new AntDesignThemePlugin(options)
    ].filter(Boolean)
  }
}

module.exports = config
