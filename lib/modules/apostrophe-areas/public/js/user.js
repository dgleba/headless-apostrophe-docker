apos.define('apostrophe-areas', {
  construct: function(self, options) {
    var superEnableCkeditor = self.enableCkeditor
    self.enableCkeditor = function() {
      superEnableCkeditor()
      CKEDITOR.plugins.addExternal(
        'lineutils',
        '/modules/my-apostrophe-areas/js/ckeditorPlugins/lineutils/',
        'plugin.js',
      )
      CKEDITOR.plugins.addExternal(
        'clipboard',
        '/modules/my-apostrophe-areas/js/ckeditorPlugins/clipboard/',
        'plugin.js',
      )
      CKEDITOR.plugins.addExternal(
        'widgetselection',
        '/modules/my-apostrophe-areas/js/ckeditorPlugins/widgetselection/',
        'plugin.js',
      )
      CKEDITOR.plugins.addExternal('widget', '/modules/my-apostrophe-areas/js/ckeditorPlugins/widget/', 'plugin.js')
      CKEDITOR.plugins.addExternal(
        'codesnippet',
        '/modules/my-apostrophe-areas/js/ckeditorPlugins/codesnippet/',
        'plugin.js',
      )
    }
  },
})
