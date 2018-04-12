const RTEConfig = require('config').RTEConfig

module.exports = {
  extend: 'apostrophe-pieces',
  name: 'project',
  alias: 'project',
  addFields: [
    {
      name: 'intro',
      type: 'string',
      textarea: true,
    },
    {
      name: 'content',
      type: 'area',
      options: {
        widgets: {
          'apostrophe-rich-text': RTEConfig,
          'apostrophe-images': { size: 'full' },
        },
      },
      contextual: true,
    },
    {
      name: 'slides',
      type: 'area',
      options: {
        widgets: {
          'slide-show': {},
        },
        limit: 1,
      },
      contextual: true,
    },
    {
      name: 'publicationDate',
      label: 'Publication Date',
      type: 'date',
    },
  ],
  arrangeFields: [
    {
      name: 'basics',
      fields: ['title', 'slug', 'intro', 'publicationDate', 'published', 'tags'],
    },
  ],
}
