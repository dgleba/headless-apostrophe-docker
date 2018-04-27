const fs = require('fs-extra')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const defaultOptions = require('./default-options.js')
const makeBaseConfig = require('./webpack-config-base.js')

module.exports = function(options) {
  options = defaultOptions(options)

  options.env.NODE_ENV = options.env.NODE_ENV || "'production'"
  options.dev = false

  const baseWebpackConfig = makeBaseConfig(options)

  // Helper to resolve assets path (client relative url)
  const assetsPath = _path => path.posix.join(options.assetsSubDirectory, _path)

  let webpackConfig = merge(baseWebpackConfig, {
    devtool: options.productionSourceMap ? '#source-map' : false,
    plugins: [
      // http://vuejs.github.io/vue-loader/en/workflow/production.html
      new webpack.DefinePlugin({
        'process.env': options.env,
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        sourceMap: false,
      }),
      // extract css into its own file
      new ExtractTextPlugin({
        // filename: assetsPath('css/[name].[contenthash].css')
        filename: assetsPath(options.output.css),
      }),
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      new OptimizeCSSPlugin({
        // Base on cssnano (which is based on postcss...)
        // see http://cssnano.co/ for more options
        cssProcessorOptions: {
          safe: true,
        },
      }),
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract([
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                // ident: 'postcss',
                sourceMap: true,
                plugins: [require('autoprefixer')],
                // plugins: () => [require('autoprefixer')],
              },
            },
            {
              loader: 'sass-loader',
              options: options.loaders.sass.options,
            },
          ]),
        },
      ],
    },
  })

  // enable disk cache for (rebuild speed)
  if (options.cacheDirectory) {
    fs.ensureDirSync(options.cacheDirectory)
    webpackConfig.plugins.push(
      new HardSourceWebpackPlugin({
        cacheDirectory: `${options.cacheDirectory}/[confighash]`,
        recordsPath: `${options.cacheDirectory}/[confighash]/records.json`,
        configHash: function(webpackConfig) {
          return require('node-object-hash')().hash(webpackConfig)
        },
        // Optional field. This field determines when to throw away the whole
        // cache if for example npm modules were updated.
        environmentHash: {
          root: options.context,
          directories: ['node_modules'],
          files: ['package.json'],
        },
      }),
    )
  }

  return webpackConfig
}
