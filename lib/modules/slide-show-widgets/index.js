module.exports = {
  extend: 'apostrophe-widgets',
  label: 'Slideshow',
  contextualOnly: true,
  addFields: [
    {
      name: 'slides',
      type: 'area',
      label: 'Slides',
    },
  ],
}
