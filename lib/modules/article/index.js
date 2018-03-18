const https = require('https')

module.exports = {
  extend: 'apostrophe-pieces',
  name: 'article',
  alias: 'article',
  addFields: [
    {
      name: 'contents',
      type: 'array',
      schema: [
        {
          name: 'content',
          label: 'Content',
          type: 'string',
        },
      ],
      readOnly: true,
    },
    {
      name: 'contentLinks',
      type: 'array',
      schema: [
        {
          name: 'url',
          label: 'Url',
          type: 'url',
        },
      ],
    },
    {
      name: 'publicationDate',
      label: 'Publication Date',
      type: 'date',
    },
    {
      name: 'updateDate',
      label: 'Update Date',
      type: 'date',
      def: null,
    },
  ],
  arrangeFields: [
    {
      name: 'basics',
      fields: ['title', 'slug', 'contents', 'contentLinks', 'publicationDate', 'updateDate', 'published', 'tags'],
    },
  ],
  afterConstruct(self) {
    self.beforeSave = async (req, piece, options, callback) => {
      const contentLinks = piece.contentLinks

      if (contentLinks.length > 0) {
        const promises = contentLinks.map(async contentLink => {
          return new Promise((resolve, reject) => {
            let body = ''
            https
              .get(contentLink.url, res => res.on('data', chunk => (body += chunk)))
              .on('close', () => {
                let content = body.substring(
                  body.indexOf('<section class="normal markdown-section">'),
                  body.indexOf('</section>'),
                )

                const img = content.indexOf('<img src="../') // check if at least one <img> tag
                if (img > -1) {
                  const path = contentLink.url.substr(0, contentLink.url.indexOf('/content/'))
                  content = content.replace(/<img src="../g, `<img src="${path}`)
                }

                const h1Start = content.indexOf('<h1')
                const h1End = content.indexOf('</h1>')
                const sliced = content.slice(h1Start, h1End + 5)
                content = content.replace(sliced, '')

                resolve(content)
              })
              .on('error', reject)
          })
        })

        try {
          piece.contents = await Promise.all(promises)
        } catch (error) {
          console.error('Promise failed in article', error)
        }
      }

      return callback()
    }
  },
}
