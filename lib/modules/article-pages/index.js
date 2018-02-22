const https = require('https')

module.exports = {
  extend: 'apostrophe-pieces-pages',
  construct(self, options) {
    self.beforeShow = async (req, callback) => {
      const links = req.data.piece.links

      const promises = links.map(async link => {
        return new Promise((resolve, reject) => {
          let body = ''
          https
            .get(link.url, res => res.on('data', chunk => (body += chunk)))
            .on('close', () => {
              let content = body.substring(
                body.indexOf('<section class="normal markdown-section">'),
                body.indexOf('</section>'),
              )

              const img = content.indexOf('<img src="../') // check if at least one <img> tag
              if (img > -1) {
                const path = link.url.substr(0, link.url.indexOf('/content/'))
                content = content.replace(/<img src="../g, `<img src="${path}`)
              }

              resolve(content)
            })
            .on('error', reject)
        })
      })

      try {
        req.data.piece.articles = await Promise.all(promises)
      } catch (error) {
        console.error('Promise failed in article-pages', error)
      }

      return callback()
    }
  },
}
