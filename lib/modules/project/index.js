const RTEConfig = {
  toolbar: [
    'Styles',
    'Bold',
    'Italic',
    'Link',
    'NumberedList',
    'BulletedList',
    'Undo',
    'Redo'
  ],
  styles: [
    { name: 'Paragraphe', element: 'p' },
    { name: 'Paragraphe 2', element: 'h5' },
    { name: 'Title', element: 'h3' },
    { name: 'Subtitle', element: 'h4' }
  ]
}

module.exports = {
  extend: 'apostrophe-pieces',
  name: 'project',
  alias: 'project',
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
