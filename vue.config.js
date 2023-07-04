let port = "4902"
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const isProd = process.env.NODE_ENV === "production"

module.exports = {
  lintOnSave: false,
  configureWebpack: {
    devtool: false,
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 200000,
      }
    }
  },
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: port,
    https: false,
    hotOnly: false,
    proxy: null, // string | Object
    before: app => {
      // app is an express instance
    }
  },
  configureWebpack: {
    optimization: {
      minimizer: isProd ? [
        new UglifyJsPlugin({
          uglifyOptions: {
            compress: {
              drop_console: true
            },
          }
        })
      ] : []
    }
  }
}
