module.exports = {
  construct(self, options) {
    self.addHelpers({
      RTEConfig: function() {
        return require('config').get('RTEConfig')
      },
    })
  },
}
