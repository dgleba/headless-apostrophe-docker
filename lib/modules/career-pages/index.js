module.exports = {
  extend: 'apostrophe-pieces-pages',
  perPage: 30, // display all (at least 30 by now) "career" elements in index page
  construct: (self, options) =>
    (self.beforeIndex = (req, callback) =>
      req.data.pieces.sort((a, b) => new Date(b.startDate) - new Date(a.startDate)) && callback()),
}
