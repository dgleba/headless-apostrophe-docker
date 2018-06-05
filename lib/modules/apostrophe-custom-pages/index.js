module.exports = {
  beforeConstruct(self, options) {
    options.addFields = [
      {
        type: 'string',
        name: 'description',
        label: 'Meta Description',
      },
    ].concat(options.addFields || [])
  },
}
