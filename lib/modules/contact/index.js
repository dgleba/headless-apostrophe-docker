const crypto = require('crypto')
const async = require('async')
const nodemailer = require('nodemailer')

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

    self.afterInsert = (req, piece, options, callback) => {
      let transporter = nodemailer.createTransport({
        host: 'ssl0.ovh.net',
        port: 587,
        secure: false,
        auth: {
          user: 'contact@jwreading.com',
          pass: 'agwxz2002' // TODO: through env var
        }
      })

      // setup email data with unicode symbols
      let mailOptions = {
        from: '"JW Reading" <contact@jwreading.com>',
        to: 'anthony.tarlao@gmail.com, tonydbz2002@hotmail.com',
        subject: 'Nouveau message sur le site',
        text: 'Format texte',
        html: '<b>Format HTML</b>'
      }

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error)
        }
        console.log('Message sent: %s', info.messageId)
      })
      return callback()
    }
  }
}
