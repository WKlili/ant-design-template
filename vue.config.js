process.env.VUE_APP_USER = process.env.USER
process.env.VUE_APP_BUILD_DATETIME = new Date()

const config = {
  publicPath: './',
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
}

module.exports = config
