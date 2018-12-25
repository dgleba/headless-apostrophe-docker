const config = require('config')

let apos = require('apostrophe')({
  shortName: config.get('shortName'),
  title: config.get('title'),
  baseUrl: config.get('baseUrl'),
  modules: {
    'apostrophe-areas': {},
    'apostrophe-db': {
      uri: config.get('mongo.uri'),
    },
    'apostrophe-express': config.get('modules.apostrophe-express'),
    'apostrophe-pages': config.get('modules.apostrophe-pages'),
    'apostrophe-site-map': { excludeTypes: [] },
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
    'images-widgets': {},
    menu: {},
    project: {},
    'project-pages': {
      extend: 'apostrophe-pieces-pages',
    },
    technology: {},
    'technology-widgets': {},
    'slide-show-widgets': {},
    'video-widgets': {},
    'webpack-custom': {
      webpack: config.get('modules.webpack-custom'),
    },
  },
})
