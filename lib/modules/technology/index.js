const config = require('config')

module.exports = {
  extend: 'apostrophe-pieces',
  name: 'technology',
  alias: 'tech',
  label: 'Technology',
  pluralLabel: 'Technologies',
  beforeConstruct(self, options) {
    const pages = config.get('modules.apostrophe-pages.pages')
    const choices = []
    const links = []

    pages.forEach(page => {
      const name = page.type.split('-page')[0]
      if (page.title) {
        // exclude home
        choices.push({
          // create choices based on existing pages
          label: page.title,
          value: page.type,
          showFields: [`_${name}`], // show link to a piece type after having selected a matching page type
        })
        links.push({
          // create fields in schema related to a piece type
          name: `_${name}`,
          label: page.title,
          type: 'joinByOne',
          withType: name,
          idField: 'linkId',
        })
      }
    })
    ;(options.addFields = [
      {
        name: 'content',
        type: 'array',
        schema: [
          {
            name: 'technology',
            label: 'Technology',
            type: 'string',
          },
          {
            name: 'pageType',
            label: 'Page Type',
            type: 'select',
            choices,
          },
          ...links,
        ],
      },
    ]),
      (options.arrangeFields = [
        {
          name: 'basics',
          fields: ['title', 'slug', 'content', 'published', 'tags'],
        },
      ])
  },
  construct(self, options) {
    // save complete url in this piece so no hassle during render time to find it in another piece
    self.beforeSave = (req, piece, options, callback) => {
      piece.content.forEach(content => {
        if (content.pageType && content.linkId) {
          const name = content.pageType.split('-page')[0]
          self.apos[name].find(req, { _id: content.linkId }).toObject((err, doc) => {
            if (err) throw new Error(`Error in technology beforeSave: ${err}`)
            content.url = doc._url
          })
        }
      })
      return callback()
    }
  },
}
