module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Contact Form',
  construct: (self, options) => {
    self.forms = self.apos.contact

    self.output = (widget, options) => {
      return self.partial(self.template, {
        widget: widget,
        options: options,
        schema: self.forms.submitSchema
      })
    }

    self.route('post', 'submit', (req, res) => {
      return self.forms.submit(req, function (err) {
        return res.send({ status: err || 'ok' })
      })
    })

    var superGetCreateSingletonOptions = self.getCreateSingletonOptions
    self.getCreateSingletonOptions = req => {
      var options = superGetCreateSingletonOptions(req)
      options.submitSchema = self.forms.submitSchema
      options.piece = self.forms.newInstance()
      return options
    }
  }
}
