const path = require('path')
const AntDesignThemePlugin = require('antd-theme-webpack-plugin')

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
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: process.env.NODE_ENV !== 'production',
  css: {
    loaderOptions: {
      css: {
        javascriptEnabled: true
      },
      less: {
        modifyVars: {
          'border-radius-base': '2px'
        },
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    plugins: [
      new AntDesignThemePlugin(options)
    ]
  }
}

module.exports = config
