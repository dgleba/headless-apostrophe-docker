const async = require('async')
const crypto = require('crypto')
const config = require('config')
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

    self.submit = (req, cb) => {
      let piece = {}

      const validate = cb => {
        Object.keys(req.body).forEach(field => {
          if (field) {
            req.checkBody(field).notEmpty()
            req.sanitize(field).trim()
            req.sanitize(field).escape()
          }
        })

        req.checkBody('email').isEmail()

        const errors = req.validationErrors()
        errors ? cb(errors) : cb()
      }

      const convert = cb =>
        self.apos.schemas.convert(req, self.schema, 'form', req.body, piece, cb)

      const insert = cb => self.insert(req, piece, { permissions: false }, cb)

      return async.series([validate, convert, insert], cb)
    }

    self.beforeInsert = (req, p, options, cb) => {
      p.published = true // p is a piece
      p.title = p.email + crypto.randomBytes(5).toString('hex').slice(0, 8)
      return cb()
    }

    self.afterInsert = (req, piece, options, cb) => {
      const transporter = nodemailer.createTransport(
        config.get('nodemailer.transport')
      )
      const mailOptions = {
        ...config.get('nodemailer.options'),
        html: piece.message
      }

      transporter.sendMail(
        mailOptions,
        (error, info) =>
          error
            ? console.log(error)
            : console.log('Message sent: %s', info.messageId)
      )

      return cb()
    }
  }
}
