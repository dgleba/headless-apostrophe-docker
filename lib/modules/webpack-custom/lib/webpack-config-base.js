const config = require('config')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const defaultOptions = require('./default-options.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * Create a base webpack configuration
 *
 * @return {Object}
 */
module.exports = function (options) {
  options = defaultOptions(options)
  const {
    context,
    assetsRoot,
    entry,
    assetsSubDirectory,
    loaders,
    plugins
  } = options
  // Helper to resolve assets path (client relative url)
  const assetsPath = _path => path.posix.join(assetsSubDirectory, _path)

  // Config available in frontend
  fs.writeFileSync(
    path.resolve(__dirname, 'client.json'),
    JSON.stringify(config.client)
  )

  let webpackConfig = {
    context,
    entry,
    output: {
      path: assetsRoot,
      filename: assetsPath('js/[name].js'),
      // chunkFilename: assetsPath('js/[id].[chunkhash].js'),
      publicPath: '/'
    },
    node: {
      __dirname: true
    },
    plugins: [
      // generate dist index.html with correct asset hash for caching.
      // you can customize output by editing /index.html
      // see https://github.com/ampedandwired/html-webpack-plugin
      // Could be used to help apostrophe in injecting links and scripts
      // (eg. with a regex such as: `/((?:<link[^>]+>)+)<\/head><body>(.*)<\/body><\/html>/` )
      // new HtmlWebpackPlugin({
      //   filename: options.output.index,
      //   inject: true,
      //   minify: {
      //     removeComments: true,
      //     collapseWhitespace: true,
      //     removeAttributeQuotes: true
      //     // more options:
      //     // https://github.com/kangax/html-minifier#options-quick-reference
      //   },
      //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      //   chunksSortMode: 'dependency'
      // }),
      // new webpack.optimize.CommonsChunkPlugin({
      //     name: 'vendor',
      //     minChunks: (m) => /node_modules/.test(m.context)
      // }),
      // new webpack.optimize.CommonsChunkPlugin({
      //   name: 'gsap',
      //   minChunks: (m) => /node_modules\/(?:gsap|home)/.test(m.context)
      // }),
      // new webpack.optimize.CommonsChunkPlugin({
      //     name: "manifest",
      //     minChunks: Infinity
      // })
    ],
    resolve: {
      modules: [path.resolve(process.cwd(), './lib/modules'), 'node_modules'],
      alias: {
        config: path.resolve(__dirname, 'client.json')
      }
    },
    module: {
      rules: [
        // {
        //   test: /\.js$/,
        //   loader: 'babel-loader',
        //   include: options.include
        // },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract([
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [require('autoprefixer')]
              }
            },
            {
              loader: 'sass-loader',
              options: loaders.sass.options
            }
          ])
        },
        {
          test: /\.js$/,
          include: options.include,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          loader: 'file-loader',
          options: {
            // name: utils.assetsPath('img/[name].[hash:7].[ext]') //
            name: assetsPath(options.output.img)
          }
        },
        {
          test: /\.svg$/,
          loader: 'file-loader',
          options: {
            // name: utils.assetsPath('img/[name].[hash:7].[ext]') //
            name: assetsPath(options.output.svg)
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            // name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            name: assetsPath(options.output.font)
          }
        }
      ]
    }
  }

  if (options.report) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
      .BundleAnalyzerPlugin
    webpackConfig.plugins.push(
      new BundleAnalyzerPlugin(options.bundleAnalyzerReport)
    )
  }

  return webpackConfig
}
