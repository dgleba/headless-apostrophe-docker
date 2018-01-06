module.exports = {
  extend: 'apostrophe-pieces-pages',
  construct(self, options) {
    self.beforeIndex = (req, callback) => {
      self.apos.career
        .find(req, {})
        .permission(null)
        .published(true)
        .trash(false)
        .sort({ startDate: -1 })
        .projection({
          title: 1,
          summary: 1,
          year: 1,
          slug: 1,
          type: 1,
        })
        .toArray((err, pieces) => {
          err && console.error('Error in career-pages beforeIndex', err)
          req.data.pieces = pieces
          return callback()
        })
    }
  },
}
