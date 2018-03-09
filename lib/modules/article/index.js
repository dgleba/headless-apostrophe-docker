const RTEConfig = require('config').RTEConfig

module.exports = {
  extend: 'apostrophe-pieces',
  name: 'article',
  alias: 'article',
  addFields: [
    {
      name: 'description',
      type: 'area',
      options: {
        widgets: {
          'apostrophe-rich-text': RTEConfig,
          'apostrophe-images': { size: 'full' },
        },
      },
    },
    // {
    //   name: 'content',
    //   type: 'area',
    //   options: {
    //     widgets: {
    //       'apostrophe-rich-text': RTEConfig,
    //       'apostrophe-images': { size: 'full' },
    //     },
    //   },
    //   contextual: true,
    // },
    {
      name: 'links',
      type: 'array',
      schema: [
        {
          name: 'url',
          label: 'Url',
          type: 'url',
        },
      ],
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
      fields: ['title', 'slug', 'description', 'links', 'publicationDate', 'updateDate', 'published', 'tags'],
    },
  ],
  contextual: true,
}
