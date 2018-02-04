const RTEConfig = require('config').RTEConfig

module.exports = {
  extend: 'apostrophe-pieces',
  name: 'article',
  alias: 'article',
  addFields: [
    {
      name: 'description',
      type: 'area',
      required: true,
      options: {
        widgets: {
          'apostrophe-rich-text': RTEConfig,
          'apostrophe-images': { size: 'full' },
        },
      },
      contextual: true,
    },
    {
      name: 'content',
      type: 'area',
      required: true,
      options: {
        widgets: {
          'apostrophe-rich-text': RTEConfig,
          'apostrophe-images': { size: 'full' },
        },
      },
      contextual: true,
    },
    {
      name: 'publicationDate',
      label: 'Publication Date',
      type: 'date',
    },
    {
      name: 'updateDate',
      label: 'Update Date',
      type: 'date',
      def: null,
    },
  ],
  arrangeFields: [
    {
      name: 'basics',
      fields: ['title', 'slug', 'publicationDate', 'updateDate', 'published', 'tags'],
    },
  ],
  contextual: true,
}
