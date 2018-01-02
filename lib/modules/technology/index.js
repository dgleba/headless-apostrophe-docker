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
          name: '_page',
          label: 'Link',
          type: 'joinByOne',
          withType: 'apostrophe-page',
          idField: 'pageId',
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
