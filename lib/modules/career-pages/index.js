const { promisify } = require('util')

module.exports = {
  extend: 'apostrophe-pieces-pages',
  construct(self, options) {
    self.beforeIndex = async (req, callback) => {
      const sortByDate = promisify(
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
          }).toArray,
      )

      req.data.pieces = await sortByDate()
      return callback()
    }
  },
}
