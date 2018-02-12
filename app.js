const config = require('config')

let apos = require('apostrophe')({
  shortName: config.get('shortName'),
  title: config.get('title'),

  // See lib/modules for basic project-level configuration of our modules
  // responsible for serving static assets, managing page templates and
  // configuring user acounts.
  modules: {
    'apostrophe-areas': {},
    'apostrophe-db': {
      uri: config.get('mongo.uri'),
    },
    'apostrophe-express': config.get('modules.apostrophe-express'),
    'apostrophe-pages': config.get('modules.apostrophe-pages'),
    // Add custom apostrophe-modules and their respective configuration here!
    article: {},
    'article-pages': {},
    career: {},
    'career-pages': {},
    contact: {},
    'contact-pages': {
      extend: 'apostrophe-pieces-pages',
      scene: 'user',
    },
    'contact-submit-widgets': {},
    menu: {},
    project: {},
    'project-pages': {
      extend: 'apostrophe-pieces-pages',
    },
    technology: {},
    'technology-widgets': {},
    'webpack-custom': {
      webpack: config.get('modules.webpack-custom'),
    },
  },
})
