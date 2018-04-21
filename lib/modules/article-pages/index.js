module.exports = {
  extend: 'apostrophe-pieces-pages',
  afterConstruct(self) {
    self.beforeIndex = async (req, callback) => {
      req.data.pieces = await self.apos.article
        .find(req)
        .projection({
          title: 1,
          slug: 1,
          type: 1,
          contents: 1,
        })
        .perPage(12)
        .tags(req.query.tags && [req.query.tags])
        .page(req.query.page || 1)
        .sort({ publicationDate: -1 })
        .toArray()

      return callback()
    }

    self.beforeShow = async (req, callback) => {
      await self.apos.pages.setPreviousAndNextPieces(req, self.piecesModuleName, { publicationDate: -1 })
      return callback()
    }
  },
}
