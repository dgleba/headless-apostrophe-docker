module.exports = {
  construct(self, options) {
    self.addHelpers({
      getColor(name, element) {
        const pages = require('config').get('modules.apostrophe-pages.types')
        return pages.reduce((acc, cur) => (acc = cur.name === name ? cur[element] : acc), '')
      },
      getBaseUrl(url) {
        return url.split(self.getBaseUrl())[1]
      },
    })
  },
}
