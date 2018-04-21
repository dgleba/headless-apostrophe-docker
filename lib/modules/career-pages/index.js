module.exports = {
  extend: 'apostrophe-pieces-pages',
  perPage: 30, // display all (at least 30 by now) "career" elements in index page
  construct: (self, options) => {
    self.beforeShow = async (req, callback) => {
      await self.apos.pages.setPreviousAndNextPieces(req, self.piecesModuleName, { startDate: -1 })
      return callback()
    }
  },
}
