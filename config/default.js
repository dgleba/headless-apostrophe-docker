// Main configuration file (based on node-config)
// See https://github.com/lorenwest/node-config
//
// Be sure to understand the configuration mechanism of node-config before applying
// changes in this file.
//
// If you need to setup a local configuration for your dev environnement you can
// create a ./local.js file with your own overrides. Note, that the local.js
// file does not needs to contains all the configuration keys: just the overrides.
//
const name = 'site'

module.exports = {
  shortName: name,

  title: name,

  // Mongo db:
  mongo: {
    uri: process.env.MONGODB || `mongodb://127.0.0.1:27017/${name}`
  },

  // Client runtime configs
  client: {
    // Client runtime environnement (see apostrophe-assets extension)
    // env: {
    //   // TODO: Rename variables with the same name all along ci -> marathon -> process.env -> window.env (Here the env are renamed to match ci's env names)
    //   // The graphql end-point (see too ./lib/frontapp/app.js and ./lib/modules/custom-graphql)
    //   GRAPHQLURI: process.env.GRAPHQL_SERVER || '//localhost:3002/graphql'
    // }
  },

  // webpack: {
  //   output: {
  //     index: 'index-raw.html'
  //   }
  // },

  //
  // Modules overrides:
  //
  modules: {
    'webpack-custom': {
      // Proxy rules for the webpack dev server (to server apostrophe backend
      proxyTable: {
        '/': 'http://localhost:3000'
      },

      // Default webpack entries
      entry: [],

      // See custom-webpack/lib/default-options.js documentation for many
      // other overrideable options
      loaders: {
        sass: {
          options: {
            data: '$menu-count: 1;'
          }
        }
      }
    }
  },

  colors: {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    underscore: '\x1b[4m',
    blink: '\x1b[5m',
    reverse: '\x1b[7m',
    hidden: '\x1b[8m',

    fg: {
      black: '\x1b[30m',
      grey: '\033[90m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      magenta: '\x1b[35m',
      cyan: '\x1b[36m',
      white: '\x1b[37m'
    },

    bg: {
      black: '\x1b[40m',
      grey: '\033[100m',
      red: '\x1b[41m',
      green: '\x1b[42m',
      yellow: '\x1b[43m',
      blue: '\x1b[44m',
      magenta: '\x1b[45m',
      cyan: '\x1b[46m',
      white: '\x1b[47m'
    }
  },

  RTEConfig: {
    toolbar: [
      'Styles',
      'Bold',
      'Italic',
      'Link',
      'NumberedList',
      'BulletedList',
      'Undo',
      'Redo'
    ],
    styles: [
      { name: 'Paragraphe', element: 'p' },
      { name: 'Paragraphe 2', element: 'h5' },
      { name: 'Title', element: 'h3' },
      { name: 'Subtitle', element: 'h4' }
    ]
  }
}
