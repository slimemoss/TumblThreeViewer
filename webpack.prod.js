// https://qiita.com/teinen_qiita/items/4e828ac30221efb624e1

const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  output: {
    publicPath: '/react-router-test/#',
  },
})
