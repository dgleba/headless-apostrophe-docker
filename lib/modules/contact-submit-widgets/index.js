module.exports = {
  extend: 'apostrophe-pieces-submit-widgets',
  fields: ['email', 'body'], // editable fields by user
  construct: function (self, options) {
    self.pushAsset('stylesheet', 'always', { when: 'always' })
  }
}
