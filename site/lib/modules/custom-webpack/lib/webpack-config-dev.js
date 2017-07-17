const defaultOptions = require('./default-options.js')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const makeBaseConfig = require('./webpack-config-base.js')
const merge = require('webpack-merge')
const styleLoaders = require('./style-loaders')
const webpack = require('webpack')
const path = require('path')

module.exports = function (options) {
  options = defaultOptions(options)

  options.env.NODE_ENV = options.env.NODE_ENV || "'development'"
  options.dev = true

  const baseWebpackConfig = makeBaseConfig(options)

  return Object.assign({}, merge(baseWebpackConfig, {
    module: {
      rules: styleLoaders.styleLoaders({ sourceMap: true })
    },

    devtool: options.devDevtool,

    plugins: [
      new webpack.DefinePlugin({
        'process.env': options.env
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new FriendlyErrorsPlugin(),
    ]
  }), {
    // Add client dev tools (mostly HMR)
    entry: baseWebpackConfig.entry.concat([path.resolve(__dirname, './dev-client')]),
  })
}
