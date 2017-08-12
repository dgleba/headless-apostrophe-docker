const config = require('config')

let apos = require('apostrophe')({
  shortName: config.get('shortName'),
  title: config.get('title'),

  // See lib/modules for basic project-level configuration of our modules
  // responsible for serving static assets, managing page templates and
  // configuring user acounts.
  modules: {
    'apostrophe-db': {
      uri: config.get('mongo.uri')
    },
    // Add custom apostrophe-modules and their respective configuration here!
    article: {},
    'article-pages': {
      extend: 'apostrophe-pieces-pages'
    },
    career: {},
    'career-pages': {
      extend: 'apostrophe-pieces-pages'
    },
    menu: {},
    project: {},
    'project-pages': {
      extend: 'apostrophe-pieces-pages'
    },
    'webpack-custom': {
      webpack: config.get('modules.webpack-custom')
    }
  }
})
