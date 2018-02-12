const https = require('https')

module.exports = {
  extend: 'apostrophe-pieces-pages',
  construct(self, options) {
    self.beforeShow = async (req, callback) => {
      const links = req.data.piece.links

      var promises = links.map(async link => {
        return new Promise((resolve, reject) => {
          let body = ''
          https
            .get(link.url, res => res.on('data', chunk => (body += chunk)))
            .on('close', () => resolve(body)) //TODO: parser, éliminer DOM inutile et remplacer url images
            .on('error', reject)
        })
      })

      try {
        req.data.piece.articles = await Promise.all(promises)
      } catch (error) {
        console.error('(At least) one of them failed', error)
      }

      return callback()
    }
  },
}
