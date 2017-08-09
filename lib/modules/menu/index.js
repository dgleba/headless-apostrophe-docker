module.exports = {
  extend: 'apostrophe-pieces',
  name: 'menu',
  alias: 'menu',
  addFields: [
    {
      name: '_page',
      type: 'joinByOne',
      withType: 'apostrophe-page',
      required: true
    }
  ],
  arrangeFields: [
    {
      name: 'basics',
      fields: ['title', 'slug', '_page', 'published', 'tags']
    }
  ],
  construct: (self, options) => {
    const count = () =>
      new Promise((resolve, reject) => {
        return self.find({}, {}).permission(false).toCount((err, count) => {
          if (err) {
            reject(err)
          }
          resolve(count)
        })
      })

    self.afterInit = callback => {
      count()
        .then(data => {
          self.apos.webpack.options.webpack.loaders.sass.options.data = `$menu-count: ${data};`
          callback()
        })
        .catch(err => callback(err))
    }
  }
}
