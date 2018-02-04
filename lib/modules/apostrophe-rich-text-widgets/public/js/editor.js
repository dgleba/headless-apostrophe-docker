apos.define('apostrophe-rich-text-widgets-editor', {
  construct: function(self, options) {
    self.beforeCkeditorInline = function() {
      self.config.extraPlugins = 'lineutils'
      self.config.extraPlugins = 'clipboard'
      self.config.extraPlugins = 'widgetselection'
      self.config.extraPlugins = 'widget'
      self.config.extraPlugins = 'codesnippet'
    }
  },
})
