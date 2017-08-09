// This configures the apostrophe-pages module to add a "home" page type to the
// pages menu

module.exports = {
  types: [
    // {
    //   name: 'home',
    //   label: 'Home'
    // },
    // Add more page types here, but make sure you create a corresponding
    // template in lib/modules/apostrophe-pages/views/pages!
  ],
  park: [
    {
      slug: '/',
      published: true,
      _defaults: {
        title: 'Home',
        type: 'home'
      }
    },
    {
      slug: '/contact',
      published: true,
      type: 'contact',
      title: 'Contact'
    },
    {
      slug: '/projets',
      published: true,
      type: 'project-page',
      title: 'Projets'
    }
  ]
  // afterConstruct: self => {
  //   self.pushAsset('script', 'always', { when: 'always' })
  // }
}
