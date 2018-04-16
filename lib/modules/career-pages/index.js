module.exports = {
  extend: 'apostrophe-pieces-pages',
  perPage: 30, // display all (at least 30 by now) "career" elements in index page
  construct: (self, options) => {
    self.beforeShow = (req, callback) => {
      return self.apos.career
        .find(req)
        .projection({
          title: 1,
          slug: 1,
          type: 1,
        })
        .sort({ startDate: -1 })
        .toArray((err, docs) => {
          for (let i = 0; i < docs.length; i++) {
            if (docs[i]._id === req.data.piece._id) {
              req.data.next = docs[i - 1]
              req.data.previous = docs[i + 1]
            }
          }
          callback()
        })
    }
  },
}
