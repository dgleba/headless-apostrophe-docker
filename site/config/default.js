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

module.exports = {

  shortName: 'site',

  title: 'site',

  // Mongo db:
  // mongo: {
  //   uri: process.env.MONGODB || 'mongodb://127.0.0.1:27017/site'
  // },

  // Client runtime configs
  client: {
    // Client runtime environnement (see apostrophe-assets extension)
    // env: {
    //   // TODO: Rename variables with the same name all along ci -> marathon -> process.env -> window.env (Here the env are renamed to match ci's env names)
    //   // The graphql end-point (see too ./lib/frontapp/app.js and ./lib/modules/custom-graphql)
    //   GRAPHQLURI: process.env.GRAPHQL_SERVER || '//localhost:3002/graphql'
    // }
  },


  //
  // Modules overrides:
  //
  modules: {

    'custom-webpack': {
      webpack: {
        // Proxy rules for the webpack dev server (to server apostrophe backend
        proxyTable: {
          '/': 'http://localhost:3000'
        },

        // Default webpack entries
        entry: []

        // See custom-webpack/lib/default-options.js documentation for many
        // other overrideable options
      }
    }
  },

  env: {

  }

}
