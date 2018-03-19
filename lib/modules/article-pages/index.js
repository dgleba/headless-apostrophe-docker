module.exports = {
  extend: 'apostrophe-pieces-pages',
  previous: {
    projection: {
      title: 1,
      slug: 1,
      tags: 1,
      type: 1,
    },
  },
  next: {
    projection: {
      title: 1,
      slug: 1,
      tags: 1,
      type: 1,
    },
  },
  construct(self, options) {
    self.perPage = 5
  },
}
