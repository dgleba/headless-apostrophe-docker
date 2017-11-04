const webpack = require('webpack')

/**
 * Webpack bundler
 */
module.exports = function webpackBundler(wpConfig, { log = null, watch = false }) {
  console.log('Starting webpack bundler for apostrophe')

  const compiler = webpack(wpConfig)

  let promiseReady

  if (watch) {
    promiseReady = new Promise(resolve => {
      let watching // eslint-disable-line no-unused-vars
      let resolved = false
      watching = compiler.watch(
        {
          aggregateTimeout: 300,
          poll: true,
        },
        (err, stats) => {
          if (err) {
            return console.error(err)
          }
          console.log(
            'webpack ssr build',
            stats.toString({
              colors: true,
              modules: false,
              children: false,
              chunks: false,
              chunkModules: false,
            }),
          )
          if (!resolved) {
            resolve() // Resolve once
            resolved = true
          }
        },
      )
    })
  } else {
    promiseReady = new Promise((resolve, reject) => {
      compiler.run((err, stats) => {
        if (err) {
          // Die early
          console.error(err.stack)
          process.exit(1)
        }
        console.log(
          'webpack ssr build',
          stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false,
          }),
        )
        resolve()
        // ...
      })
    })
  }
  return promiseReady
}
