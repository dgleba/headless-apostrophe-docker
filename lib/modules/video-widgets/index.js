module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Video',
  beforeConstruct: function(self, options) {
    options.addFields = [
      {
        type: 'video',
        name: 'video',
        label: 'Video URL',
        required: true,
      },
    ].concat(options.addFields || [])
  },
}
