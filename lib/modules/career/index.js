const RTEConfig = require('config').RTEConfig

module.exports = {
  extend: 'apostrophe-pieces',
  name: 'career',
  alias: 'career',
  addFields: [
    {
      name: 'description',
      type: 'area',
      required: true,
      options: {
        widgets: {
          'apostrophe-rich-text': RTEConfig,
          'apostrophe-images': { size: 'full' }
        }
      },
      contextual: true
    },
    {
      name: 'content',
      type: 'area',
      required: true,
      options: {
        widgets: {
          'apostrophe-rich-text': RTEConfig,
          'apostrophe-images': { size: 'full' }
        }
      },
      contextual: true
    }
  ],
  contextual: true,
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
        .then(count => {
          // need to add 1 to count because the first element (0) in css will be useless
          self.apos.webpack.options.webpack.loaders.sass.options.data = self.apos.webpack.options.webpack.loaders.sass.options.data.replace(
            '$timeline-count: 1',
            `$timeline-count: ${count + 1}`
          )
          callback()
        })
        .catch(err => callback(err))
    }
  }
}
