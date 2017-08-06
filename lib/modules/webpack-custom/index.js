const ora = require('ora')
const globby = require('globby')
const webpackDevServer = require('./lib/webpack-dev-server.js')
const webpackBundler = require('./lib/webpack-bundler')
const path = require('path')
const makeWebpackConfigDev = require('./lib/webpack-config-dev.js')
const makeWebpackConfigProd = require('./lib/webpack-config-prod.js')
const makeWebpackConfigSsr = require('./lib/webpack-config-ssr.js')
const defaultOptions = require('./lib/default-options.js')
// const vueServerRenderer = require('vue-server-renderer')
const Promise = require('bluebird')
// const fs = require('fs-extra')
const config = require('config')
const colors = config.get('colors')

/**
 * Attach a webpack builder to the apostroph & express stack
 * This module final goal is to provide a modern webpack stack to express.
 *
 * TODO: May replace apostrophe-assets (or at least overload it)
 *
 * @type {Object} Apostrophe module
 */
module.exports = {
  alias: 'webpack',

  beforeConstruct (self, options) {
    const opt = options.webpack || {}
    const wpOptions = defaultOptions({ context: options.apos.rootDir }, opt)

    self.entries = {
      server: [],
      client: []
    }

    /**
     * Add a webpack entry
     */
    self.pushClientEntry = function (entry) {
      // Convert to a normalized path relative to current working directory (in order to prevent double entries)
      let normalEntry =
        '.' + path.sep + path.relative(process.cwd(), path.resolve(entry))
      if (!self.entries.client.includes(normalEntry)) {
        self.entries.client.push(normalEntry)
      }
    }

    /**
     * Add server side webpack entry
     */
    self.pushServerEntry = function (entry) {
      // Convert to a normalized path relative to current working directory (in order to prevent double entries)
      let normalEntry =
        '.' + path.sep + path.relative(process.cwd(), path.resolve(entry))
      if (!self.entries.client.includes(normalEntry)) {
        self.entries.server.push(normalEntry)
      }
    }

    // Append default entries (defined by entryPatterns options)
    if (wpOptions.entryPatterns.client) {
      let clientEntries = globby.sync(wpOptions.entryPatterns.client)
      clientEntries.forEach(entry => self.pushClientEntry(entry))
    }

    if (wpOptions.entryPatterns.server) {
      let serverEntries = globby.sync(wpOptions.entryPatterns.server)
      serverEntries.forEach(entry => self.pushServerEntry(entry))
    }

    // Expose the vue server-side loader method (load vue ssr bundle to
    // expose the main creation method)
    // self.createVueServerRenderer = function (bundlePath) {
    //   async function ssr (context = {}) {
    //     let bundle

    //     // Use current instance if any
    //     if (!ssr.renderer || wpOptions.ssrForceReload) {
    //       try {
    //         // Notice: the bundle is builded by a webpack task
    //         // thus, it may not exists. In this case, we gracefull return an empty
    //         // result with a warning.
    //         bundle = await fs.readJson(bundlePath)
    //       } catch (error) {
    //         console.warn(new Error('Warn: missing ssr bundle. You should make sure to build it first with custom-webpack'))
    //         console.warn(error.stack)
    //         return '<div id="#app"><!-- SSR Disabled --></div>'
    //       }
    //       // ssr function is a memoizer of the generated ssr renderer (for performance purpose)
    //       ssr.renderer = vueServerRenderer.createBundleRenderer(bundle)
    //     }

    //     return Promise.fromCallback(cb => ssr.renderer.renderToString(context, cb))
    //   }
    //   return ssr
    //   // let renderer
    //   // let bundle
    //   // try {
    //   //   bundle = fs.readJsonSync(bundlePath)
    //   //   renderer = vueServerRenderer.createBundleRenderer(bundle)
    //   // } catch (error) {
    //   //   console.warn(new Error('Warn: missing ssr bundle. You should make sure to build it first with custom-webpack'))
    //   //   console.warn(error.stack)
    //   // }
    //   //
    //   // return function (context) {
    //   //   if (renderer) {
    //   //     return Promise.fromCallback(cb => renderer.renderToString(context, cb))
    //   //   } else {
    //   //     return Promise.resolve('<div id="#app"><!-- SSR Disabled --></div>')
    //   //   }
    //   // }
    // }
  },

  construct (self, options) {
    const apos = options.apos
    /**
     * Task: custom:webpack
     *
     * Run webpack bundler
     *
     * --watch   Activate watch mode (default: false)
     * --dev     Use the dev configuration (default: false use the prod config)
     */
    self.apos.tasks.add(
      'custom',
      'webpack',
      'Generate a modern bundle process based on webpack. Does not replace apostrophe-assets for now.',
      async function (apos, argv, callback) {
        let spinner = ora('Webpack Bundler')
        spinner.start()
        try {
          const wpOptions = defaultOptions(
            { context: apos.rootDir },
            options.webpack || {},
            {
              watch: argv.watch,
              dev: argv.dev,
              report: argv.report,
              entry: [...self.entries.client],
              serverEntries: [...self.entries.server]
            }
          )

          // Store all promised bundlers
          let tasks = []

          // Add client bundler (if any entries)
          if (wpOptions.entry.length && !argv.server) {
            const wpConfigWeb = wpOptions.dev
              ? makeWebpackConfigDev(wpOptions)
              : makeWebpackConfigProd(wpOptions)
            console.info('Add webpack bundler for client side', wpOptions.entry)
            tasks.push(() =>
              webpackBundler(wpConfigWeb, { watch: wpOptions.watch })
            )
          }

          // Add a server bundler (if any entries)
          if (wpOptions.serverEntries.length && !argv.client) {
            const wpConfigSsr = makeWebpackConfigSsr(wpOptions)
            console.info(
              'Add webpack bundler for server side',
              wpOptions.serverEntries
            )
            tasks.push(() =>
              webpackBundler(wpConfigSsr, { watch: wpOptions.watch })
            )
          }

          await Promise.all(tasks.map(f => f()))

          spinner.stop()
          if (!wpOptions.watch) {
            callback(null)
          }
        } catch (error) {
          console.error(error)
          spinner.stop()
          return callback(error)
        }
      }
    )

    /**
     * Task: custom:webpack-dev-server
     *
     * Start a webpack dev server that provide webpack bundles with debugging
     * tools
     *
     * --port <number>   Set the dev server port (default: 3001)
     */
    self.apos.tasks.add(
      'custom',
      'webpack-dev-server',
      'Start a webpack dev server',
      async function (apos, argv, callback) {
        let spinner = ora('Webpack Bundler')
        spinner.start()

        // See ./lib/default-options.js for details
        const wpOptions = defaultOptions(
          { context: apos.rootDir },
          options.webpack || {},
          {
            entry: [...self.entries.client],
            serverEntries: [...self.entries.server],
            devServerPort: argv.port
          }
        )
        const proxyTable = wpOptions.proxyTable || []
        const devWatchReload = wpOptions.devWatchReload || null

        try {
          const wpConfigWeb = makeWebpackConfigDev(wpOptions)
          const app = webpackDevServer(wpConfigWeb, {
            proxyTable,
            devWatchReload
          })

          let promises = []
          console.info('Start webpack dev server', {
            port: wpOptions.devServerPort
          })
          app.listen(wpOptions.devServerPort)
          promises.push(app.ready)

          if (wpOptions.serverEntries.length) {
            const wpConfigSsr = makeWebpackConfigSsr(wpOptions)
            console.info('Start webpack bundler for server side (with watch)')
            let doneOnce = webpackBundler(wpConfigSsr, { watch: true })
            promises.push(doneOnce)
          }
          // Stop spinner once ready
          await Promise.all(promises)
        } catch (error) {
          spinner.stop()
          console.error()
          console.error(colors.bg.red, '  Error  ', colors.reset)
          return callback(error)
        }
        console.info()
        console.info(colors.bg.green, '  Ready  ', colors.reset)
        console.info(
          colors.fg.green,
          'Webpack dev server ready on http://localhost:' +
            wpOptions.devServerPort,
          colors.reset
        )
        console.info(
          colors.fg.grey,
          'Please make sure to start apostrophe application according to proxyTable config (eg. By using `npm run dev:app` in another terminal)',
          proxyTable,
          colors.reset
        )
        spinner.stop()
      }
    )
  }
}
