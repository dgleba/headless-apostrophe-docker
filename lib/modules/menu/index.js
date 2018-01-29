module.exports = {
  extend: 'apostrophe-pieces',
  name: 'menu',
  alias: 'menu',
  addFields: [
    {
      name: '_page',
      type: 'joinByOne',
      withType: 'apostrophe-page',
      required: true,
    },
  ],
  arrangeFields: [
    {
      name: 'basics',
      fields: ['title', 'slug', '_page', 'published', 'tags'],
    },
  ],
}
