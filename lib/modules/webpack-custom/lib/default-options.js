const merge = require('webpack-merge')
const path = require('path')

const DEFAULT = {
  // The context is set to apos.rootDir when used in apostrophe
  context: null,

  // A disk caching directory for rebuild speed (absolute or relative to context)
  cacheDirectory: './data/webpack-cache',

  // The webpack output directory (absolute or relative to context)
  assetsRoot: './public',

  // Restrict babel-loader & vue-loader impact
  // TODO: We may need more complex configuration when used with node modules
  include: ['./lib', './test'],

  // Entry list
  // see apos.webpack.pushServerEntry()
  // see apos.webpack.pushClientEntry()

  // Default client entries (same a classic webpack entry field)
  entry: [],

  // Default server entries.
  // Server entries are a bit different and currently support only vuejs components.
  // See webpack-config-ssr for implementation details.
  // Prefer using the related api apos.webpack.pushServerEntry()
  serverEntries: [],

  // Patterns to pre-fill client entries
  // The default is:
  //  - client: All scss files from custom modules (except partial sass files)
  //  - client: All src/entry-client.js
  //  - server: All src/entry-server.js (will create a relative src/entry-server.js.bundle.json)
  entryPatterns: {
    client: [
      './lib/modules/**/client.js',
      './lib/modules/apostrophe-assets/public/img/*',
      './lib/modules/**/[^_]*.scss'
    ],
    server: ['./lib/modules/**/server.js']
  },

  // Asset subdirectory in the asset root
  assetsSubDirectory: '',

  // Client path to asset directory
  assetsPublicPath: '/',

  // Enable webpack-bundle-analyzer (may require watch to be true when used in apostrophe...)
  // Exemple:
  // node app custom:webpack --report
  report: false,

  // Options for https://github.com/th0r/webpack-bundle-analyzer
  bundleAnalyzerReport: {},
  productionSourceMap: true,
  output: {
    js: 'js/bundle.js',
    css: 'css/bundle.css',
    img: 'img/[name].[ext]',
    font: 'fonts/[name].[ext]',
    svg: 'svg/[name].[ext]',
    index: 'index-raw.html'
  },
  env: {
    // Default depends on the dev or the prod config maker :
    // NODE_ENV: '"development"'
    // VUE_ENV: '"client"'
  },
  watch: false,
  dev: false,
  devServerPort: 3001,

  // See webpack devtool (which stand for sourcemap - for production too)
  // This config is an override for dev config
  // Sometimes eval is not enought accurate / you may prefer #source-map instead
  // see https://webpack.js.org/configuration/devtool/#devtool
  devDevtool: '#eval',

  // Proxy rules for the webpack dev server (to server apostrophe backend)
  proxyTable: {
    '/': 'http://localhost:3000'
  },
  // Dedicated Watcher for dev server (based https://www.npmjs.com/package/chokidar)
  // handler any kind of file ressource for which changes must trigger a
  // frontend reload.
  // Use this to watch file that does not need to go through the webpack
  // process in order to restart the server on changes during dev.
  devWatchReload: {
    // List of path / glob to watch from project root
    paths: ['./lib/modules/**/*.html'],
    options: {
      // See chokidar options if needed. Usually default is ok
    }
  },

  // Force reload of ssr bundle each time (for dev only, use your own local)
  ssrForceReload: true,

  loaders: {}
}

module.exports = function (...rest) {
  let options = merge({}, DEFAULT, ...rest)
  options.context = options.context || process.cwd()
  options.cacheDirectory = path.resolve(options.context, options.cacheDirectory)
  options.assetsRoot = path.resolve(options.context, options.assetsRoot)
  options.include = options.include.map(i => path.resolve(options.context, i))
  return options
}
