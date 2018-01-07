const RTEConfig = require('config').RTEConfig

module.exports = {
  extend: 'apostrophe-pieces',
  name: 'career',
  alias: 'career',
  addFields: [
    {
      name: 'summary',
      type: 'area',
      required: true,
      options: {
        widgets: {
          'apostrophe-rich-text': RTEConfig,
        },
      },
    },
    {
      name: 'description',
      type: 'array',
      schema: [
        {
          name: 'content',
          label: 'Content',
          type: 'area',
          options: {
            widgets: {
              'apostrophe-rich-text': RTEConfig,
            },
          },
        },
        {
          name: '_page',
          label: 'Link',
          type: 'joinByOne',
          withType: 'apostrophe-page',
          idField: 'pageId',
        },
      ],
    },
    {
      name: 'startDate',
      label: 'Start Date',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      label: 'End Date',
      type: 'date',
      required: true,
    },
    {
      name: 'certification',
      type: 'boolean',
      def: false,
    },
  ],
  arrangeFields: [
    {
      name: 'basics',
      fields: [
        'title',
        'slug',
        'summary',
        'description',
        'year',
        'startDate',
        'endDate',
        'certification',
        'published',
        'tags',
      ],
    },
  ],
}
