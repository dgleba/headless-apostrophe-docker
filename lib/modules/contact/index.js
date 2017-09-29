const crypto = require('crypto')

module.exports = {
  extend: 'apostrophe-pieces',
  name: 'contact',
  label: 'Contact Message',
  addFields: [
    {
      name: 'email',
      type: 'string',
      label: 'Adresse email',
      required: true
    },
    {
      name: 'body',
      type: 'string',
      label: 'Message',
      textarea: true,
      required: true
    }
  ],
  construct: (self, options) => {
    self.beforeInsert = (req, piece, options, callback) => {
      piece.published = true
      piece.title =
        piece.email + crypto.randomBytes(5).toString('hex').slice(0, 8)
      return callback()
    }
  }
}
