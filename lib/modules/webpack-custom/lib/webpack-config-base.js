const config = require('config')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const defaultOptions = require('./default-options.js')

/**
 * Create a base webpack configuration
 *
 * @return {Object}
 */
module.exports = function(options) {
  options = defaultOptions(options)
  const { context, assetsRoot, entry, assetsSubDirectory, loaders, plugins, output } = options
  // Helper to resolve assets path (client relative url)
  const assetsPath = _path => path.posix.join(assetsSubDirectory, _path)

  // Config available in frontend
  fs.writeFileSync(path.resolve(__dirname, 'client.json'), JSON.stringify(config.client))

  let webpackConfig = {
    context,
    entry,
    output: {
      path: assetsRoot,
      filename: assetsPath(output.js),
      // chunkFilename: assetsPath('js/[id].[chunkhash].js'),
      publicPath: '/',
    },
    node: {
      __dirname: true,
    },
    resolve: {
      modules: [path.resolve(process.cwd(), './lib/modules'), 'node_modules'],
      alias: {
        config: path.resolve(__dirname, 'client.json'),
      },
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: options.include,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
            },
          },
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          loader: 'file-loader',
          options: {
            // name: utils.assetsPath('img/[name].[hash:7].[ext]') //
            name: assetsPath(options.output.img),
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: assetsPath(options.output.font),
          },
        },
      ],
    },
  }

  if (options.report) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin(options.bundleAnalyzerReport))
  }

  return webpackConfig
}
