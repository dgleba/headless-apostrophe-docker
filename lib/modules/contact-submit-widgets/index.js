module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Contact Form',
  construct: (self, options) => {
    let token
    self.forms = self.apos.contact

    self.output = (widget, options) =>
      self.partial(self.template, { widget, options, schema: self.forms.submitSchema, token })

    self.route('post', 'submit', (req, res) => self.forms.submit(req, err => res.send({ status: err || 'ok' })))

    const superGetCreateSingletonOptions = self.getCreateSingletonOptions
    self.getCreateSingletonOptions = req => {
      token = req.session['XSRF-TOKEN']
      const options = superGetCreateSingletonOptions(req)
      options.submitSchema = self.forms.submitSchema
      options.piece = self.forms.newInstance()
      return options
    }
  },
}
