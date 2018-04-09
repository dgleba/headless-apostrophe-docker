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
    self.beforeIndex = (req, callback) =>
      req.data.pieces.sort((a, b) => b.publicationDate - a.publicationDate) && callback()

    self.beforeShow = (req, callback) => {
      return self.apos.article
        .find(req)
        .projection({
          title: 1,
          slug: 1,
          type: 1,
        })
        .sort({ publicationDate: -1 })
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
