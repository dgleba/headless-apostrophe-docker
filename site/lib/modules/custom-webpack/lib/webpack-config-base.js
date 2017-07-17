const styleLoaders = require('./style-loaders')
const path = require('path')
const defaultOptions = require('./default-options.js')

/**
 * Create a base webpack configuration
 *
 * @return {Object}
 */
module.exports = function (options) {
  options = defaultOptions(options)
  const { context, assetsRoot, entry, assetsSubDirectory, dev } = options

  // Helper to resolve assets path (client relative url)
  const assetsPath = (_path) => path.posix.join(assetsSubDirectory, _path)

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
        {
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: options.include,
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: styleLoaders.vueStyleLoaders({
              sourceMap: true,
              extract: !dev,
              minimize: !dev
            })
          }
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
        // {
        //   test: /\.(png|jpe?g|gif)(\?.*)?$/,
        //   loader: 'image-webpack-loader',
        //   options: {
        //     gifsicle: {
        //       interlaced: false,
        //     },
        //     optipng: {
        //       optimizationLevel: options.dev ? 7 : 1,
        //     },
        //     pngquant: {
        //       quality: '65-90',
        //       speed: 4
        //     },
        //     mozjpeg: {
        //       progressive: true,
        //       quality: 65
        //     }
        //   }
        // },
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
