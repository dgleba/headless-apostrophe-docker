module.exports = {
  extend: 'apostrophe-pieces-pages',
  construct(self, options) {
    self.beforeIndex = (req, callback) => {
      req.data.pieces.sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
      return callback()
    }
  },
}
