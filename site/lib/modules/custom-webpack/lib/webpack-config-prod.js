const defaultOptions = require('./default-options.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const fs = require('fs-extra')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const makeBaseConfig = require('./webpack-config-base.js')
const merge = require('webpack-merge')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')
const styleLoaders = require('./style-loaders')
const webpack = require('webpack')

module.exports = function (options) {
  options = defaultOptions(options)

  options.env.NODE_ENV = options.env.NODE_ENV || "'production'"
  options.dev = false

  const baseWebpackConfig = makeBaseConfig(options)

  // Helper to resolve assets path (client relative url)
  const assetsPath = (_path) => path.posix.join(options.assetsSubDirectory, _path)

  var webpackConfig = merge(baseWebpackConfig, {
    module: {
      rules: styleLoaders.styleLoaders({
        minimize: true,
        sourceMap: true,
        extract: true
      })
    },
    devtool: options.productionSourceMap ? '#source-map' : false,
    output: {
      path: options.assetsRoot,
      // NB: Advanced usage with CommonsChunkPlugin plugin
      // filename: assetsPath('js/[name].[chunkhash].js'),
      // chunkFilename: assetsPath('js/[id].[chunkhash].js')
      filename: assetsPath(options.output.js)
    },
    plugins: [
      // http://vuejs.github.io/vue-loader/en/workflow/production.html
      new webpack.DefinePlugin({
        'process.env': options.env
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        sourceMap: true
      }),
      // extract css into its own file
      new ExtractTextPlugin({
        // filename: assetsPath('css/[name].[contenthash].css')
        filename: assetsPath(options.output.css)
      }),
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      new OptimizeCSSPlugin({
        // Base on cssnano (which is based on postcss...)
        // see http://cssnano.co/ for more options
        cssProcessorOptions: {
          safe: true
        }
      }),
      // generate dist index.html with correct asset hash for caching.
      // you can customize output by editing /index.html
      // see https://github.com/ampedandwired/html-webpack-plugin
      // Could be used to help apostrophe in injecting links and scripts
      // (eg. with a regex such as: `/((?:<link[^>]+>)+)<\/head><body>(.*)<\/body><\/html>/` )
      new HtmlWebpackPlugin({
        filename: options.output.index,
        // template: 'index.html',
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        },
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin (disabled for now)
        chunksSortMode: 'dependency'
      }),
      // // split vendor js into its own file
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'vendor',
      //   minChunks: function (module, count) {
      //     // any required modules inside node_modules are extracted to vendor
      //     return (
      //       module.resource &&
      //       /\.js$/.test(module.resource) &&
      //       module.resource.indexOf('node_modules') !== -1
      //     )
      //   }
      // }),
      // // extract webpack runtime and module manifest to its own file in order to
      // // prevent vendor hash from being updated whenever app bundle is updated
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'manifest',
      //   chunks: ['vendor']
      // }),
      // copy custom static assets
      // new CopyWebpackPlugin([
      //   {
      //     from: path.resolve(__dirname, '../static'),
      //     to: config.build.assetsSubDirectory,
      //     ignore: ['.*']
      //   }
      // ])
    ]
  })

  // enable disk cache for (rebuild speed)
  if (options.cacheDirectory) {
    fs.ensureDirSync(options.cacheDirectory)
    webpackConfig.plugins.push(new HardSourceWebpackPlugin({
      cacheDirectory: `${options.cacheDirectory}/[confighash]`,
      recordsPath: `${options.cacheDirectory}/[confighash]/records.json`,
      configHash: function (webpackConfig) {
        return require('node-object-hash')().hash(webpackConfig)
      },
      // Optional field. This field determines when to throw away the whole
      // cache if for example npm modules were updated.
      environmentHash: {
        root: options.context,
        directories: ['node_modules'],
        files: ['package.json'],
      }
    }))
  }

  if (options.report) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin(options.bundleAnalyzerReport || {}))
  }

  return webpackConfig
}
