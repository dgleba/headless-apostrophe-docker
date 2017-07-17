// This is the webpack config used for production bundles

const webpack = require('webpack')
const merge = require('webpack-merge')
// const VueSSRPlugin = require('vue-server-renderer/server-plugin')
const nodeExternals = require('webpack-node-externals')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const fs = require('fs-extra')
const defaultOptions = require('./default-options.js')
const makeBaseConfig = require('./webpack-config-base.js')
const path = require('path')

module.exports = function (options) {
  options = defaultOptions(options)

  options.env.NODE_ENV = options.env.NODE_ENV || "'production'"
  options.env.VUE_ENV = options.env.VUE_ENV || "'server'"
  options.dev = true // TODO: Refactor this : for ssr we should not use extract-text-webpack-plugin - Using dev true prevent this

  const baseWebpackConfig = makeBaseConfig(options)

  const baseSSR = merge(baseWebpackConfig, {
    target: 'node',
    devtool: '#source-map',
    output: {
      path: options.assetsRoot,
      filename: 'server-bundle.js', // Nb: Does not actually write this file: see bundle.json
      libraryTarget: 'commonjs2'
    },
    externals: nodeExternals({
      // do not externalize CSS files in case we need to import it from a dep
      whitelist: /\.css$/
    }),
    plugins: [
      new webpack.DefinePlugin({
        'process.env': options.env
      })
    ]
  })
  // baseSSR.entry = null

  // enable disk cache for (rebuild speed)
  if (options.cacheDirectory) {
    fs.ensureDirSync(options.cacheDirectory)
    baseSSR.plugins.push(new HardSourceWebpackPlugin({
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

  return options.serverEntries.map(entry => {
    if (typeof entry === 'string') {
      entry = {
        input: entry,
        output: entry + '.bundle.json'
      }
    }
    // TODO: SHould we allow more options / let module defines there own config ?
    return merge(baseSSR, {
      entry: entry.input,
      output: {
        path: path.resolve(baseSSR.context, path.dirname(entry.output))
      },
      resolve: {
        alias: entry.alias || {}
      },
      // plugins: [
      //   new VueSSRPlugin({ filename: path.basename(entry.output) })
      // ]
    })
  })
}
