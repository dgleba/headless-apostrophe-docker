module.exports = {
  extend: 'apostrophe-pieces',
  name: 'technology',
  alias: 'tech',
  label: 'Technology',
  pluralLabel: 'Technologies',
  addFields: [
    {
      name: 'content',
      type: 'array',
      schema: [
        {
          name: 'technology',
          label: 'Technology',
          type: 'string',
        },
        {
          name: 'logo',
          label: 'Logo',
          type: 'singleton',
          widgetType: 'apostrophe-images',
          options: {
            size: 'one-sixth',
          },
        },
        {
          name: '_page',
          label: 'Link',
          type: 'joinByOne',
          withType: 'apostrophe-page',
          idField: 'pageId',
        },
        {
          name: 'description',
          label: 'Description',
          type: 'string',
        },
      ],
    },
  ],
  arrangeFields: [
    {
      name: 'basics',
      fields: ['title', 'slug', 'content', 'published', 'tags'],
    },
  ],
}
