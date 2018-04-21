module.exports = {
  construct(self, options) {
    self.setPreviousAndNextPieces = async (req, module, sortBy) => {
      const pieces = await self.apos[module]
        .find(req)
        .projection({
          title: 1,
          slug: 1,
          type: 1,
        })
        .sort(sortBy)
        .toArray()

      for (let i = 0; i < pieces.length; i++) {
        if (pieces[i]._id === req.data.piece._id) {
          req.data.next = pieces[i - 1]
          req.data.previous = pieces[i + 1]
        }
      }
    }

    self.addHelpers({
      getColor(name, element) {
        const pages = require('config').get('modules.apostrophe-pages.types')
        return pages.reduce((acc, cur) => (acc = cur.name === name ? cur[element] : acc), '')
      },
      getBaseUrl(url) {
        // remove baseUrl from url in pieces in order not to mess with subdomains CORS
        return url.split(self.getBaseUrl())[1]
      },
    })
  },
}
