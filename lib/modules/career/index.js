const RTEConfig = require('config').RTEConfig

module.exports = {
  extend: 'apostrophe-pieces',
  name: 'career',
  alias: 'career',
  addFields: [
    {
      name: 'description',
      type: 'area',
      required: true,
      options: {
        widgets: {
          'apostrophe-rich-text': RTEConfig,
          'apostrophe-images': { size: 'full' }
        }
      },
      contextual: true
    },
    {
      name: 'content',
      type: 'area',
      required: true,
      options: {
        widgets: {
          'apostrophe-rich-text': RTEConfig,
          'apostrophe-images': { size: 'full' }
        }
      },
      contextual: true
    }
  ],
  contextual: true
}
