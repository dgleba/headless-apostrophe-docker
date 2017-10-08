const crypto = require('crypto')
const async = require('async')

module.exports = {
  extend: 'apostrophe-pieces',
  name: 'contact',
  alias: 'contact',
  label: 'Contact Message',
  addFields: [
    {
      name: 'email',
      type: 'string',
      label: 'Adresse email',
      required: true
    },
    {
      name: 'message',
      type: 'string',
      label: 'Message',
      textarea: true,
      required: true
    }
  ],
  permissionsFields: false,

  afterConstruct: self => {
    self.setSubmitSchema()
  },

  construct: (self, options) => {
    self.setSubmitSchema = () =>
      (self.submitSchema = self.apos.schemas.subset(self.schema, [
        'email',
        'message'
      ]))

    self.submit = (req, callback) => {
      let piece = {}

      const validate = callback => {
        Object.keys(req.body).forEach(field => {
          if (field) {
            req.checkBody(field).notEmpty()
            req.sanitize(field).trim()
            req.sanitize(field).escape()
          }
        })
        req.checkBody('email').isEmail()
        const errors = req.validationErrors()
        if (errors) {
          callback(errors)
        } else {
          callback()
        }
      }

      const convert = callback =>
        self.apos.schemas.convert(
          req,
          self.schema,
          'form',
          req.body,
          piece,
          callback
        )

      const insert = callback =>
        self.insert(req, piece, { permissions: false }, callback)

      return async.series([validate, convert, insert], callback)
    }

    self.beforeInsert = (req, piece, options, callback) => {
      piece.published = true
      piece.title =
        piece.email + crypto.randomBytes(5).toString('hex').slice(0, 8)
      return callback()
    }
  }
}
