const express = require('express')
const webpack = require('webpack')
const chokidar = require('chokidar')
const proxyMiddleware = require('http-proxy-middleware')

/**
 * Create a webpack developement server
 *
 * This webpack server bundle client library with hot module reload and
 * developement goodies. Every request to the apostrophe backend are
 * passed through a proxy: thus, only bundle handled by webpack are served
 * over other requests (nb: this is a development only tool)
 *
 * This server can be used either as:
 * - A middleware in the apostrophe stack
 * - A standalone webpack server
 *
 * @param  {Object|Array<Object>} webpackConfig Webpack configuration(s)
 * @param  {Object} [options={}]  Dev server options (see ./default-options.js for details)
 * @param  {Array} [options.proxyTable]  An array of proxy rules
 * @return {Promise}              Server is ready
 */
module.exports = function webpackDevServer (webpackConfig, options = {}) {
  const proxyTable = options.proxyTable || []
  const devWatchReload = options.devWatchReload
  const app = express()
  const compiler = webpack(webpackConfig)

  var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: false,

    // display no info to console (only warnings and errors)
    noInfo: false,

    // watch options (only lazy: false)
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },

    // options for formating the statistics
    stats: {
      colors: true
    },

    // Provide a custom reporter to change the way how logs are shown.
    reporter: null
  })

  // force page reload when html-webpack-plugin template changes
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
      hotMiddleware.publish({ action: 'reload' })
      cb()
    })
  })

  var hotMiddleware = require('webpack-hot-middleware')(compiler)

  // dedicated watcher
  if (devWatchReload && devWatchReload.paths && devWatchReload.paths.length) {
    let watcher = chokidar.watch(devWatchReload.paths, devWatchReload.options || {})
    watcher.on('change', function () {
      hotMiddleware.publish({ action: 'reload' })
    })
  }

  // handle fallback for HTML5 history API
  // app.use(require('connect-history-api-fallback')())

  // serve webpack bundle output
  app.use(devMiddleware)

  // enable hot-reload and state-preserving
  // compilation error display
  app.use(hotMiddleware)

  // proxy api requests
  Object.keys(proxyTable).forEach(function (context) {
    var proxyConf = proxyTable[context]
    if (typeof proxyConf === 'string') {
      proxyConf = { target: proxyConf }
    }
    app.use(proxyMiddleware(proxyConf.filter || context, proxyConf))
  })

  app.ready = new Promise((resolve) => devMiddleware.waitUntilValid(resolve))

  return app
}
