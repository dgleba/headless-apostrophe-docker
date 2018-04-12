module.exports = {
  extend: 'apostrophe-images-widgets',
  label: 'Custom Images',
  beforeConstruct: function(self, options) {
    options.piecesModuleName = 'apostrophe-images'
  },
}
