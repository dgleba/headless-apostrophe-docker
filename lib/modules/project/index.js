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
