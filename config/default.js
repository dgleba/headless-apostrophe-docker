// Main configuration file (based on node-config)
// See https://github.com/lorenwest/node-config
//
// Be sure to understand the configuration mechanism of node-config before applying
// changes in this file.
//
// If you need to setup a local configuration for your dev environnement you can
// create a ./local.js file with your own overrides. Note, that the local.js
// file does not needs to contains all the configuration keys: just the overrides.
const helmet = require('helmet')
const validator = require('express-validator')

const name = 'site'

const pages = {
  home: {
    slug: '/',
    type: 'home',
    label: 'Accueil',
  },
  contact: {
    slug: '/intro',
    type: 'contact-page',
    label: 'Intro',
  },
  project: {
    slug: '/projets',
    type: 'project-page',
    label: 'Projets',
  },
  article: {
    slug: '/blog',
    type: 'article-page',
    label: 'Blog',
  },
  career: {
    slug: '/parcours',
    type: 'career-page',
    label: 'Parcours',
  },
}

const park = [
  {
    slug: pages.home.slug,
    _defaults: {
      title: pages.home.label,
      type: pages.home.type,
    },
    type: pages.home.type,
    published: true,
  },
  {
    slug: pages.contact.slug,
    type: pages.contact.type,
    title: pages.contact.label,
    published: true,
  },
  {
    slug: pages.project.slug,
    type: pages.project.type,
    title: pages.project.label,
    published: true,
  },
  {
    slug: pages.article.slug,
    type: pages.article.type,
    title: pages.article.label,
    published: true,
  },
  {
    slug: pages.career.slug,
    type: pages.career.type,
    title: pages.career.label,
    published: true,
  },
]

module.exports = {
  shortName: name,

  title: name,

  // Mongo db:
  mongo: {
    uri: process.env.MONGODB || `mongodb://127.0.0.1:27017/${name}`,
  },

  //
  // Modules overrides:
  //
  modules: {
    'apostrophe-express': {
      session: {
        secret: require('crypto')
          .randomBytes(64)
          .toString('hex'),
        proxy: true,
        cookie: {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        },
      },
      middleware: [
        validator(),
        (req, res, next) => {
          if (process.env.NODE_ENV !== 'production') {
            return next()
          }
          if (req.path.indexOf('/login') === -1) {
            return next()
          }
          return res.sendStatus(404)
        },
        helmet({
          frameguard: {
            action: 'sameorigin',
          },
        }),
      ],
    },
    'apostrophe-pages': {
      types: [
        {
          name: pages.home.type,
          label: pages.home.label,
        },
        {
          name: pages.contact.type,
          label: pages.contact.label,
        },
        {
          name: pages.project.type,
          label: pages.project.label,
        },
        {
          name: pages.article.type,
          label: pages.article.label,
        },
        {
          name: pages.career.type,
          label: pages.career.label,
        },
      ],
      pages: park,
    },
    'webpack-custom': {
      // See custom-webpack/lib/default-options.js documentation for many
      // other overrideable options
      loaders: {
        sass: {
          options: {
            sourceMap: true,
            data: '$menu-count: 4;',
            includePaths: ['lib/modules/apostrophe-assets/public/scss'],
          },
        },
      },
    },
  },

  nodemailer: {
    transport: {
      host: 'smtp.zoho.eu',
      port: 465,
      secure: true,
      auth: {
        user: 'anthony@tarlao.fr',
        pass: '',
      },
    },
    options: {
      from: '"Anthony Tarlao" <anthony@tarlao.fr>',
      to: 'anthony@tarlao.fr',
    },
  },

  client: {
    site: name,
    pages: park,
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
      grey: '\x1b[90m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      magenta: '\x1b[35m',
      cyan: '\x1b[36m',
      white: '\x1b[37m',
    },

    bg: {
      black: '\x1b[40m',
      grey: '\x1b[100m',
      red: '\x1b[41m',
      green: '\x1b[42m',
      yellow: '\x1b[43m',
      blue: '\x1b[44m',
      magenta: '\x1b[45m',
      cyan: '\x1b[46m',
      white: '\x1b[47m',
    },
  },

  RTEConfig: {
    toolbar: [
      'Scayt',
      'Format',
      'Styles',
      'Bold',
      'Italic',
      'Link',
      'NumberedList',
      'BulletedList',
      'Blockquote',
      'Undo',
      'Redo',
    ],
    styles: [
      { name: 'Paragraphe', element: 'p' },
      { name: 'Paragraphe 2', element: 'h5' },
      { name: 'Title', element: 'h3' },
      { name: 'Subtitle', element: 'h4' },
    ],
  },
}
