const path = require('path')
const defaultOptions = require('./default-options.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

/**
 * Create a base webpack configuration
 *
 * @return {Object}
 */
module.exports = function (options) {
  options = defaultOptions(options)
  const { context, assetsRoot, entry, assetsSubDirectory } = options

  // Helper to resolve assets path (client relative url)
  const assetsPath = _path => path.posix.join(assetsSubDirectory, _path)

  return {
    context: context,
    entry: entry,
    output: {
      path: assetsRoot,
      filename: assetsPath(options.output.js),
      publicPath: '/'
    },
    resolve: {
      modules: [path.resolve(process.cwd(), './lib/modules'), 'node_modules']
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
              loader: 'css-loader',
              options: {
                minimize: options.env === 'production'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [require('autoprefixer')]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                data: '$menu-count: ' + 4 + ';' // @TODO: pass from options object
              }
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
}
