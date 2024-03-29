const defaultOptions = require('./default-options.js')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const makeBaseConfig = require('./webpack-config-base.js')
const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')

module.exports = function(options) {
  options = defaultOptions(options)

  options.env.NODE_ENV = options.env.NODE_ENV || "'development'"
  options.dev = true

  const baseWebpackConfig = makeBaseConfig(options)
  const assetsPath = _path => path.posix.join(options.assetsSubDirectory, _path)

  return Object.assign(
    {},
    merge(baseWebpackConfig, {
      devtool: options.devDevtool,
      plugins: [
        new webpack.DefinePlugin({ 'process.env': options.env }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin(),
      ],
      module: {
        rules: [
          {
            test: /\.scss$/,
            loader: [
              {
                loader: 'style-loader',
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                },
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: [require('autoprefixer')],
                  sourceMap: true,
                },
              },
              {
                loader: 'sass-loader',
                options: options.loaders.sass.options,
              },
            ],
          },
        ],
      },
    }),
    {
      // Add client dev tools (mostly HMR)
      entry: baseWebpackConfig.entry.concat([path.resolve(__dirname, './dev-client')]),
    },
  )
}
