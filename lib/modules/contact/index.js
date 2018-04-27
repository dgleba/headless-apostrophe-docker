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
      required: true,
    },
    {
      name: 'message',
      type: 'string',
      label: 'Message',
      textarea: true,
      required: true,
    },
  ],
  permissionsFields: false,

  afterConstruct: self => self.setSubmitSchema(),

  construct: (self, options) => {
    self.setSubmitSchema = _ => (self.submitSchema = self.apos.schemas.subset(self.schema, ['email', 'message']))

    /**
     * When a contact form is submitted,
     * validate it with sanitization,
     * convert it,
     * insert it
     */
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
        errors ? callback(errors) : callback()
      }

      const convert = callback => self.apos.schemas.convert(req, self.schema, 'form', req.body, piece, callback)
      const insert = callback => self.insert(req, piece, { permissions: false }, callback)
      return async.series([validate, convert, insert], callback)
    }

    /**
     * Add a random number in title in case the email address is already inserted
     */
    self.beforeInsert = (req, piece, options, callback) => {
      piece.published = true
      piece.title = piece.email + crypto.randomBytes(5).toString('hex').slice(0, 8) // prettier-ignore
      return callback()
    }

    /**
     * Send email to admin to inform him of a new contact form submission
     */
    self.afterInsert = async (req, piece, options, callback) => {
      const transporter = nodemailer.createTransport(config.get('nodemailer.transport'))
      const mailOptions = {
        ...config.get('nodemailer.options'),
        subject: `Message depuis le site: ${piece.email}`,
        html: piece.message,
      }

      try {
        const { messageId } = await transporter.sendMail(mailOptions)
        console.log('Message sent: %s', messageId)
      } catch (err) {
        console.log(err)
      }

      return callback()
    }
  },
}
