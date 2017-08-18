apos.define('apostrophe-areas-editor', {
  construct: function (self, options) {
    var superTrashItem = self.trashItem
    self.trashItem = function ($el) {
      var question = 'Delete element'

      $.each(
        $el.context.parentNode.parentNode.parentNode.parentNode.childNodes,
        function () {
          var data = $(this).data()
          if (data && data.aposWidgetControls == undefined) {
            var type = Object.keys(data)[0]
            var text = $(this)[0].innerText.trim()
            if (text.length > 50) {
              text = $(this)[0].innerText.substring(0, 50) + '...'
            }
            question += ' of type ' + type + ' with content: "' + text + '" ?'
          }
        }
      )

      if (confirm(question)) return superTrashItem($el)
    }
  }
})
