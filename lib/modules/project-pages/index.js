module.exports = {
  extend: 'apostrophe-pieces-pages',
  piecesFilters: [
    {
      name: 'tags',
    },
  ],
  construct(self, options) {
    self.perPage = 12
  },
  afterConstruct(self) {
    self.beforeShow = async (req, callback) => {
      await self.apos.pages.setPreviousAndNextPieces(req, self.piecesModuleName, { publicationDate: -1 })
      return callback()
    }
  },
}
