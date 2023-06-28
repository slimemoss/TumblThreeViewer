const path = require('path')

// https://qiita.com/teinen_qiita/items/4e828ac30221efb624e1
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  output: {
    publicPath: '/dist/',
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    historyApiFallback: true,
    static: {
      directory: __dirname,
    },
    hot: true,
    liveReload: true,
  },
})
